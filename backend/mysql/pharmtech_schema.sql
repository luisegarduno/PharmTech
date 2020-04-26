DROP DATABASE IF EXISTS pharmtech;
CREATE DATABASE pharmtech; 

USE pharmtech;

DROP TABLE IF EXISTS user_type;
CREATE TABLE user_type(
	id INT AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user_type (type) VALUES ('pharmacist'), ('pharmacy manager'), ('doctor'), ('manufacturer'), ('patient');

DROP TABLE IF EXISTS user;
CREATE TABLE user(
	id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(100),
    hashpass VARCHAR(500),
    email VARCHAR(500),
    userType_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userType_id)
		REFERENCES user_type(id)
        ON UPDATE CASCADE
);

INSERT INTO user (first_name, last_name, username, hashpass, email, userType_id) VALUES 
	('Jane', 'Doe', 'JDoe', '008c70392e3abfbd0fa47bbc2ed96aa99bd49e159727fcba0f2e6abeb3a9d601', 'jdoe@pharmtech.com', 1),
    ('John', 'Smith', 'JSmith', '78e1ff0deb8d9b3cbaa934b8f1773cd117edea714dcab0e62109233a3e36293b', 'jadoe@pharmtech.com', 2),
    ('Sarah', 'Jones', 'SJones', '1ea99aec6fa7ed38356ecab95920f8bf92c8cbc1d45591ecebe574bcf30b56af', 'svega@pharmtech.com', 3),
    ('Sam', 'Free', 'SFree', 'bdb5d62282c2c5761a3a15cd5968429dd37f4920751e55aaf5a01a04e3211d45', 'sfree@pharmtech.com', 3),
    ('Will', 'Vega', 'WVega', 'eba60cfdde3b1564fa26e6930b953bcf5b8900880d81519122529c51477ac063', 'wvega@pharmtech.com', 4),
    ('Emily', 'Smith', 'ESmith', null, null, 5),
    ('Ryan', 'Jones', 'RJones', null, null, 5),
    ('Leslie', 'Wan', null, null, null, 5);

