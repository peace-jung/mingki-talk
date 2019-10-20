const _account = require('./account');

module.exports = client => {
  const account = _account(client);

  return {
    account
  };
};
