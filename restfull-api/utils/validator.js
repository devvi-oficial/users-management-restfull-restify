module.exports = {


    user: ((app, req, res) => {


        // req.assert('_confirm-password', 'Password does not matched.').equals(req.body.password);
        req.assert('_name', 'Name is required.').notEmpty();
        req.assert('_email', 'Incorrect email format.').isEmail();
        req.assert('_password', 'Password is required.').notEmpty().isLength({ min: 6 });


        let errors = req.validationErrors();

        if (errors) {

            app.utils.error.send(errors, req, res);
            return false;
        } else {

            return true;
        }

    })
}