DROP TABLE IF EXISTS drug_types;
CREATE TABLE drug_types(
	id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO drug_types (name) VALUES ('antibiotic'), ('tranquilizer'), ('antipyretic'), ('analgesic');

DROP TABLE IF EXISTS drugs;
CREATE TABLE drugs(
	id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    sell_price FLOAT NOT NULL,
    purchase_price FLOAT NOT NULL,
    manu_price FLOAT NOT NULL,
    rec_stock_amount INT NOT NULL,
    unit_measure VARCHAR(50) NOT NULL,
    drug_type INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(drug_type)
		REFERENCES drug_types(id)
        ON UPDATE CASCADE
);

INSERT INTO drugs (name, description, sell_price, purchase_price, manu_price, rec_stock_amount, unit_measure, drug_type) VALUES 
	('Amoxicillin', 'Penicillin antibiotic that fights bacteria. Used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.', 2.50, 1.00, 0.50, 5000, 'mg', 1),
    ('Doxyxycline', 'Tetracycline antibiotic that fights bacteria in the body. Used to treat many different bacterial infections, such as acne, urinary tract infections, intestinal infections, respiratory infections, eye infections, gonorrhea, chlamydia, syphilis, periodontitis (gum disease), and others.', 4.00, 2.50, 1.00, 3000, 'mg', 1),
    ('Cephalexin', 'Cephalosporin antibiotic. It works by fighting bacteria in your body. Used to treat infections caused by bacteria, including upper respiratory infections, ear infections, skin infections, urinary tract infections and bone infections.',3.25, 1.75, 0.75, 2000, 'mg', 1),
    ('Diazepam', 'Benzodiazepine. Affects chemicals in the brain that may be unbalanced in people with anxiety. Used to treat anxiety disorders, alcohol withdrawal symptoms, or muscle spasms.', 3.00, 2.00, 1.00, 4000, 'mg', 2),
    ('Alprazolam', 'Benzodiazepine. Affects chemicals in the brain that may be unbalanced in people with anxiety. Used to treat anxiety disorders, alcohol withdrawal symptoms, or muscle spasms.',2.75, 1.10, 0.75, 4000, 'mg', 2),
    ('Clonazepam', 'Benzodiazepine. Affects chemicals in the brain that may be unbalanced to treat seizures and certain types of anxiety disorders. Type of anti-epileptic drug. Used to treat certain seizure disorders (including absence seizures or Lennox-Gastaut syndrome) in adults and children.', 4.00, 2.90, 1.50, 2000, 'mg', 2),
    ('Aspirin', 'Salicylate. Reduces substances in the body that cause pain, fever, and inflammation. Used to treat pain, and reduce fever or inflammation. It is sometimes used to treat or prevent heart attacks, strokes, and chest pain (angina).',2.00, 0.90, 0.25, 6000, 'mg', 3),
    ('Acetaminophen', 'Pain reliever and a fever reducer. Used to treat mild to moderate and pain, to treat moderate to severe pain in conjunction with opiates, or to reduce fever. ',1.80, .50, 0.10 ,4000, 'tablets', 3),
    ('Ibuprofen', 'Nonsteroidal anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body. Used to reduce fever and treat pain or inflammation caused by many conditions such as headache, toothache, back pain, arthritis, menstrual cramps, or minor injury.', 1.90, 0.80, 0.30, 6000, 'mg', 3),
    ('Naproxen', 'Nonsteroidal anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body. Used to treat pain or inflammation caused by conditions such as arthritis, ankylosing spondylitis, tendinitis, bursitis, gout, or menstrual cramps.', 1.50, 0.50, 0.10, 6000, 'ml', 4),
    ('Diclofenac', 'Nonsteroidal anti-inflammatory drug. Reduces substances in the body that cause pain and inflammation. Used to treat mild to moderate pain, or signs and symptoms of osteoarthritis or rheumatoid arthritis. ', 2.30, 1.40, 1.00, 5000, 'mg', 4),
    ('Ketorolac', 'Nonsteroidal anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body. Used short-term (5 days or less) to treat moderate to severe pain.', 3.00, 2.60, 1.50, 2000, 'ml', 4);

DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory(
	batch_id INT AUTO_INCREMENT,
    drug_id INT NOT NULL,    
    quantity INT NOT NULL,
    exp_date DATE NOT NULL,
    PRIMARY KEY (batch_id),
    FOREIGN KEY (drug_id)
		REFERENCES drugs(id)
        ON UPDATE CASCADE
);

INSERT INTO inventory (drug_id, quantity, exp_date) VALUES
	(1, 1000, '2020-09-20'),
    (2, 2000, '2021-10-30'),
    (3, 2000, '2019-06-28'),
    (4, 3000, '2022-01-20'),
    (5, 5000, '2023-04-09'),
    (6, 1300, '2019-05-10'),
    (7, 400, '2019-04-29'),
    (8, 1080, '2020-03-16'),
    (9, 1976, '2021-02-13'),
    (10, 3732,'2023-12-15'),
    (11, 1204, '2020-12-31'),
    (12, 701, '2024-01-20'),
    (1, 2000, '2021-02-21'),
    (7, 6000, '2022-07-02'),
    (12, 1000, '2023-03-31'),
    (2, 500, '2019-03-31'),
    (11, 25, '202-03-31');

DROP TABLE IF EXISTS prescriptions;
CREATE TABLE prescriptions(
	id INT AUTO_INCREMENT,
    patient_id INT NOT NULL,
    drug_id INT NOT NULL,
    quantity INT NOT NULL,
    fill_date DATE,
    create_date DATE,
    doctor_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(patient_id)
		REFERENCES user(id)
        ON UPDATE CASCADE,
	FOREIGN KEY(doctor_id)
		REFERENCES user(id)
        ON UPDATE CASCADE,
	FOREIGN KEY(drug_id)
		REFERENCES drugs(id)
        ON UPDATE CASCADE
);

INSERT INTO prescriptions (patient_id, drug_id, quantity, fill_date, create_date, doctor_id) VALUES
	(6, 3, 100, '2019-01-20', '2018-10-23', 3),
    (7, 10, 120, null, '2020-03-31', 4),
    (8, 6, 50, '2020-03-21', '2020-03-20', 3),
    (6, 4, 150, null, '2020-04-10', 4),
    (7, 5, 90, '2020-04-10', '2020-01-31', 4),
    (8, 8, 120, '2020-04-21', '2020-01-31', 4),
    (6, 12, 50, '2020-03-25', '2020-01-31', 3),
    (8, 9, 160, '2020-02-26', '2020-01-31', 3);

DROP TABLE IF EXISTS inventory_orders;
CREATE TABLE inventory_orders(
	id INT AUTO_INCREMENT,
    drug_id INT NOT NULL,
    order_date DATE,
    fulfill_date DATE,
    quantity INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(drug_id)
		REFERENCES drugs(id)
        ON UPDATE CASCADE
);

INSERT INTO inventory_orders (drug_id, order_date, fulfill_date, quantity) VALUES
	(1, '2018-11-30', '2018-12-21', 3000),
    (2, '2019-03-01', '2019-03-03', 4000),
    (3, '2018-02-28', '2018-03-28', 3000),
    (4, '2020-03-20', '2020-04-02', 3500),
    (5, '2020-04-09', '2020-04-15', 5000),
    (6, '2017-10-10', '2017-10-24', 3000),
    (7, '2018-01-15',  '2018-02-01', 6000),
    (8, '2018-11-30', '2018-12-06', 2500),
    (9, '2020-02-13', '2020-02-14', 2000),
    (10, '2020-01-15', '2020-01-20', 6000),
    (11, '2017-11-03', '2017-11-22', 3000),
    (12, '2020-04-10', '2020-04-14', 6000),
    (1, '2019-04-09', '2019-04-11', 2000),
    (7, '2020-03-31', '2020-04-02', 6000),
    (12, '2020-03-27', '2020-03-31', 1000),
    (3, '2020-05-13', null, 3000),
    (10, '2020-04-03', null, 1000),
    (5, '2020-04-27', null, 2000);

DROP TABLE IF EXISTS manufacturer_inventory;
CREATE TABLE manufacturer_inventory(
	batch_id INT AUTO_INCREMENT,
    drug_id INT NOT NULL,    
    quantity INT NOT NULL,
    exp_date DATE NOT NULL,
    expired BOOLEAN,
    ok_to_sell BOOLEAN,
    aquired_from VARCHAR(50),
    PRIMARY KEY (batch_id),
    FOREIGN KEY (drug_id)
		REFERENCES drugs(id)
        ON UPDATE CASCADE
);

INSERT INTO manufacturer_inventory (drug_id, quantity, exp_date, expired, ok_to_sell, aquired_from) VALUES
	(1, 12000, '2020-09-20', false, true, 'China'),
    (2, 10000, '2021-10-30', false, true,'China'),
    (3, 95000, '2019-06-28', true, false, 'Germany'),
    (12, 8000, '2022-01-20', false, true, 'China'),
    (8, 15000, '2023-04-09', false, true, 'Boston'),
    (10, 13000, '2019-05-10', true, false, 'China'),
    (7, 20000, '2019-04-29', true, false, 'Germany'),
    (4, 17080, '2020-03-16', true, false, 'China'),
    (5, 12976, '2021-02-13', false, true, 'China'),
    (6, 13732,'2023-12-15', false, true, 'Minneapolis'),
    (11, 10204, '2020-12-31', false, true, 'China'),
    (9, 11701, '2024-01-20', false, true, 'South Africa');
    