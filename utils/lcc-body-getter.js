module.exports = (req) => {
  if (process.env.NODE_DEV === 'development') {
      return '';
  }  
  var lcc;
    switch (req.body.lcc) {
      case '1':
      lcc = '/lcc1' // TODO update this value to be recover by environment variable
      break;
      case '2':
      lcc = '/lcc2' // TODO update this value to be recover by environment variable
      break;
      default:
      lcc = '/lcc3' // TODO update this value to be recover by environment variable
      break;
    }
    return lcc;
};