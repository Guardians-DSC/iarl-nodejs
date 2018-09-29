const archiver = require('archiver');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    archive.on('warning', function (err) {
      reject(err);
    });

    archive.on('error', function (err) {
      throw err;
    });

    resolve(archive);
  });
};
