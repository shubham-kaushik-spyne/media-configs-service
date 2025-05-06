const { SERVICE_BASE_PATH } = require('../api/constant/base-path');

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const SERVICE_BASE_PATH_VERSION_NEUTRAL = `${SERVICE_BASE_PATH}`;
module.exports.routes = {
  

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  [`GET ${SERVICE_BASE_PATH_VERSION_NEUTRAL}/health-check`] : { action: 'health-check/check' },
  [`PUT ${SERVICE_BASE_PATH_VERSION_NEUTRAL}/update-team-config`] : { action: 'team-config/update-team-config' },
  [`GET ${SERVICE_BASE_PATH_VERSION_NEUTRAL}/background/get`] : { action: 'background/get' },
  [`POST ${SERVICE_BASE_PATH_VERSION_NEUTRAL}/number-plate/create`] : { action: 'number-plate/create' },
  [`GET ${SERVICE_BASE_PATH_VERSION_NEUTRAL}/number-plate/get`] : { action: 'number-plate/get' },
  [`PUT ${SERVICE_BASE_PATH_VERSION_NEUTRAL}/update-enterprise-config`] : { action: 'enterprise-config/update-enterprise-config' }
};