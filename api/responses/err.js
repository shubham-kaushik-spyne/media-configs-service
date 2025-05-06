module.exports = async function serverError(error) {
  const { res } = this;
  await sails.helpers.utils.reportError(error, this.req);
  // Define the status code to send in the response.
  const statusCode = 400;
  // TODO remove this
  //   if(responseError && typeof(responseError)==='object' && Array.isArray(responseError)===true){
  //   if( Array.isArray(responseError.manualErrorLog)===true){
  //    responseError.manualErrorLog= responseError.manualErrorLog.map(error => {
  //        return{
  //          user:userLogObject?.emailAddress,
  //          role:userLogObject?.role,
  //          level:'ERROR',
  //          date:new Date(),
  //          ...error
  //        }
  //     });
  //   }
  // }

  // If no data was provided, use res.sendStatus().
  if (error === undefined) {
    return res.sendStatus(statusCode);
  }
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    return res.sendStatus(statusCode);
  }
  return res.status(statusCode).send({ error });
};
