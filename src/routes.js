const express = require('express');
const jwt = require('jsonwebtoken');

const UsuarioController = require('./controllers/UsuarioController');
const OcorrenciaController = require('./controllers/OcorrenciaController');

const routes = express.Router();

function verifyToken(req, res, next) {
    try {
        let bearerHeader = req.headers['authorization'];
        let token = bearerHeader.split(' ');
        token = token[1];
        token = jwt.verify(token, "teste")
        req.user_id = token.id;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized")
    }
}

routes.get('/', (req, res) => {
    res.send("Rodando essa Porra")
});
routes.get('/usuario', verifyToken, UsuarioController.index);
routes.get('/usuario/:id', verifyToken, UsuarioController.indexId);
routes.post('/usuario', UsuarioController.create);
routes.delete('/usuario/:id', verifyToken, UsuarioController.delete);
routes.post('/usuario/login', UsuarioController.login);

routes.get('/ocorrencia/usuario', verifyToken, OcorrenciaController.index);
routes.get('/ocorrencia/id', verifyToken, OcorrenciaController.indexId);
routes.post('/ocorrencia', verifyToken, OcorrenciaController.create);
routes.delete('/ocorrencia', verifyToken, OcorrenciaController.delete);

module.exports = routes;
