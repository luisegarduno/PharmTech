const pool = require('../connection')

module.exports = function sales(app, logger) {

  //pharmacy revenues
  app.get('/getPhamRequest', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT o.id, o.drug_id, d.name, o.quantity, d.unit_measure, o.date_requested FROM `pharmtech`.`order_requests` o join drugs d on d.id = o.drug_id', function (err, rows, fields) {
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

  //pharmacy revenues
  app.get('/getRevenues', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, d.sell_price * p.quantity FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.fill_date IS NOT NULL', function (err, rows, fields) {
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

  //pharmacy expenses
  app.get('/getExpenses', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, d.purchase_price * io.quantity FROM `pharmtech`.`inventory_orders` io join `pharmtech`.`drugs` d on d.id = io.drug_id WHERE io.fulfill_date IS NOT NULL', function (err, rows, fields) {
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

  //pharmacist manager sales pages
  app.get('/getPharmManagerSales', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, p.quantity, d.sell_price FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.fill_date IS NOT NULL', function (err, rows, fields) {
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

  //pharmacist manager recent sales pages
  app.get('/getRecentPharmManagerSales', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, p.quantity, d.sell_price FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.fill_date IS NOT NULL ORDER BY p.fill_date DESC LIMIT 5', function (err, rows, fields) {
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

  //pharmacy sales
  app.get('/getSales', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT u.first_name, u.last_name, d.name, d.sell_price FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id join `pharmtech`.`user` u on u.id = p.patient_id WHERE p.fill_date IS NOT NULL LIMIT 5', function (err, rows, fields) {
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

}