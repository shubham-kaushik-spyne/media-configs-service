
/**
 * isAuth
 *
 * A simple policy that checks for authentication.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */

module.exports = async function isAuth(req, res, proceed) {

  try {
    let authKeyQueryParam =  req.query ? req.query['auth_key'] : '';
    let authKeyBody = req.body ? req.body['auth_key'] : '';


    //nothing in those fields, reject request
    if(!authKeyQueryParam && !authKeyBody) {
      throw Error('Invalid Auth key');
    }

    // if we reach here, at least one of them is there, now check for authenticity [There is no posibility to send auth key in both body and queryParam]

    const rdi = sails.getDatastore('default'); // from datastores.js 
    const authKey = authKeyQueryParam ? authKeyQueryParam : authKeyBody;

    const queryToExecute = ``;

    var result = await rdi.sendNativeQuery(queryToExecute, []);

    // check the no. of rows to be 1
    if(result['rows'].length===0) {
      throw Error('Invalid Auth key');
    }

    req.me = result['rows'][0]

    //sails.log(result['rows']);
    // res.locals.me = result['rows'][0]
    return proceed();

  } catch (error) {

    return res.status(401).json({
      'status': error.status || '401',
      'message' : error.message || 'Invalid Auth key',
    });

  }
};
  