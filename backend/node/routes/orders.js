const pool = require('../connection')

module.exports = function orders(app, logger) {
   
  // GET
  // Returns all incoming pharmacy orders sent by doctors
  app.get('/pharmacyincoming', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT p.id AS OrderID, p.create_date, u.id AS PatientID, CONCAT(u.first_name," ", u.last_name) AS Patient, d.id AS DrugID, d.name AS Drug, p.quantity, p.fill_date, u2.id AS DoctorID, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p JOIN user u ON u.id = p.patient_id JOIN user u2 ON u2.id = p.doctor_id JOIN drugs d on d.id = p.drug_id WHERE fill_date IS NULL ORDER BY p.create_date DESC', function (err, rows, fields) {
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

  // GET
  // Returns all incoming pharmacy orders
  app.get('/pharmacyoutgoing', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT p.id AS OrderID, p.create_date, u.id AS PatientID, CONCAT(u.first_name," ", u.last_name) AS Patient, d.id AS DrugID, d.name AS Drug, p.quantity, p.fill_date, u2.id AS DoctorID, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p JOIN user u ON u.id = p.patient_id JOIN user u2 ON u2.id = p.doctor_id JOIN drugs d on d.id = p.drug_id WHERE fill_date IS NOT NULL ORDER BY p.create_date DESC', function (err, rows, fields) {
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

  // GET
  // pharmacist received orders
  app.get('/pharmacyreceiving', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT p.id AS OrderID, p.create_date, u.id AS PatientID, CONCAT(u.first_name," ", u.last_name) AS Patient, d.id AS DrugID, d.name AS Drug, p.quantity, p.fill_date, u2.id AS DoctorID, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p JOIN user u ON u.id = p.patient_id JOIN user u2 ON u2.id = p.doctor_id JOIN drugs d on d.id = p.drug_id ORDER BY p.create_date DESC', function (err, rows, fields) {
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
  //update order
  app.put('/editReceiving', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          var patientID = req.body.PatientID;
          var doctorID =  req.body.doctor_id;
          var drugID = req.body.DrugID;
          var quantity =  req.body.Quantity;
          var createDate = req.body.create_date;
          var fillDate = req.body.fill_date;
          var orderID = req.body.id;

          connection.query("UPDATE `pharmtech`.`prescriptions` SET `patient_id` = ?, `doctor_id` = ?, `drug_id` = ?, `quantity` = ?, `create_date` = ?, `fill_date` = ? WHERE `id` = ?", [patientID, doctorID, drugID, quantity, createDate, fillDate, orderID],function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            res.end(JSON.stringify(result));
          });
        }
      });
  });

  //add order to manufacturer
  app.post('/placeOrder', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('INSERT INTO `pharmtech`.`inventory_orders` (drug_id, order_date, quantity) VALUES(?, ?, ?)', [req.body.drug_id, req.body.order_date, req.body.quantity],function (err, rows, fields) {
            if (err){
              logger.error("Problem inserting into inventory_orders table");
            }
            else {
              res.status(200).send(`added to the table!`);
            }
          });
        }
      });
  });

  app.delete('/deleteOrderRequest/:id', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query("DELETE FROM `pharmtech`.`order_requests` WHERE `id` = ?", [req.params.id], function (err, result, fields) {
            if (err)
              return console.error(error.message);
            res.end(JSON.stringify(result));
          });
        }
      });
  });
  
}