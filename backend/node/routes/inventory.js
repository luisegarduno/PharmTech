const pool = require('../connection')

module.exports = function inventory(app, logger) {

  // GET : drug id
  // Returns infomation for specific drugID
  app.get('/pharmacyInventory/:id', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, d.id, d.unit_measure AS DrugUnit, i.quantity, i.exp_date FROM inventory i join drugs d on d.id = i.drug_id WHERE i.drug_id = ?', [req.params.id], function (err, rows, fields) {
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

  //inventory for pharmacist and manager
  app.get('/getInventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, d.id ,i.quantity, d.unit_measure, i.exp_date, d.sell_price, d.rec_stock_amount, d.unit_measure AS units FROM inventory i join drugs d on i.drug_id = d.id', function (err, rows, fields) {
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
  
  //inventory for pharmacist and manager
  app.get('/getDrugTypes', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT name AS drug_type FROM drug_type;', function (err, rows, fields) {
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
  // Returns drugID and drug name
  app.get('/getDrug', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.id AS DrugID, d.name AS DrugName, SUM(i.quantity) AS Total FROM drugs d JOIN inventory i ON d.id = i.drug_id GROUP BY d.id', function (err, rows, fields) {
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
  
  //gets inventory information for doctor
  app.get('/getDoctorInventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT batch_id, d.name, i.drug_id, quantity, exp_date, t.name AS drug_type, r.related FROM inventory AS i LEFT JOIN drugs AS d ON d.id = i.drug_id LEFT JOIN (SELECT drug_type, GROUP_CONCAT(DISTINCT name) AS related FROM drugs GROUP BY drug_type) AS r ON d.drug_type = r.drug_type JOIN drug_type AS t ON t.id = d.drug_type;', function (err, rows, fields) {
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
  
  //get specific drug from inventory
  app.get('/getInventory/:id', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, i.quantity, d.unit_measure, i.exp_date FROM inventory i join drugs d on d.id = i.drug_id WHERE i.drug_id = ?', [req.params.id], function (err, rows, fields) {
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
  // Returns everything in inventory
  app.get('/pharmacyInventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT d.name, d.id, d.unit_measure AS DrugUnit, i.quantity, i.exp_date FROM inventory i join drugs d on i.drug_id = d.id', function (err, rows, fields) {
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
  
  //get cart
  app.get('/getCartInventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('SELECT id, name, purchase_price FROM drugs', function (err, rows, fields) {
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
  
  //POST
  app.post('/addInventory', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          connection.query('INSERT INTO `pharmtech`.`inventory` (drug_id, quantity, exp_date) VALUES(?, ?, ?)', [req.body.drug_id, req.body.quantity, req.body.exp_date], function (err, rows, fields) {
            if (err){
              logger.error("Problem inserting into inventory table");
            }
            else {
              res.status(200).send(`added to the table!`);
            }
          });
        }
      });
  });
  
  // PUT 
  //update inventory quantity
  app.put('/putQuantity', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          //var id = req.params.drugID;
          var quantity = req.body.quantity;
          connection.query("UPDATE `pharmtech`.`inventory` SET `quantity` = ? WHERE `productCode` = ?", [req.body.quantity, req.body.drugID],function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            res.end(JSON.stringify(result));
          });
        }
      });
  });
  
  // PUT 
  //update inventory quantity
  app.put('/editPrescription', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
          var title = req.body.Title;
          var patientID = req.body.PatientID;
          var drugID = req.body.DrugID;
          var quantity =  req.body.Quantity;
          var doctorID =  req.body.doctor_id;
          var createDate = req.body.create_date;
          var prescriptionID = req.body.id;

          connection.query("UPDATE `pharmtech`.`prescriptions` SET `title` = ?, `patient_id` = ?, `drug_id` = ?, `quantity` = ?, `doctor_id` = ?, `create_date` = ? WHERE `id` = ?", [title, patientID, drugID, quantity, doctorID, createDate, prescriptionID],function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            res.end(JSON.stringify(result));
          });
        }
      });
  });
  
  //DELETE
  //pharmacist delete inventory item
  app.delete('/delete/:drugID', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        connection.query("DELETE FROM `pharmtech`.`inventory` WHERE `drug_id` = ?", [req.params.drugID], function (err, result, fields) {
          if (err)
            return console.error(error.message);
            //console.log(result);
          res.end(JSON.stringify(result));
        });
      }
    });
  });

}