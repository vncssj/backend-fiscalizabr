const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    console.log("index")
    const usuario = await connection('usuario')
      .select([
        'usuario.*'
      ]);

    return response.json(usuario);
  },

  async indexId(request, response) {
    const { id } = request.query;

    const [count] = await connection('usuario').where('id', id).count();

    const usuario = await connection('usuario')
      .where('id', id)
      .select([
        'usuario.*'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(usuario);
  },

  async create(request, response) {
    const { email, senha, nome, cidade, estado } = request.body;

    const [id] = await connection('usuario').insert({
      email,
      senha,
      nome,
      cidade,
      estado
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.query;

    await connection('usuario').where('id', id).delete();

    return response.status(204).send();
  }
};