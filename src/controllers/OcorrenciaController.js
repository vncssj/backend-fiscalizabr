const connection = require('../database/connection');

module.exports = {
  async index(request, response) {

    const { usuario_id } = request.query;

    const [count] = await connection('ocorrencia').where('usuario_id',usuario_id).count();

    const ocorrencias = await connection('ocorrencia')
      .join('usuario', 'usuario.id', '=', 'ocorrencia.usuario_id')
      .where('usuario_id',usuario_id)
      .select([
        'ocorrencia.*', 
        'usuario.nome', 
        'usuario.email', 
        'usuario.cidade', 
        'usuario.estado'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(ocorrencias);
  },

  async indexId(request, response) {
    const { id } = request.query;

    const [count] = await connection('ocorrencia').where('id',id).count();

    const ocorrencia = await connection('ocorrencia')
      .where('id',id)
      .select([
        'ocorrencia.*'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(ocorrencia);
  },

  async create(request, response) {
    const { descricao, local, latitude, longitude, data, foto, usuario_id } = request.body;

    const [id] = await connection('ocorrencia').insert({
      descricao,
      local,
      latitude,
      longitude,
      data,
      foto,
      usuario_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.query;

    await connection('ocorrencia').where('id', id).delete();

    return response.status(204).send();
  }
  
};