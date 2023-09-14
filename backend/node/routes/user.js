const pool = require('../connection')
const bcrypt = require('bcrypt');

module.exports = function user(app, logger) {

    //get list of users
    app.get('/getUser', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
               // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            }
            else {
                connection.query('SELECT * FROM user', function (err, rows) {
                    if (err) {
                        logger.error("Error while executing Query");
                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else{
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

        // POST /user/login
    app.post('/verifyUser', (req, res) => {
        console.log("CHECK:", req.body.username, req.body.password, req.body.type);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                const username = req.body.username
                const hashpass = req.body.password
                const id_type = req.body.type

                connection.query('SELECT u.password, u.id FROM `pharmtech`.`user` u WHERE u.username = ?', [username], function (err, rows) {
                    if (err) { 
                        // if there's an error w/ the query, release the connection instance & log the error
                        connection.release()
                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else {
                        bcrypt.compare(hashpass, rows[0].password, function (err, result) {
                            if(err){
                                connection.release()
                                logger.error("Error while logging in w/ user: \n", err); 
                                res.status(400).json({
                                    "data": [],
                                    "error": "MySQL error"
                                })
                            }
                            if(result){
                                console.log("Username:", username, "\tPassword:", hashpass, "\tSavedHash:", rows[0].password)
                                console.log("Correct! Hash matches w/ plain text (UserID:", rows[0].id, ")")

                                connection.query('SELECT IF(EXISTS(SELECT * FROM `pharmtech`.`user` u WHERE u.username = ? AND u.password = ? AND userType_id = ?), (SELECT u.username AS result FROM `pharmtech`.`user` u WHERE u.password = ?), 0) AS result', [username, rows[0].password, id_type, rows[0].password], function (err2, rows2) {
                                    connection.release()
                                    if (err2) {
                                        logger.error("Error while executing Query");
                                        res.status(400).json({
                                            "data": [],
                                            "error": "MySQL error"
                                        })
                                    } else {
                                        res.status(201).json(rows2[0].result.toString());
                                    }
                                });
                            }
                            else {
                                connection.release()
                                logger.error("Error while logging in w/ user: \n", err); 
                                res.status(401).json({
                                    "data": [],
                                    "error": "Invalid Credentials",
                                    "message": "Wrong Credentials!"
                                })
                            }
                        })
                    }
                })
            }
        });
    });


    /*
    //get user
    app.post('/verifyUser', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection');
            }
            else {
                connection.query('SELECT IF(EXISTS(SELECT * FROM user WHERE username = ? AND password = ? AND userType_id = ?), (SELECT first_name AS result FROM user WHERE password = ?), 0) AS result;', [req.body.username, req.body.password, req.body.type, req.body.password], function (err, rows) {
                    if (err) {
                        logger.error("Error while executing Query");
                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else{
                        res.status(200).send(rows[0].result.toString());
                    }
                });
            }
        });
    });
    */

    // POST /registerUser
    app.post('/registerUser', (req, res) => { console.log("CHECK:", req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email, req.body.userType_id);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there's an issue obtaining a connection, release the connection instance & log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                const first_name = req.body.first_name
                const last_name = req.body.last_name
                const username = req.body.username
                const password = req.body.password
                const email = req.body.email
                const userType_id = req.body.userType_id

                // Hash the password
                const saltRounds = 10;
                bcrypt.hash(hashpass, saltRounds, function(err, hash) {
                    connection.query('INSERT INTO `pharmtech`.`user` (first_name, last_name, username, password, email, userType_id) VALUES (?, ?, ?, ?, ?, ?);', [first_name, last_name, username, hash, email, userType_id], function (err, rows) {
                        if (err) { 
                            // if there's an error w/ the query, release the connection instance & log the error
                            connection.release()
                            logger.error("Error while creating account (email, password, username): \n", err); 
                            res.status(400).json({
                                "data": [],
                                "error": "MySQL error"
                            })
                        } else{
                            res.status(201).json({
                                "data": rows
                            });
                        }
                    });
                })
            }
        });
    });

    // GET
    // Returns patient and patientID
    app.get('/getPatient', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection');
            }
            else {
                connection.query('SELECT u.id AS PatientID, CONCAT(u.first_name, " ", u.last_name) AS PatientName FROM user u JOIN user_type ut ON u.userType_id = ut.id WHERE ut.type = "patient"', function (err, rows) {
                    if (err) {
                        logger.error("Error while executing Query");
                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else{
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

    // GET
    // Returns DoctorID and Doctor ID
    app.get('/getDoctor', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection');
            }
            else {
                connection.query('SELECT u.id AS DoctorID, CONCAT(u.first_name, " ", u.last_name) AS DoctorName FROM user u JOIN user_type ut ON u.userType_id = ut.id WHERE ut.type = "doctor"', function (err, rows) {
                    if (err) {
                        logger.error("Error while executing Query");
                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else{
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });
    
}