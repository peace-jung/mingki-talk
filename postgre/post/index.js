module.exports = client => {
  const _get = async data => {
    const { userId } = data;
    const query = {
      name: 'insert-post',
      text: `SELECT created, id, content, photo FROM public.post
        WHERE (id = $1)`,
      values: [userId]
    };

    try {
      const result = await client.query(query);
      return result;
    } catch (err) {
      console.error(err);
      return { error: err, code: err.code || 400 };
    }
  };

  const _upload = async data => {
    const { userId, photo, content } = data;
    const created = Date.now();
    const query = {
      name: 'insert-post',
      text: `INSERT INTO public."post"(
        id, photo, content, created)
        VALUES ($1, $2, $3, $4)`,
      values: [userId, photo, content, created]
    };

    try {
      const result = await client.query(query);
      return result;
    } catch (err) {
      console.error(err);
      return { error: err, code: err.code || 400 };
    }
  };

  return {
    get: data => _get(data),
    upload: data => _upload(data)
  };
};
