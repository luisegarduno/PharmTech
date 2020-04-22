-- MySQL dump 10.17  Distrib 10.3.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 10.59.43.164    Database: pharmtech
-- ------------------------------------------------------
-- Server version	10.4.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS pharmtech;
CREATE DATABASE pharmtech; 
USE pharmtech;

--
-- Table structure for table `drug_types`
--

DROP TABLE IF EXISTS `drug_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_types`
--

LOCK TABLES `drug_types` WRITE;
/*!40000 ALTER TABLE `drug_types` DISABLE KEYS */;
INSERT INTO `drug_types` VALUES (1,'antibiotic'),(2,'tranquilizer'),(3,'antipyretics'),(4,'analgesics');
/*!40000 ALTER TABLE `drug_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drugs`
--

DROP TABLE IF EXISTS `drugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `sell_price` float NOT NULL,
  `purchase_price` float NOT NULL,
  `rec_stock_amount` int(11) NOT NULL,
  `unit_measure` varchar(50) NOT NULL,
  `drug_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drug_type` (`drug_type`),
  CONSTRAINT `drugs_ibfk_1` FOREIGN KEY (`drug_type`) REFERENCES `drug_types` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drugs`
--

LOCK TABLES `drugs` WRITE;
/*!40000 ALTER TABLE `drugs` DISABLE KEYS */;
INSERT INTO `drugs` VALUES (1,'Amoxicillin','Penicillin antibiotic that fights bacteria. Used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',2.5,1,5000,'mg',1),(2,'Doxyxycline','Tetracycline antibiotic that fights bacteria in the body. Used to treat many different bacterial infections, such as acne, urinary tract infections, intestinal infections, respiratory infections, eye infections, gonorrhea, chlamydia, syphilis, periodontitis (gum disease), and others.',4,2.5,3000,'mg',1),(3,'Cephalexin','Cephalosporin antibiotic. It works by fighting bacteria in your body. Used to treat infections caused by bacteria, including upper respiratory infections, ear infections, skin infections, urinary tract infections and bone infections.',3.25,1.75,2000,'mg',1),(4,'Diazepam','Benzodiazepine. Affects chemicals in the brain that may be unbalanced in people with anxiety. Used to treat anxiety disorders, alcohol withdrawal symptoms, or muscle spasms.',3,2,4000,'mg',2),(5,'Alprazolam','Benzodiazepine. Affects chemicals in the brain that may be unbalanced in people with anxiety. Used to treat anxiety disorders, alcohol withdrawal symptoms, or muscle spasms.',2.75,1.1,4000,'mg',2),(6,'Clonazepam','Benzodiazepine. Affects chemicals in the brain that may be unbalanced to treat seizures and certain types of anxiety disorders. Type of anti-epileptic drug. Used to treat certain seizure disorders (including absence seizures or Lennox-Gastaut syndrome) in adults and children.',4,2.9,2000,'mg',2),(7,'Aspirin','Salicylate. Reduces substances in the body that cause pain, fever, and inflammation. Used to treat pain, and reduce fever or inflammation. It is sometimes used to treat or prevent heart attacks, strokes, and chest pain (angina).',2,0.9,6000,'mg',3),(8,'Acetaminophen','Pain reliever and a fever reducer. Used to treat mild to moderate and pain, to treat moderate to severe pain in conjunction with opiates, or to reduce fever. ',1.8,0.5,4000,'tablets',3),(9,'Ibuprofen','Nonsteroidal anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body. Used to reduce fever and treat pain or inflammation caused by many conditions such as headache, toothache, back pain, arthritis, menstrual cramps, or minor injury.',1.9,0.8,6000,'mg',3),(10,'Naproxen','Nonsteroidal anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body. Used to treat pain or inflammation caused by conditions such as arthritis, ankylosing spondylitis, tendinitis, bursitis, gout, or menstrual cramps.',1.5,0.5,6000,'ml',4),(11,'Diclofenac','Nonsteroidal anti-inflammatory drug. Reduces substances in the body that cause pain and inflammation. Used to treat mild to moderate pain, or signs and symptoms of osteoarthritis or rheumatoid arthritis. ',2.3,1.4,5000,'mg',4),(12,'Ketorolac','Nonsteroidal anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body. Used short-term (5 days or less) to treat moderate to severe pain.',3,2.6,2000,'ml',4);
/*!40000 ALTER TABLE `drugs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `batch_id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `exp_date` date NOT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drugs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,1000,'2020-09-20'),(2,2,2000,'2021-10-30'),(3,3,2000,'2019-06-28'),(4,4,3000,'2022-01-20'),(5,5,5000,'2023-04-09'),(6,6,1300,'2019-05-10'),(7,7,400,'2019-04-29'),(8,8,1080,'2020-03-16'),(9,9,1976,'2021-02-13'),(10,10,3732,'2023-12-15'),(11,11,1204,'2020-12-31'),(12,12,701,'2024-01-20'),(13,1,2000,'2021-02-21'),(14,7,6000,'2022-07-02'),(15,12,1000,'2023-03-31'),(16,2,500,'2019-03-31'),(17,11,25,'0202-03-31');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_orders`
--

DROP TABLE IF EXISTS `inventory_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) NOT NULL,
  `order_date` date DEFAULT NULL,
  `fulfill_date` date DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `inventory_orders_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drugs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_orders`
--

LOCK TABLES `inventory_orders` WRITE;
/*!40000 ALTER TABLE `inventory_orders` DISABLE KEYS */;
INSERT INTO `inventory_orders` VALUES (1,1,'2018-11-30','2018-12-21',3000),(2,2,'2019-03-01','2019-03-03',4000),(3,3,'2018-02-28','2018-03-28',3000),(4,4,'2020-03-20','2020-04-02',3500),(5,5,'2020-04-09','2020-04-15',5000),(6,6,'2017-10-10','2017-10-24',3000),(7,7,'2018-01-15','2018-02-01',6000),(8,8,'2018-11-30','2018-12-06',2500),(9,9,'2020-02-13','2020-02-14',2000),(10,10,'2020-01-15','2020-01-20',6000),(11,11,'2017-11-03','2017-11-22',3000),(12,12,'2020-04-10','2020-04-14',6000),(13,1,'2019-04-09','2019-04-11',2000),(14,7,'2020-03-31','2020-04-02',6000),(15,12,'2020-03-27','2020-03-31',1000),(16,3,'2020-05-13',NULL,3000),(17,10,'2020-04-03',NULL,1000),(18,5,'2020-04-27',NULL,2000);
/*!40000 ALTER TABLE `inventory_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perscriptions`
--

DROP TABLE IF EXISTS `perscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `fill_date` date DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `doctor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `perscriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `perscriptions_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `perscriptions_ibfk_3` FOREIGN KEY (`drug_id`) REFERENCES `drugs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perscriptions`
--

LOCK TABLES `perscriptions` WRITE;
/*!40000 ALTER TABLE `perscriptions` DISABLE KEYS */;
INSERT INTO `perscriptions` VALUES (1,6,3,100,'2019-01-20','2018-10-23',3),(2,7,10,120,NULL,'2020-03-31',4),(3,8,6,50,'2020-03-21','2020-03-20',3),(4,6,4,150,NULL,'2020-04-10',4),(5,7,1,60,'2020-02-15','2020-01-31',4);
/*!40000 ALTER TABLE `perscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `userType_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userType_id` (`userType_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userType_id`) REFERENCES `user_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Jane','Doe','Password123','jdoe@pharmtech.com',1),(2,'John','Smith','123Password','jadoe@pharmtech.com',2),(3,'Sarah','Jones','_asdf_123','svega@pharmtech.com',3),(4,'Sam','Free','pass_doctor987','sfree@pharmtech.com',3),(5,'Will','Vega','0123&passcode','wvega@pharmtech.com',4),(6,'Emily','Smith',NULL,NULL,5),(7,'Ryan','Jones',NULL,NULL,5),(8,'Leslie','Wan',NULL,NULL,5);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'pharmacist'),(2,'pharmacy manager'),(3,'doctor'),(4,'manufacturer'),(5,'patient');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-22 14:20:59
