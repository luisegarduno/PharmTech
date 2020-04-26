const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
  database: 'pharmtech'
});

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  else
    logger.info("Connected to the DB!");
});

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

//get user
app.get('/verifyUser', (req, res) => {
  connection.query('SELECT EXISTS(SELECT * FROM user WHERE username = ? AND hashpass = ? AND userType_id = ?) AS result;', [req.body.username, req.body.password, req.body.type], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(rows[0].result.toString());
    }
  });
});

app.post('/registerUser', (req, res) => {
  connection.query('INSERT INTO user (first_name, last_name, username, hashpass, email, userType_id) VALUES ();', [req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.email, req.body.type], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
})

//inventory for pharmacist and manager
app.get('/getInventory', (req, res) => {
  connection.query('SELECT d.name, d.id ,i.quantity, d.unit_measure, i.exp_date, d.sell_price FROM inventory i join drugs d on i.drug_id = d.id', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//inventory for pharmacist and manager
app.get('/getDrugTypes', (req, res) => {
  connection.query('SELECT name AS drug_type FROM drug_types;', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//gets inventory information for doctor
app.get('/getDoctorInventory', (req, res) => {
  connection.query('SELECT batch_id, d.name, i.drug_id, quantity, exp_date, t.name AS drug_type, r.related FROM inventory AS i LEFT JOIN drugs AS d ON d.id = i.drug_id LEFT JOIN (SELECT drug_type, GROUP_CONCAT(DISTINCT name) AS related FROM drugs GROUP BY drug_type) AS r ON d.drug_type = r.drug_type JOIN drug_types AS t ON t.id = d.drug_type;', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//get specific drug from inventory
app.get('/getInventory/:id', (req, res) => {

  connection.query('SELECT d.name, i.quantity, d.unit_measure, i.exp_date FROM inventory i join drugs d on d.id = i.drug_id WHERE i.drug_id = ?', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET
// Returns everything in inventory
app.get('/pharmacyInventory', (req, res) => {
  connection.query('SELECT d.name, d.id, i.quantity, i.exp_date FROM inventory i join drugs d on i.drug_id = d.id', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET
// Scans entire inventory and returns value on whether each drug is InStock or OutOfStock
app.get('/pharmacyNotification', (req, res) => {
  connection.query('SELECT d.name, d.id AS DrugID,CASE WHEN SUM(i.quantity) <= 0 OR SUM(i.quantity) IS NULL THEN "OutOfStock" WHEN SUM(i.quantity) > 0 THEN "InStock" ELSE "Error" END AS Available FROM inventory i JOIN drugs d ON i.drug_id = d.id GROUP BY d.id', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET
// Scans entire inventory and returns value on whether given drugID is InStock or OutOfStock
app.get('/pharmacyNotification/:id', (req, res) => {
  connection.query('SELECT d.name, d.id AS DrugID,CASE WHEN SUM(i.quantity) <= 0 OR SUM(i.quantity) IS NULL THEN "OutOfStock" WHEN SUM(i.quantity) > 0 THEN "InStock" ELSE "Error" END AS Available FROM inventory i JOIN drugs d ON i.drug_id = d.id WHERE d.id = ? GROUP BY d.id', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET : drug id
// Returns infomation for specific drugID
app.get('/pharmacyInventory/:id', (req, res) => {

  connection.query('SELECT d.name, d.id, i.quantity, i.exp_date FROM inventory i join drugs d on d.id = i.drug_id WHERE i.drug_id = ?', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET : patient id
// Returns details for all prescriptions given to patientID
app.get('/getPrescription/:id', (req, res) => {
 
  connection.query('SELECT p.id as prescription_id, CONCAT(u.first_name, " ", u.last_name) as patient_name, d.name, p.quantity, p.fill_date, p.create_date, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p join user u on u.id = p.patient_id join user u2 on u2.id = p.doctor_id join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.id = ?', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});


//pharmacy revenues
app.get('/getRevenues', (req, res) => {
  connection.query('SELECT d.name, d.sell_price * p.quantity FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.fill_date IS NOT NULL', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//pharmacy expenses
app.get('/getExpenses', (req, res) => {
  connection.query('SELECT d.name, d.purchase_price * io.quantity FROM `pharmtech`.`inventory_orders` io join `pharmtech`.`drugs` d on d.id = io.drug_id WHERE io.fulfill_date IS NOT NULL', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//pharmacist manager sales pages
app.get('/getPharmManagerSales', (req, res) => {
  connection.query('SELECT d.name, p.quantity, d.sell_price FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.fill_date IS NOT NULL', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//pharmacist manager recent sales pages
app.get('/getRecentPharmManagerSales', (req, res) => {
  connection.query('SELECT d.name, p.quantity, d.sell_price FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id WHERE p.fill_date IS NOT NULL ORDER BY p.fill_date DESC LIMIT 5', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//pharmacy sales
app.get('/getSales', (req, res) => {
  connection.query('SELECT u.first_name, u.last_name, d.name, d.sell_price FROM `pharmtech`.`prescriptions` p join `pharmtech`.`drugs` d on d.id = p.drug_id join `pharmtech`.`user` u on u.id = p.patient_id WHERE p.fill_date IS NOT NULL LIMIT 5', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET
// Returns all incoming pharmacy orders sent by doctors
app.get('/pharmacyincoming', (req, res) => {
  connection.query('SELECT * FROM `pharmtech`.`prescriptions` WHERE fill_date IS NULL', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET
// Returns all incoming pharmacy orders
app.get('/pharmacyoutgoing', (req, res) => {
  connection.query('SELECT * FROM `pharmtech`.`prescriptions` WHERE fill_date IS NOT NULL', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//pharmacist received orders
app.get('/pharmacyreceiving', (req, res) => {
  connection.query('SELECT p.create_date, CONCAT(u.first_name, " ", u.last_name) AS Patient, d.name, p.quantity, p.fill_date, CONCAT(u2.first_name, " ", u2.last_name) AS doctor_name FROM `pharmtech`.`prescriptions` p JOIN user u ON u.id = p.patient_id JOIN user u2 ON u2.id = p.doctor_id JOIN drugs d on d.id = p.drug_id ORDER BY p.create_date DESC', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// Returns all prescriptions sorted out by Drug Type
app.get('/pharmacylist', (req, res) => {
  connection.query('SELECT dt.name AS Title, CONCAT(u.first_name, " ", u.last_name) AS Patient, p.id AS PrescriptionID, d.name AS PrescriptionName, d.id AS DrugID, CONCAT(p.quantity,d.unit_measure) AS Quantity FROM `pharmtech`.`prescriptions` p JOIN user u ON u.id = p.patient_id JOIN drugs d ON d.id = p.drug_id LEFT JOIN drug_types dt ON d.drug_type = dt.id ORDER BY dt.name ASC', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// Get list of prescriptions for specific user 
app.get('/pharmacylist/:id', (req, res) => {
  connection.query('SELECT u.id AS PatientID, CONCAT(u.first_name," ", u.last_name) AS Patient,p.id AS PrescriptionID, d.name AS PrescriptionName, d.id AS DrugID, CONCAT(p.quantity," ",d.unit_measure) AS Quantity FROM prescriptions p JOIN user u ON u.id = p.patient_id JOIN drugs d ON d.id = p.drug_id WHERE u.id = ?', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//get cart
app.get('/getCartInventory', (req, res) => {

  connection.query('SELECT id, name, purchase_price FROM drugs', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});


//inventory for manufacturer
app.get('/manufacturerinventory', (req, res) => { 
  connection.query('SELECT * FROM `pharmtech`.`manufacturer_inventory`', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//outgoing orders for manufacturer
app.get('/manufacturerorders', (req, res) => { 
  connection.query('SELECT *, io.id FROM `pharmtech`.`inventory_orders` io join `pharmtech`.`drugs` d on d.id = io.drug_id order by io.id', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//sales for manufacturer
app.get('/manufacturersales', (req, res) => { 
  connection.query('SELECT d.name, d.purchase_price, sum(io.quantity) dollars FROM `pharmtech`.`inventory_orders` io join `pharmtech`.`drugs` d on d.id = io.drug_id WHERE fulfill_date IS NOT NULL group by d.id', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

app.get('/manuinventory', (req, res) => { 
  connection.query('SELECT * FROM `pharmtech`.`manufacturer_inventory` io join `pharmtech`.`drugs` d on d.id = io.drug_id WHERE expired IS NOT NULL', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//POST
app.post('/addInventory', (req, res) => {

  connection.query('INSERT INTO `pharmtech`.`inventory` (drug_id, quantity, exp_date) VALUES(?, ?, ?)', [req.body.drug_id, req.body.quantity, req.body.exp_date], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into inventory table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//add order to manufacturer
app.post('/placeOrder', (req, res) => {

  connection.query('INSERT INTO `pharmtech`.`inventory_orders` (drug_id, order_date, quantity) VALUES(?, ?, ?)', [req.body.drug_id, req.body.order_date, req.body.quantity],function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into inventory_orders table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT 
//update expirations on manu inventory
app.put('/updateExpiration', async (req, res) => {
  connection.query("UPDATE `pharmtech`.`manufacturer_inventory` SET `expired` = ? WHERE `batch_id` = ?", [req.body.expired, req.body.batch_id], function (err, result, fields) {
  if (err) throw err;
  res.end(JSON.stringify(result)); 
  });
})

// PUT 
//update sellabilty on manu inventory
app.put('/updateOK', async (req, res) => {
  connection.query("UPDATE `pharmtech`.`manufacturer_inventory` SET `ok_to_sell` = ? WHERE `batch_id` = ?", [req.body.expired, req.body.batch_id], function (err, result, fields) {
  if (err) throw err;
  res.end(JSON.stringify(result)); 
  });
})

//add prescription
app.post('/addPrescription', (req, res) => {

  connection.query("INSERT INTO prescriptions (patient_id, drug_id, quantity, create_date, doctor_id) VALUES(?, ?, ?, ?, ?)", [req.body.patient_id, req.body.drug_id, req.body.quantity, req.body.create_date, req.body.doctor_id], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into prescription table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT 
//update inventory quantity
app.put('/putQuantity', async (req, res) => {
  //var id = req.params.drugID;
  var quantity = req.body.quantity;

  connection.query("UPDATE `pharmtech`.`inventory` SET `quantity` = ? WHERE `productCode` = ?", [req.body.quantity, req.body.drugID],function (err, result, fields) {
  if (err) throw err;
  //console.log(result);
  res.end(JSON.stringify(result)); 
  });
});

//DELETE
//pharmacist delete inventory item
app.delete('/delete/:drugID', async (req, res) => {
  
  connection.query("DELETE FROM `pharmtech`.`inventory` WHERE `drug_id` = ?", [req.params.drugID], function (err, result, fields) {
		if (err) 
			return console.error(error.message);
		res.end(JSON.stringify(result)); 
	  });
});

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
