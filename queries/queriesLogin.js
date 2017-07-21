var connection = require('../connection');
var jwt = require('jsonwebtoken');

function MethodDBLogin() {

    // Login
    this.login = function(data, respond) {
        connection.get(function(er, cn) {
            cn.query('SELECT * FROM users WHERE user = ? and password = ?', [data.user, data.password], function(error, result) {
                cn.release();
                if (error) {
                    respond.send('error');
                } else {
                    if (result.length == 0) {
                        console.log('User not found');
                        respond.send('notfound');
                    } else {
                        var token = jwt.sign({
                            user: data.user,
                            rol: 'admin'
                        }, 'secretWord', { expiresIn: '1200000s' });
                        respond.send(token);
                    }
                }
            })
        })
    }

}

module.exports = new MethodDBLogin();