const pool = require('../connection')

module.exports = function manufacturer(app, logger) {

  //inventory for manufacturer
  app.get('/manufacturerinventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT * FROM `pharmtech`.`manufacturer_inventory`', function (err, rows, fields) {
            if (err) {
              logger.error("Error while executing Query");
              res.status(400).json({
                "data": [],
                "error": "MySQL error"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
  });

  //outgoing orders for manufacturer
  app.get('/manufacturerorders', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT *, io.id FROM `pharmtech`.`inventory_orders` io join `pharmtech`.`drugs` d on d.id = io.drug_id order by io.id', function (err, rows, fields) {
            if (err) {
              logger.error("Error while executing Query");
              res.status(400).json({
                "data": [],
                "error": "MySQL error"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
  });

  //sales for manufacturer
  app.get('/manufacturersales', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, d.purchase_price, sum(io.quantity) dollars FROM `pharmtech`.`inventory_orders` io join `pharmtech`.`drugs` d on d.id = io.drug_id WHERE fulfill_date IS NOT NULL group by d.id', function (err, rows, fields) {
            if (err) {
              logger.error("Error while executing Query");
              res.status(400).json({
                "data": [],
                "error": "MySQL error"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
  });

  app.get('/manuinventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT * FROM `pharmtech`.`manufacturer_inventory` io join `pharmtech`.`drugs` d on d.id = io.drug_id WHERE expired IS NOT NULL', function (err, rows, fields) {
            if (err) {
              logger.error("Error while executing Query");
              res.status(400).json({
                "data": [],
                "error": "MySQL error"
              })
            }
            else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
  });

  // PUT 
  //update expirations on manu inventory
  app.put('/updateExpiration', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query("UPDATE `pharmtech`.`manufacturer_inventory` SET `expired` = ? WHERE `batch_id` = ?", [req.body.expired, req.body.batch_id], function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
          });
        }
    });
  });

  // PUT
  //update sellabilty on manu inventory
  app.put('/updateOK', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query("UPDATE `pharmtech`.`manufacturer_inventory` SET `ok_to_sell` = ? WHERE `batch_id` = ?", [req.body.expired, req.body.batch_id], function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
          })
        }
      })
  });
}