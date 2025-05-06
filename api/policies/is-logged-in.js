/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function isLoggedIn(req, res, proceed) {
  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  // if (req.me) {
  //   return proceed();
  // }
  let token;
  let response;

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      sails.log(req.headers.authorization);
      return res.json(401, { err: 'Format is Authorization: Bearer [token]' });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    sails.log('No Authorization header was found');
    // return res.json(401, {err: 'No Authorization header was found'});
    return res.unauthorized({ err: 'No Authorization header was found' });
  }
  try {
    response = await sails.helpers.jwt.verify.with({
      token,
    });
  } catch (e) {
    return res.status(403).json({ err: e.code });
  }

  if ((Math.floor(token.exp - token.iat) / 1000) <= 5000) {
    token = await sails.helpers.jwt.issue({ payload: { id: token.id, role: token.role } });
    res.json({ token });
  }
  req.token = response; // This is the decrypted token or the payload you provided
  let loggedInUser;
 
  if(response.role==='client'){
   loggedInUser=  await Client.findOne({
      id: req.token.userId,
    })
    let tempMerchant = await Merchant.findOne({ code: "b2c" });
    loggedInUser.merchant = [tempMerchant];
    
  }else{
  loggedInUser= await User.findOne({
    id: req.token.userId,
  }).populate('merchant');
}
    // If the logged-in user has gone missing, log a warning,
    // wipe the user id from the requesting user agent's session,
    // and then send the "unauthorized" response.
  if (!loggedInUser) {
    sails.log.warn('Somehow, the user record for the logged-in user has gone missing....');
    delete req.session.userId;
    return res.unauthorized();
  }

  // Add additional information for convenience when building top-level navigation.
  // (i.e. whether to display "Dashboard", "My Account", etc.)
  if (!loggedInUser.password || loggedInUser.emailStatus === 'unconfirmed') {
    loggedInUser.dontDisplayAccountLinkInNav = true;
    return res.unauthorized();
  }

  // Expose the user record as an extra property on the request object (`req.me`).
  // > Note that we make sure `req.me` doesn't already exist first.
  if (req.me !== undefined) {
    throw new Error('Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
  }
  req.me = loggedInUser;
  // global.userLogObject=loggedInUser;
  // If our "lastSeenAt" attribute for this user is at least a few seconds old, then set it
  // to the current timestamp.
  //
  // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)
  const MS_TO_BUFFER = 60 * 1000;
  const now = Date.now();
  if (loggedInUser.lastSeenAt < now - MS_TO_BUFFER) {
    if(loggedInUser.role==='client'){

      let timeStampUpdateResponse = await Client.updateOne({ id: loggedInUser.id }).set({ lastSeenAt: now });
;// _∏_  (Meanwhile...)
    }else{
      let timeStampUpdateResponse = await User.updateOne({ id: loggedInUser.id }).set({ lastSeenAt: now });

    }
   
  }// ﬁ

  // If this is a GET request, then also expose an extra view local (`<%= me %>`).
  // > Note that we make sure a local named `me` doesn't already exist first.
  // > Also note that we strip off any properties that correspond with protected attributes.
  if (req.method === 'GET') {
    if (res.locals.me !== undefined) {
      throw new Error('Cannot attach logged-in user as the view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
    }

    // Exclude any fields corresponding with attributes that have `protect: true`.
    const sanitizedUser = _.extend({}, loggedInUser);
    Object.keys(User.attributes).forEach((key) => {
      if (User.attributes[key].protect) {
        delete sanitizedUser[key];
      }
    });

    // If there is still a "password" in sanitized user data, then delete it just to be safe.
    // (But also log a warning so this isn't hopelessly confusing.)
    if (sanitizedUser.password) {
      sails.log.warn('The logged in user record has a `password` property, but it was still there after pruning off all properties that match `protect: true` attributes in the User model.  So, just to be safe, removing the `password` property anyway...');
      delete sanitizedUser.password;
    }// ﬁ

    res.locals.me = sanitizedUser;

    // Include information on the locals as to whether billing features
    // are enabled for this app, and whether email verification is required.
    res.locals.isBillingEnabled = sails.config.custom.enableBillingFeatures;
    res.locals.isEmailVerificationRequired = sails.config.custom.verifyEmailAddresses;
  }// ﬁ

  // Prevent the browser from caching logged-in users' pages.
  // (including w/ the Chrome back button)
  // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
  // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
  res.setHeader('Cache-Control', 'no-cache, no-store');

  sails.log(`${loggedInUser.emailAddress} at ${new Date()}`);
  return proceed();
};
