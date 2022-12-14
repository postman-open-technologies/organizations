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


    connection.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM organizations_elements WHERE organization_id = " + event.organization_id + " and element_id = " + event.element_id + " LIMIT 1";
      connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result && result.length > 0){
          callback( null, result[0] ); 
          connection.end();
        }
        else{

          var sql = "INSERT INTO organizations_elements(organization_id,element_id) VALUES(" + event.organization_id + ", " + event.element_id + ")";
        
          connection.query(sql, function (error, results, fields) {

            var inserted = {};
            inserted.id = results.insertId;
            inserted.organization_id = event.organization_id;
            inserted.element_id = event.element_id;
        
            callback( null, inserted );
            connection.end();
      
          });          

        }
      });
    });
});