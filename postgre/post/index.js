module.exports = client => {
  const get = {};
  const _upload = data => {};

  return {
    get,
    upload: data => _upload(data)
  };
};
