var connection = require('../../connection');
var jwt = require('jsonwebtoken');

function MethodDBTeam() {

    // Employees
    this.select = function(respond) {
        connection.get(function(er, cn) {
            cn.query('SELECT * FROM distributors_list', function(error, result) {
                cn.release();
                if (error) {
                    respond.send({ status: 'Error' })
                } else {
                    respond.send(result);
                }
            })
        })
    }

    this.selectId = function(id, respond) {
        connection.get(function(er, cn) {
            cn.query('SELECT * FROM distributors_list WHERE id=?', id, function(error, result) {
                cn.release();
                if (error) {
                    respond.send({ status: 'Error' });
                } else {
                    respond.send(result);
                }
            })
        })
    }

    this.insert = function(data, respond) {
        connection.get(function(er, cn) {
            cn.query('INSERT INTO distributors_list SET ?', data, function(error, result) {
                cn.release();
                if (error) {
                    respond.send({ status: 'Error' });
                } else {
                    respond.send({ status: 'Inserted' });
                }
            })
        })
    }

    this.update = function(data, respond) {
        connection.get(function(er, cn) {
            cn.query('UPDATE distributors_list SET ? WHERE id = ?', [data, data.id], function(error, result) {
                cn.release();
                if (error) {
                    respond.send({ status: 'Error' });
                } else {
                    respond.send({ status: 'Updated' });
                }
            })
        })
    }

    this.delete = function(id, respond) {
        connection.get(function(er, cn) {
            cn.query('DELETE FROM distributors_list WHERE id = ?', id, function(error, result) {
                cn.release();
                if (error) {
                    respond.send({ status: 'Error' });
                } else {
                    respond.send({ status: 'Removed' });
                }
            })
        })
    }

}

module.exports = new MethodDBTeam();