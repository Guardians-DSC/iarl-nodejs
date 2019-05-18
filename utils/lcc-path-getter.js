module.exports = (lcc) => {
  if (process.env.NODE_DEV === 'development') {
    return '';
  }
  var lccPath;
  switch (lcc) {
    case '1':
      lccPath = 'lcc1'; // TODO update this value to be recover by environment variable
      break;
    case '2':
      lccPath = 'lcc2'; // TODO update this value to be recover by environment variable
      break;
    default:
      lccPath = 'lcc3'; // TODO update this value to be recover by environment variable
      break;
  }
  return lccPath;
};
