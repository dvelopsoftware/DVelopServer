var multer = require('multer');
var fs = require('fs');

// Employees querie
var dbemployeelist = require('./queries/employees/queriesEmployeeList');
// Services querie
var dbservicelist = require('./queries/services/queriesServiceList');
// Distributors querie
var dbdistributorlist = require('./queries/distributors/queriesDistributorList');
// Projects querie
var dbprojectlist = require('./queries/projects/queriesProjectList');
// Clients querie
var dbclientlist = require('./queries/clients/queriesClientList');
// Login querie
var dblogin = require('./queries/queriesLogin');

function http() {
    this.config = function(app) {

        // Login
        app.post('/auth/login/', function(get, respond) {
            dblogin.login(get.body, respond);
        })

        // Employees
        app.get('/employees/', function(get, respond) {
            dbemployeelist.select(respond);
        })

        app.get('/employees/:id/', function(get, respond) {
            dbemployeelist.selectId(get.params.id, respond);
        })

        app.post('/employees/', function(get, respond) {
            dbemployeelist.insert(get.body, respond);
        })

        app.put('/employees/', function(get, respond) {
            dbemployeelist.update(get.body, respond);
        })

        app.delete('/employees/:id/', function(get, respond) {
            dbemployeelist.delete(get.params.id, respond);
        })

        // Services
        app.get('/services/', function(get, respond) {
            dbservicelist.select(respond);
        })

        app.get('/services/:id/', function(get, respond) {
            dbservicelist.selectId(get.params.id, respond);
        })

        app.post('/services/', function(get, respond) {
            dbservicelist.insert(get.body, respond);
        })

        app.put('/services/', function(get, respond) {
            dbservicelist.update(get.body, respond);
        })

        app.delete('/services/:id/', function(get, respond) {
            dbservicelist.delete(get.params.id, respond);
        })

        // Distributors
        app.get('/distributors/', function(get, respond) {
            dbdistributorlist.select(respond);
        })

        app.get('/distributors/:id/', function(get, respond) {
            dbdistributorlist.selectId(get.params.id, respond);
        })

        app.post('/distributors/', function(get, respond) {
            dbdistributorlist.insert(get.body, respond);
        })

        app.put('/distributors/', function(get, respond) {
            dbdistributorlist.update(get.body, respond);
        })

        app.delete('/distributors/:id/', function(get, respond) {
            dbdistributorlist.delete(get.params.id, respond);
        })

        // Projects
        app.get('/projects/', function(get, respond) {
            dbprojectlist.select(respond);
        })

        app.get('/projects/:id/', function(get, respond) {
            dbprojectlist.selectId(get.params.id, respond);
        })

        app.post('/projects/', function(get, respond) {
            dbprojectlist.insert(get.body, respond);
        })

        app.put('/projects/', function(get, respond) {
            dbprojectlist.update(get.body, respond);
        })

        app.delete('/projects/:id/', function(get, respond) {
            dbprojectlist.delete(get.params.id, respond);
        })

        // Clients
        app.get('/clients/', function(get, respond) {
            dbclientlist.select(respond);
        })

        app.get('/clients/:id/', function(get, respond) {
            dbclientlist.selectId(get.params.id, respond);
        })

        app.post('/clients/', function(get, respond) {
            dbclientlist.insert(get.body, respond);
        })

        app.put('/clients/', function(get, respond) {
            dbclientlist.update(get.body, respond);
        })

        app.delete('/clients/:id/', function(get, respond) {
            dbclientlist.delete(get.params.id, respond);
        })

        // Images in Server
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function(req, file, cb) {
                cb(null, './uploads/');
            },
            filename: function(req, file, cb) {
                cb(null, file.originalname);
            }
        });

        // Multer settings
        var upload = multer({
            storage: storage
        }).array('file');

        app.post('/uploads', (req, res) => {
            upload(req, res, function(err) {
                console.log(req.file);
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }

                res.json({ error_code: 0, err_desc: null });
            });
        });
    }
}

module.exports = new http();
