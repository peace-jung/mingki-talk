const { isUndefined } = require('./../../utils/validate');

module.exports = client => {
  /**
   * search
   * @param name
   */
  const search = async name => {
    const query = {
      name: 'search-user',
      text: `SELECT id, name, profile_img
        FROM public."user"
        WHERE (name LIKE $1)
        OR (id LIKE $1)`,
      values: [`%${name}%`]
    };

    try {
      const result = await client.query(query);
      return {
        count: result.rowCount,
        resultData: { user: result.rows, tag: [] },
        resultCode: 200
      };
    } catch (err) {
      console.error('User Search ERROR', err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  return {
    search: name => search(name)
  };
};
