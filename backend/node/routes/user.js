const pool = require('../connection')

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
                connection.query('SELECT * FROM user', function (err, rows, fields) {
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
                connection.query('SELECT IF(EXISTS(SELECT * FROM user WHERE username = ? AND hashpass = ? AND userType_id = ?), (SELECT first_name AS result FROM user WHERE hashpass = ?), 0) AS result;', [req.body.username, req.body.password, req.body.type, req.body.password], function (err, rows, fields) {
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

    //POST
    //add in user
    app.post('/registerUser', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection');
            }
            else {
                connection.query('INSERT INTO user (first_name, last_name, username, hashpass, email, userType_id) VALUES (?, ?, ?, ?, ?, ?);', [req.body.first_name, req.body.last_name, req.body.username, req.body.hashpass, req.body.email, req.body.userType_id], function (err, rows, fields) {
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
                connection.query('SELECT u.id AS PatientID, CONCAT(u.first_name, " ", u.last_name) AS PatientName FROM user u JOIN user_type ut ON u.userType_id = ut.id WHERE ut.type = "patient"', function (err, rows, fields) {
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
                connection.query('SELECT u.id AS DoctorID, CONCAT(u.first_name, " ", u.last_name) AS DoctorName FROM user u JOIN user_type ut ON u.userType_id = ut.id WHERE ut.type = "doctor"', function (err, rows, fields) {
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