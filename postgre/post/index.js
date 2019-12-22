const _get = require('./_get');
const _upload = require('./_upload');
const _contentLike = require('./_contentLike');
const _allPost = require('./_allPost');
const _delete = require('./_delete');
const _update = require('./_update');

module.exports = client => {
  return {
    get: async data => await _get(client, data),
    upload: async data => await _upload(client, data),
    contentLike: async data => await _contentLike(client, data),
    allPost: async userId => await _allPost(client, userId),
    delete: async data => await _delete(client, data),
    update: async data => await _update(client, data)
  };
};
