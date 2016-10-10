/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /admin/dashboard': 'admin/AuthController.dashboard',
  'get /admin/login': 'admin/AuthController.show',
  'get /admin/profile': 'admin/AuthController.profile',
  'post /admin/update': 'admin/AuthController.update',
  'post /admin/login': 'admin/AuthController.login',
  'get /admin/logout': 'admin/AuthController.logout',
  'get /admin/user/create':'admin/UserController.create',
  'get /admin/user/list': 'admin/UserController.list',
  'post /admin/user/save': 'admin/UserController.save',
  'get /admin/user/delete': 'admin/UserController.delete',
  'get /admin/user/delete_all': 'admin/UserController.delete_all',
  'get /admin/user/edit': 'admin/UserController.edit',
  'get /admin/user/view': 'admin/UserController.view',
  'get /admin/user/add_image': 'admin/UserController.add_image',
  'post /admin/user/add_image': 'admin/UserController.save_image',
  'get /admin/user/edit_image': 'admin/UserController.edit_image',
  'post /admin/user/edit_image': 'admin/UserController.update_image',
  'post /admin/user/update': 'admin/UserController.update',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
