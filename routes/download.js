module.exports = function (app) {
  var auth = app.middlewares.auth;
  var downloadControl = app.controllers.download;

  /**
   * @api {get} /api/download Downloads a file, a directory, or a set of them
   * @apiGroup Download
   *
   * @apiDescription
   * Downloads a file, directory or a set of items from specified path.
   * If the request points to a **file**, the file is downloaded. Otherwise, if points to a **directory**,
   * the directory will be zipped and downloaded, likewise for a **set of directories and files**.
   * The token is needed.
   *
   * @apiExample {curl} Download a file
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/download?path=test.txt
   * @apiExample {curl} Download a directory
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/download?path=example
   * @apiExample {curl} Download a set of items
   * curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g" http://127.0.0.1:3000/api/download?path=example&path=test.txt&path=test2.txt
   *
   * @apiHeader {String} Authorization Authorization token.
   *
   * @apiParam {String} path Path to file.
   *
   * @apiSuccessExample {text} Download a file
   * HTTP/1.1 200 OK
   * // The header response will contain
   * content-disposition: attachment; filename="test.txt" // may vary according to file name
   * content-type: text/plain; charset=UTF-8 // may vary depending on the file extension
   *
   * @apiSuccessExample {text} Download a directory
   * HTTP/1.1 200 OK
   * // The header response will contain
   * content-type: application/zip
   *
   * @apiSuccessExample {text} Download a set of files and directories
   * HTTP/1.1 200 OK
   * // The header response will contain
   * content-type: application/zip
   *
   * @apiError InvalidRequest The "path" is required.
   * @apiError ENOENT No such file or directory.
   * @apiError InvalidCredentials The credentials are invalid.
   * @apiError NoTokenProvided No token provided.
   *
   * @apiErrorExample {json} InvalidRequest
   * HTTP/1.1 422 BadRequest
   * {
   *    "error": "Invalid request"
   * }
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
   */
  app.get('/api/download', auth, downloadControl.get);
};
