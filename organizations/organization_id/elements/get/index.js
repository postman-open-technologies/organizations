const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });

    var sql = 'SELECT DISTINCT e.id,e.name FROM elements e INNER JOIN organizations_elements oe ON e.id = oe.element_id WHERE oe.organization_id = ' + event.organization_id + ' ORDER BY e.Name';
    connection.query(sql, function (error, results, fields) {
    callback( null, results );
  });
  connection.end();
});