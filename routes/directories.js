module.exports = function (app) {
  var auth = app.middlewares.auth;
  var directoriesREST = app.controllers.directories;

  /**
   * @api {get} /api/directories List items
   * @apiGroup Directories
   *
   * @apiDescription
   * List items from specified path.
   * The token is needed.
   *
   * @apiHeader {String} Authorization Authorization token.
   *
   * @apiParam {String} path The directory path.
   *
   * @apiExample {curl} Example usage
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/directories?path=Documents/example
   *
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *     "items": [
   *         {
   *             "name": "dir1",
   *             "path": "/dir1",
   *             "isFile": false
   *         },
   *         {
   *             "name": "file1.txt",
   *             "path": "/file1.txt",
   *             "isFile": true
   *         }
   *     ]
   * }
   *
   * @apiError ENOENT No such file or directory.
   * @apiError NoTokenProvided No token provided.
   * @apiError InvalidToken Invalid token.
   *
   * @apiErrorExample {json} ENOENT
   * HTTP/1.1 404 NotFound
   * {
   *    "error": "ENOENT: no such file or directory, scandir '<directory_path>'"
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
   *
   */
  app.get('/api/directories', auth, directoriesREST.get);
};
