const connection = require('../database/connection');
var fs = require('fs');
module.exports = {
  async index(request, response) {
    let usuario_id = request.user_id;
    const [count] = await connection('ocorrencia').where('usuario_id', usuario_id).count();

    const ocorrencias = await connection('ocorrencia')
      .join('usuario', 'usuario.id', '=', 'ocorrencia.usuario_id')
      .where('usuario_id', usuario_id)
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

    const [count] = await connection('ocorrencia').where('id', id).count();

    const ocorrencia = await connection('ocorrencia')
      .where('id', id)
      .select([
        'ocorrencia.*'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(ocorrencia);
  },



  async create(request, response) {
    var { descricao, local, latitude, longitude, data, foto } = request.body;
    var usuario_id = request.user_id;
    console.log("Entrou para criar")

    var currentdate = new Date();
    var datetime = currentdate.getDate() + ""
      + (currentdate.getMonth() + 1) +
      + currentdate.getFullYear() + ""
      + currentdate.getHours() + ""
      + currentdate.getMinutes() + ""
      + currentdate.getSeconds();

    var base64 = foto;
    var imagem = usuario_id + "_" + datetime;
    base64 = base64.replace('data:image/jpeg;base64,', '');

    fs.appendFile('imagens/' + imagem + '.jpg', base64, 'base64', async function (err) {
      if (err) {
        console.log(err)
      } else {
        foto = 'imagens/' + imagem + ".jpg";
        console.log(foto);
        console.log(local);

        latitude = latitude.toString();
        longitude = longitude.toString();
        const ocorrencia = await connection('ocorrencia').insert({
          descricao,
          local,
          latitude,
          longitude,
          data,
          foto,
          usuario_id,
        });
        console.log(ocorrencia)

        return response.send("Salvou");
      }
    });

  },

  async delete(request, response) {
    const { id } = request.query;

    await connection('ocorrencia').where('id', id).delete();

    return response.status(204).send();
  }

};
function saveImage(id, base64) {

}