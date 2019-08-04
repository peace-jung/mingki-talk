const _isUndefined = list => {
  for (let i in list) {
    if (typeof list[i] === 'undefined') return true;
  }
  return false;
};

module.exports = {
  isUndefined: _isUndefined
};
