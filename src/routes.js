const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const OcorrenciaController = require('./controllers/OcorrenciaController');

const routes = express.Router();

routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/usuario_id', UsuarioController.indexId);
routes.post('/usuario', UsuarioController.create);
routes.delete('/usuario', UsuarioController.delete);

routes.get('/ocorrencia/usuario_id', OcorrenciaController.index);
routes.get('/ocorrencia/id', OcorrenciaController.indexId);
routes.post('/ocorrencia', OcorrenciaController.create);
routes.delete('/ocorrencia', OcorrenciaController.delete);

module.exports = routes;
