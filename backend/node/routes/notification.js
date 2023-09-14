const pool = require('../connection')

module.exports = function notification(app, logger) {

  // GET
  // Scans entire inventory and returns value on whether each drug is InStock or OutOfStock
  app.get('/pharmacyNotification', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          connection.query('SELECT d.name, d.id AS DrugID,CASE WHEN SUM(i.quantity) <= 0 OR SUM(i.quantity) IS NULL THEN "OutOfStock" WHEN SUM(i.quantity) > 0 THEN "InStock" ELSE "Error" END AS Available FROM inventory i JOIN drugs d ON i.drug_id = d.id GROUP BY d.id', function (err, rows, fields) {
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
  // Returns all notifications for given username
  app.get('/userNotifications/:id', async (req, res) => {    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          connection.query('SELECT n.id AS NotificationID, d.id AS DrugID, d.name AS DrugName, n.drugs_status AS InventoryStatus FROM notifications n JOIN drugs d ON d.id = drug_id JOIN user u ON u.id = n.pharmacist_id JOIN user_type ut ON u.userType_id = ut.id WHERE ut.type IN ("pharmacist", "pharmacy manager") AND u.first_name = ?;', [req.params.id], function (err, rows, fields) {
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
  // Scans entire inventory and returns value on whether given drugID is InStock or OutOfStock
  app.get('/pharmacyNotification/:id', async (req, res) => {    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          connection.query('SELECT d.name, d.id AS DrugID,CASE WHEN SUM(i.quantity) <= 0 OR SUM(i.quantity) IS NULL THEN "Out Of Stock" WHEN SUM(i.quantity) > 0 THEN "In Stock" ELSE "Error" END AS Available FROM inventory i JOIN drugs d ON i.drug_id = d.id WHERE d.id = ? GROUP BY d.id', [req.params.id], function (err, rows, fields) {
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


  // POST
  // Post Notification 
  app.post('/addNotification/:id', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          var drugID = req.body.drug_id;

          connection.query("INSERT INTO `pharmtech`.`notifications`(pharmacist_id, drug_id, drugs_status)(SELECT u.id, ?, (SELECT CASE WHEN SUM(i.quantity) <= 0 OR SUM(i.quantity) IS NULL THEN 'Out Of Stock' WHEN SUM(i.quantity) > 0 THEN 'In Stock' ELSE 'Error' END AS drugs_status FROM inventory i WHERE i.drug_id = n.drug_id GROUP BY i.drug_id) FROM `pharmtech`.`notifications` AS n INNER JOIN user u ON u.first_name = ? INNER JOIN user_type ut ON u.userType_id = ut.id WHERE ut.type IN ('pharmacist', 'pharmacy manager') LIMIT 1)", [drugID, req.params.id], function (err, rows, fields) {
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
  // Removes notification/s with drug_id for username "/:id" from notification table 
  app.delete('/deleteNotification/:id', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          var drugID = req.query.drug_id;
          connection.query("DELETE n FROM `pharmtech`.`notifications` AS n INNER JOIN user u ON u.id = n.pharmacist_id INNER JOIN user_type ut ON u.userType_id = ut.id WHERE n.`drug_id` = ? AND ut.type IN ('pharmacist', 'pharmacy manager') AND u.first_name = ?", [drugID, req.params.id], function (err, result, fields) {
            if (err)
              return console.error(error.message);
            res.end(JSON.stringify(result));
          });
        }
      });
  });
  
}