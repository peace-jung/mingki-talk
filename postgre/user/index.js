const _account = require('./account');
const _profile = require('./profile');

module.exports = client => {
  const account = _account(client);
  const profile = _profile(client);

  return {
    account,
    profile
  };
};
