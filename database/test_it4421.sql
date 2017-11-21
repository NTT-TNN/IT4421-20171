-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test_it4421
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(45) DEFAULT NULL,
  `Description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'1','1'),(2,'2','2');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeID` varchar(45) DEFAULT NULL,
  `OrderDate` date NOT NULL,
  `CustomerID` varchar(45) DEFAULT NULL,
  `TableID` varchar(45) NOT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'1','2017-11-09','1','2'),(10,'1','2017-11-09','1','2'),(11,'1','2017-11-09','1','2'),(12,'1','2017-11-09','1','2'),(13,'1','2017-11-09','1','2'),(14,'1','2017-11-09','1','2'),(15,'1','2017-11-09','1','2'),(16,'1','2017-11-09','1','2'),(17,'1','2017-11-09','1','2'),(18,'1','2017-11-09','1','2'),(19,'1','2017-11-09','1','2'),(20,'1','2017-11-09','1','3'),(21,'1','2017-11-09','1','3'),(22,'1','2017-11-09','1','3'),(23,'1','2017-11-09','1','3'),(24,'1','2017-11-09','1','3'),(25,'1','2017-11-10','1','12'),(26,'1','2017-11-10','1','12'),(27,'1','2017-11-10','1','12'),(28,'1','2017-11-10','1','12'),(29,'1','2017-11-10','1','12'),(30,'1','2017-11-10','1','12'),(31,'1','2017-11-10','1','12'),(32,'1','2017-11-10','1','12'),(33,'1','2017-11-10','1','12'),(34,'1','2017-11-10','1','12'),(35,'1','2017-11-10','1','12'),(36,'1','2017-11-10','1','12'),(37,'1','2017-11-10','1','12'),(38,'1','2017-11-10','1','1'),(39,'1','2017-11-10','1','1'),(40,'1','2017-11-10','1','1'),(41,'1','2017-11-10','1','1'),(42,'1','2017-11-10','1','1'),(43,'1','2017-11-10','1','1'),(44,'1','2017-11-10','1','1'),(45,'1','2017-11-10','1','1'),(46,'1','2017-11-10','1','1'),(47,'1','2017-11-10','1','1'),(48,'1','2017-11-10','1','1'),(49,'1','2017-11-10','1','1');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails` (
  `OrderDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductID` varchar(45) DEFAULT NULL,
  `Quantity` varchar(45) DEFAULT NULL,
  `Order_OrderID` int(11) NOT NULL,
  PRIMARY KEY (`OrderDetailID`),
  KEY `fk_OrderDetails_Order1_idx` (`Order_OrderID`),
  CONSTRAINT `fk_OrderDetails_Order1` FOREIGN KEY (`Order_OrderID`) REFERENCES `order` (`OrderID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (34,'1','3',1),(35,'2','2',1),(36,'1','3',1),(37,'2','2',1),(38,'1','3',1),(39,'2','2',1),(40,'1','3',1),(41,'2','2',1),(42,'1','3',1),(43,'2','2',1),(44,'1','3',1),(45,'2','2',1),(46,'1','3',18),(47,'2','2',18),(48,'1','3',19),(49,'2','3',19),(50,'3','2',19),(51,'4','4',19),(52,'1','3',20),(53,'2','3',20),(54,'3','2',20),(55,'4','4',20),(56,'1','3',21),(57,'2','3',21),(58,'3','2',21),(59,'4','4',21),(60,'1','3',22),(61,'2','3',22),(62,'3','2',22),(63,'4','4',22),(64,'1','3',23),(65,'2','3',23),(66,'3','2',23),(67,'4','4',23),(68,'1','2',24),(69,'1','2',25),(70,'1','2',26),(71,'1','2',26),(72,'1','2',28),(73,'1','2',29),(74,'2','1',29),(75,'1','2',30),(76,'2','1',30),(77,'1','2',31),(78,'2','1',31),(79,'1','2',31),(80,'2','1',31),(81,'1','2',33),(82,'2','1',33),(83,'1','2',34),(84,'2','1',34),(85,'1','2',35),(86,'2','1',35),(87,'1','2',36),(88,'2','1',36),(89,'2','1',37),(90,'2','1',38),(91,'2','1',39),(92,'2','1',40),(93,'2','1',40),(94,'2','1',40),(95,'2','1',43),(96,'2','1',44),(97,'2','1',45),(98,'2','1',46),(99,'2','1',47),(100,'1','2',48),(101,'2','2',48);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails_has_products`
--

DROP TABLE IF EXISTS `orderdetails_has_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails_has_products` (
  `OrderDetails_OrderDetailID` int(11) NOT NULL,
  `Products_ProductID` int(11) NOT NULL,
  PRIMARY KEY (`OrderDetails_OrderDetailID`,`Products_ProductID`),
  KEY `fk_OrderDetails_has_Products_Products1_idx` (`Products_ProductID`),
  KEY `fk_OrderDetails_has_Products_OrderDetails1_idx` (`OrderDetails_OrderDetailID`),
  CONSTRAINT `fk_OrderDetails_has_Products_OrderDetails1` FOREIGN KEY (`OrderDetails_OrderDetailID`) REFERENCES `orderdetails` (`OrderDetailID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrderDetails_has_Products_Products1` FOREIGN KEY (`Products_ProductID`) REFERENCES `products` (`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails_has_products`
--

LOCK TABLES `orderdetails_has_products` WRITE;
/*!40000 ALTER TABLE `orderdetails_has_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetails_has_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(45) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `Url_images` varchar(200) DEFAULT NULL,
  `descriptions` varchar(45) NOT NULL,
  `Categories_CategoryID` int(11) NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `fk_Products_Categories_idx` (`Categories_CategoryID`),
  CONSTRAINT `fk_Products_Categories` FOREIGN KEY (`Categories_CategoryID`) REFERENCES `categories` (`CategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Capuchino',35,'images/capuchino.jpg','Đây là description cai nafu day vcd thu ffffx',1),(2,'Espresso',30,'images/espresso.jpg','Đây là description',1),(3,'Matcha',40,'images/matcha.jpg','Đây là description',1),(4,'Cà phê đen',20,'images/suada.jpg','Đây là miêu tả cho cà phê đen',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `fullname` varchar(45) DEFAULT NULL,
  `birthday` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `urlavatar` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Dem Tran b','29/10/1996','trandem','abcxyzt','0979651189','tranvandem291096@gmail.com','nam','gqiutb iq','manager','Quang Ninh');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test_it4421'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-21  7:07:12
