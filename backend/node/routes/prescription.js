const pool = require('../connection')

module.exports = function prescription(app, logger) {

  // GET : patient id
  // Returns details for all prescriptions given to patientID
  app.get('/getPrescription/:id', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT p.id as prescription_id, CONCAT(u.first_name, " ", u.last_name) as patient_name, d.name, p.quantity, p.fill_date, p.create_date, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p join user u on u.id = p.patient_id join user u2 on u2.id = p.doctor_id join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.id = ?', [req.params.id], function (err, rows, fields) {
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
  
  // Returns all prescriptions sorted out by Drug Type
  app.get('/pharmacylist', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT p.title AS Title, CONCAT(u.first_name, " ", u.last_name) AS Patient, u.id AS PatientID, p.id AS PrescriptionID, d.name AS DrugName, d.id AS DrugID, p.quantity AS Quantity, d.unit_measure AS Unit, p.doctor_id, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p JOIN user u ON u.id = p.patient_id JOIN user u2 ON u2.id = p.doctor_id JOIN drugs d ON d.id = p.drug_id LEFT JOIN drug_type dt ON d.drug_type = dt.id ORDER BY dt.name ASC', function (err, rows, fields) {
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
  
  // Get list of prescriptions for specific user 
  app.get('/pharmacylist/:id', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT p.title AS Title, CONCAT(u.first_name, " ", u.last_name) AS Patient, u.id AS PatientID, p.id AS PrescriptionID, d.name AS DrugName, d.id AS DrugID, p.quantity AS Quantity, d.unit_measure AS Unit, p.doctor_id, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM prescriptions p JOIN user u ON u.id = p.patient_id JOIN user u2 ON u2.id = p.doctor_id JOIN drugs d ON d.id = p.drug_id WHERE u.id = ?', [req.params.id], function (err, rows, fields) {
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
  
  //add prescription
  app.post('/makeRequest', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          var drugID = req.body.drug_id;
          var quantity =  req.body.quantity;
          var dateRequested = req.body.date_requested;

          connection.query("INSERT INTO `pharmtech`.`order_requests` (drug_id, quantity, date_requested) VALUES(?, ?, ?)", [drugID, quantity, dateRequested], function (err, rows, fields) {
            if (err){
              logger.error("Problem inserting into prescription table");
            }
            else {
              res.status(200).send(`added to the table!`);
            }
          });
        }
      });
  });
  
  //add prescription
  app.post('/addPrescription', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          var patientID = req.body.patient_id;
          var drugID = req.body.drug_id;
          var quantity =  req.body.quantity;
          var createDate = req.body.create_date;
          var title = req.body.title;
          var doctorID =  req.body.doctor_id;

          connection.query("INSERT INTO prescriptions (patient_id, drug_id, quantity, create_date, title, doctor_id) VALUES(?, ?, ?, ?, ?, ?)", [patientID, drugID, quantity, createDate, title, doctorID], function (err, rows, fields) {
            if (err){
              logger.error("Problem inserting into prescription table");
            }
            else {
              res.status(200).send(`added to the table!`);
            }
          });
        }
      });
  });
  
  // DELETE
  // pharmacist delete prescription given certain prescriptionID
  app.delete('/deletePrescription/:id', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query("DELETE FROM `pharmtech`.`prescriptions` WHERE `id` = ?", [req.params.id], function (err, result, fields) {
          if (err)
            return console.error(error.message);
            //console.log(result);
          res.end(JSON.stringify(result));
        });
      }
    });
  });

}