module.exports = function (app) {
  var auth = app.middlewares.auth
  var downloadControl = app.controllers.download

    /**
   * @api {get} /api/download Downloads a file, a directory, or a set of them
   * @apiGroup Download
   * 
   * @apiDescription 
   * Downloads a file, directory or a set of items from specified path.  
   * If the request points to a file, the file is downloaded, otherwise, if points to a directory,
   * the directory will be zipped and downloaded, likewise for a set of directories and files.
   * The token is needed.
   * 
   * @apiExample {curl} Download a file
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/download?path=test.txt
   * @apiExample {curl} Download a directory
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/download?path=example
   * @apiExample {curl} Download a set of items
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/download?path=example&path=test.txt
   * 
   * @apiHeader {String} Authorization Authorization token.
   * 
   * @apiParam {String} path Path to file.
   * 
   * @apiError InvalidRequest The "path" is required.
   * @apiError InvalidCredentials The credentials are invalid.
   * 
   * 
   * @apiErrorExample {json} InvalidRequest
   * HTTP/1.1 422 BadRequest
   * {
   *    "error": "Invalid request"
   * }
   * @apiErrorExample {json} NoTokenProvided
   * HTTP/1.1 401 Unauthorized
   * {
   *    "error": "Access denied. No token provided."
   * }
   * @apiErrorExample {json} InvalidToken
   * HTTP/1.1 400 BadRequest
   * {
   *    "error": "Invalid token"
   * }
   */
  app.get('/api/download', auth, downloadControl.get)
}

