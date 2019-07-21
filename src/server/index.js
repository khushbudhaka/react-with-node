const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PatientsRouter = require('./patients/routes.config.js');
const DoctorsRouter = require('./doctors/routes.config.js');
const NurseRouter = require('./nurse/routes.config.js');
const ContactRouter = require('./emergencycontact/routes.config.js');
const BedsRouter = require('./beds/routes.config.js');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.get('/api/getUsername', (req, res) => res.send({ username: 'Khushbu :)' }));

app.use(express.static('dist'));

app.use(bodyParser.json());

PatientsRouter.routesConfig(app);
DoctorsRouter.routesConfig(app);
NurseRouter.routesConfig(app);
ContactRouter.routesConfig(app);
BedsRouter.routesConfig(app);


// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
