let NedDB = require('nedb');

// Criar o banco

let db = new NedDB({

    filename: 'users.db',
    autoload: true
});

// let express = require('express');
// let routes = express.Router();

module.exports = (app) => {

    let route = app.route('/users');

    route.get((req, res) => {

        //Listar usuarios
        db.find({}).sort({ name: 1 }).exec((err, users) => {
            if (err) {

                app.utils.error.send(err, req, res);
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.json({
                    users
                });
            }

        });

    });


    route.post((req, res) => {

        // Mostrar possiveis erros

        if (!app.utils.validator.user(app, req, res))

            return false;

        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        })


    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        db.findOne({ _id: req.params.id }).exec((err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json(user);
            }

        })
    });

    routeId.put((req, res) => {


        if (!app.utils.validator.user(app, req, res))

            return false;

        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {
                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json((req.body));
            }

        })
    })

    routeId.delete((req, res) => {

        db.remove({ _id: req.params.id }, {}, err => {

            if (err) {

                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json();
            }
        })
    })


};