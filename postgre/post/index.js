const _get = require('./_get');
const _upload = require('./_upload');
const _contentLike = require('./_contentLike');
const _allPost = require('./_allPost');
const _delete = require('./_delete');
const _update = require('./_update');

module.exports = client => {
  return {
    get: data => _get(client, data),
    upload: data => _upload(client, data),
    contentLike: data => _contentLike(client, data),
    allPost: userId => _allPost(client, userId),
    delete: data => _delete(client, data),
    update: data => _update(client, data)
  };
};
