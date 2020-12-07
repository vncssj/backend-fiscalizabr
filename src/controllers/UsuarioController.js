// require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var crypto = require("crypto");

const connection = require('../database/connection');

function criaMd5(senha) {
  return crypto.createHash("md5").update(senha).digest('hex');
}

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
    let id = request.user_id;
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
    var { email, senha, nome, cidade, estado } = request.body;

    var senha = criaMd5(senha);

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
    const { id } = request.params;

    await connection('usuario').where('id', id).delete();

    return response.status(204).send();
  },

  async login(request, res) {
    var { email, senha } = request.body;
    console.log("email: " + email)
    console.log("senha: " + senha)
    console.log("entrou no login")
    var [user] = await connection('usuario').where({
      email: email,
      senha: criaMd5(senha)
    }).count()

    var dadoUser = await connection('usuario').where({
      email: email,
      senha: criaMd5(senha)
    }).limit(1);

    var id = dadoUser[0].id;

    if (user['count(*)'] == 1) {
      console.log("achou usuario")

      const secret = "teste";
      const token = jwt.sign({ id }, secret, {
        expiresIn: 600 // expires in 5min
      });
      console.log("critou token")
      return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
  }

};