module.exports = (app) => {
  var login = app.controllers.login

  /**
   * @api {post} /api/login Authenticate the user
   * @apiName Login
   * @apiGroup Authenticate
   * 
   * @apiParam {String} username Username of LCCs.
   * @apiParam {String} password Password of LCCs.
   * 
   * @apiSuccess {String} token User token, valid for 20 minutes .
   * 
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbHJjIiwiaWF0IjoxNTI3MTY1NTg2LCJleHAiOjE1MjcxNjY3ODZ9.VEvOcyPa-LKSr0kJXTa6TvpCqyKmenJRbEgdxNKJjik" 
   * }
   * 
   * @apiError InvalidJSON The fields "username" and "password" are required.
   * @apiError InvalidCredentials The credentials are invalid.
   * 
   * 
   * @apiErrorExample {json} InvalidJSON
   * HTTP/1.1 422 BadRequest
   * {
   *    "error": "Invalid JSON"
   * }
   * @apiErrorExample {json} InvalidCredentials
   * HTTP/1.1 401 Unauthorized
   * {
   *    "error": "Invalid Credentials"
   * }
   */
  app.route('/api/login').post(login.login)
}
