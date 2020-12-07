const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser({ limit: '10mb' }));
app.use('/imagens', express.static(process.cwd() + '/imagens'))
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000);