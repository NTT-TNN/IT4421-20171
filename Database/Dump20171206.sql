CREATE DATABASE  IF NOT EXISTS `test_it4421` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `test_it4421`;
-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: test_it4421
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'coffee','cà phê'),(2,'cake','cake'),(3,'other','other');
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
  `EmployeeID` int(11) DEFAULT NULL,
  `OrderDate` date NOT NULL,
  `TableID` int(11) NOT NULL,
  `Total` double DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `fk_order_1_idx` (`EmployeeID`),
  CONSTRAINT `fk_order_1` FOREIGN KEY (`EmployeeID`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (4,26,'2017-11-28',15,380,1),(5,26,'2017-11-28',56,270,0),(6,26,'2017-11-28',52,380,1),(7,26,'2017-12-04',12,238,2),(8,26,'2017-12-04',13,25,1),(9,26,'2017-12-04',15,237,1),(10,26,'2017-12-04',13,25,0),(11,26,'2017-12-04',13,25,1),(12,26,'2017-12-04',15,237,1),(13,26,'2017-12-04',13,208,0),(14,26,'2017-12-04',13,208,0),(53,26,'2017-12-06',19,239,0),(54,26,'2017-12-06',16,144,2),(55,26,'2017-12-06',15,154,2),(56,26,'2017-12-06',16,70,2),(57,26,'2017-12-06',12,130,0),(58,26,'2017-12-06',11,64,0),(59,26,'2017-12-06',13,70,0),(60,26,'2017-12-06',15,98,2),(61,NULL,'2017-12-06',11,60,0),(62,26,'2017-12-06',16,70,2),(63,26,'2017-12-06',16,102,1),(64,26,'2017-12-06',12,98,2),(65,NULL,'2017-12-06',16,204,1),(66,26,'2017-12-06',13,60,1),(67,26,'2017-12-06',11,70,1),(68,NULL,'2017-12-06',15,210,1),(69,26,'2017-12-06',134,239,2),(70,26,'2017-12-06',22222,260,2);
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
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`OrderDetailID`),
  KEY `fk_orderdetails_1_idx` (`ProductID`),
  KEY `fk_orderdetails_1_idx1` (`OrderID`),
  CONSTRAINT `fk_orderdetails_1` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderdetails_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,4,1,4),(2,4,2,4),(3,4,3,3),(4,5,2,3),(5,5,3,3),(6,5,4,3),(7,6,1,4),(8,6,4,4),(9,6,3,4),(10,7,1,2),(11,7,2,3),(12,7,3,2),(13,8,16,1),(14,9,5,3),(15,9,16,3),(16,9,1,3),(17,10,16,1),(18,11,16,1),(19,12,5,3),(20,12,16,3),(21,12,1,3),(22,13,1,2),(23,13,2,2),(24,13,3,2),(25,14,1,2),(26,14,2,2),(27,14,3,2),(90,53,20,1),(91,53,19,2),(92,53,4,1),(93,53,27,1),(94,53,18,1),(95,53,17,1),(96,53,6,1),(97,54,1,1),(98,54,2,1),(99,54,3,2),(100,55,1,1),(101,55,2,1),(102,55,19,1),(103,55,20,1),(104,56,2,1),(105,56,3,1),(106,57,2,1),(107,57,3,1),(108,57,20,1),(109,58,1,1),(110,58,2,1),(111,59,3,1),(112,59,2,1),(113,60,1,2),(114,60,2,1),(115,61,2,2),(116,62,2,1),(117,62,3,1),(118,63,1,3),(119,64,1,2),(120,64,2,1),(121,65,2,3),(122,65,3,2),(123,65,1,1),(124,66,2,2),(125,67,2,1),(126,67,3,1),(127,68,2,3),(128,68,3,3),(129,69,1,1),(130,69,2,1),(131,69,6,1),(132,69,17,2),(133,69,18,1),(134,69,21,1),(135,69,15,1),(136,70,19,1),(137,70,20,1),(138,70,28,2),(139,70,27,2),(140,70,3,1);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Cappuccino',34,'images/capuchino.jpg','Espresso, sữa tươi, bọt sữa',1),(2,'Espresso',30,'images/editProductImage-1511947960624','Espresso sữa, Espresso sữa nóng',1),(3,'Matcha',40,'images/editProductImage-1511948013218','Đây là description',1),(4,'Cà phê đen',24,'images/suada.jpg','Đây là miêu tả cho cà phê đen',1),(5,'Birthday Cake ',20,'images/editProductImage-1511947754961','Banh sinh nhat',2),(6,'Sua tuoi',10,'images/editProductImage-1511947667957','Vinamilk',3),(7,'Tra Dao',10,'images/editProductImage-1511947710656','Tra',3),(15,'Sinh tố xoài',30,'images/productImage-1511947808977','Ngon',3),(16,'Flann Cake',25,'images/productImage-1511948105080','Bánh',2),(17,'Sinh tố dâu',45,'images/productImage-1511948143309','Làm từ dâu',3),(18,'Chanh tươi',10,'images/productImage-1511948195028','Chanh rất tươi',3),(19,'Cafe nâu',30,'images/editProductImage-1511948339623','Màu nâu',1),(20,'Matcha latte',60,'images/productImage-1511948478136','America',1),(21,'Smoothie việt quất ',35,'images/productImage-1511948589850','Ngon',3),(22,'Cafe cốt dừa',40,'images/productImage-1511948698198','Dừa',1),(23,'Sandwich',60,'images/productImage-1511948824850','Bánh',2),(24,'Crepe',42,'images/productImage-1511948952820','Franch',2),(25,'Tiramisu',15,'images/productImage-1511949034440','Cake',2),(26,'Mochi',14,'images/productImage-1511949129461','Japan',2),(27,'Americano',30,'images/productImage-1511949398335','Espresso, nước nóng',1),(28,'Caramel macchiato',35,'images/productImage-1511949634254','Espresso, sữa tươi, caramel',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id_schedule` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) DEFAULT NULL,
  `worked_day` date DEFAULT NULL,
  PRIMARY KEY (`id_schedule`),
  KEY `fk_schedule_1_idx` (`iduser`),
  CONSTRAINT `fk_schedule_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,'2017-11-09'),(2,1,'2017-11-10'),(3,1,'2017-11-11'),(4,1,'2017-11-12'),(5,2,'2017-11-13'),(6,2,'2017-11-14'),(7,2,'2017-11-15'),(8,4,'2017-11-16'),(9,4,'2017-11-17'),(10,16,'2017-11-13'),(11,16,'2017-11-15'),(12,16,'2017-11-18'),(13,16,'2017-11-19'),(14,1,'2017-11-04'),(15,1,'2017-11-07'),(16,1,'2017-11-08'),(17,1,'2017-11-09'),(18,1,'2017-11-13'),(19,1,'2017-11-26'),(20,1,'2017-11-27'),(21,2,'2017-11-12'),(22,2,'2017-11-23'),(23,2,'2017-11-24'),(24,2,'2017-11-27'),(25,4,'2017-11-10'),(26,4,'2017-11-11'),(27,4,'2017-11-15'),(28,4,'2017-11-20'),(29,4,'2017-11-23'),(30,16,'2017-11-06'),(31,16,'2017-11-14'),(32,16,'2017-11-19'),(33,16,'2017-11-20'),(34,1,'2017-11-05'),(35,1,'2017-11-07'),(36,1,'2017-11-08'),(37,1,'2017-11-09'),(38,1,'2017-11-10'),(274,1,'2017-12-05'),(275,1,'2017-12-08'),(276,1,'2017-12-11'),(277,1,'2017-12-22'),(278,2,'2017-12-10'),(279,2,'2017-12-13'),(280,2,'2017-12-19'),(281,2,'2017-12-25'),(282,4,'2017-12-01'),(283,4,'2017-12-16'),(284,4,'2017-12-24'),(285,18,'2017-12-05'),(286,18,'2017-12-13'),(287,19,'2017-12-08'),(288,19,'2017-12-16'),(289,19,'2017-12-18'),(290,1,'2017-01-03'),(291,1,'2017-01-06'),(292,1,'2017-01-07'),(293,1,'2017-01-10'),(294,1,'2017-01-14'),(295,2,'2017-01-02'),(296,2,'2017-01-04'),(297,2,'2017-01-05'),(298,2,'2017-01-07'),(299,2,'2017-01-08'),(300,2,'2017-01-09'),(301,2,'2017-01-10'),(302,2,'2017-01-13'),(303,2,'2017-01-15'),(304,2,'2017-01-31'),(305,16,'2017-01-01'),(306,16,'2017-01-02'),(307,16,'2017-01-05'),(308,16,'2017-01-06'),(309,16,'2017-01-10'),(310,16,'2017-01-11'),(311,16,'2017-01-12'),(312,16,'2017-01-14'),(313,16,'2017-01-15'),(314,16,'2017-01-25'),(315,16,'2017-01-31'),(316,23,'2017-01-02'),(317,23,'2017-01-03'),(318,23,'2017-01-04'),(319,23,'2017-01-07'),(320,23,'2017-01-08'),(321,23,'2017-01-09'),(322,23,'2017-01-12'),(323,23,'2017-01-14'),(324,23,'2017-01-15'),(325,23,'2017-01-27'),(326,25,'2017-01-03'),(327,25,'2017-01-05'),(328,25,'2017-01-06'),(329,25,'2017-01-08'),(330,25,'2017-01-11'),(331,25,'2017-01-13'),(332,25,'2017-01-15'),(333,25,'2017-01-22'),(334,26,'2017-01-01'),(335,26,'2017-01-02'),(336,26,'2017-01-04'),(337,26,'2017-01-07'),(338,26,'2017-01-09'),(339,26,'2017-01-10'),(340,26,'2017-01-13'),(341,26,'2017-01-14'),(342,26,'2017-01-19'),(343,26,'2017-01-22'),(344,27,'2017-01-01'),(345,27,'2017-01-03'),(346,27,'2017-01-04'),(347,27,'2017-01-06'),(348,27,'2017-01-07'),(349,27,'2017-01-08'),(350,27,'2017-01-12'),(351,27,'2017-01-14'),(352,27,'2017-01-15'),(353,28,'2017-01-01'),(354,28,'2017-01-04'),(355,28,'2017-01-05'),(356,28,'2017-01-10'),(357,28,'2017-01-11'),(358,28,'2017-01-12'),(359,28,'2017-01-13'),(360,28,'2017-01-16');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timekeeping`
--

DROP TABLE IF EXISTS `timekeeping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timekeeping` (
  `idtk` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) DEFAULT NULL,
  `worked_day` date DEFAULT NULL,
  PRIMARY KEY (`idtk`),
  KEY `fk_timekeeping_1_idx` (`iduser`),
  CONSTRAINT `fk_timekeeping_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timekeeping`
--

LOCK TABLES `timekeeping` WRITE;
/*!40000 ALTER TABLE `timekeeping` DISABLE KEYS */;
INSERT INTO `timekeeping` VALUES (1,1,'2016-10-10'),(73,4,'2017-11-16'),(109,2,'2016-12-30'),(110,1,'2017-11-28'),(112,2,'2017-11-28'),(113,2,'2017-11-29'),(114,4,'2017-11-28'),(115,16,'2017-11-29'),(117,1,'2017-11-30'),(118,4,'2017-11-30'),(119,18,'2017-11-30'),(120,19,'2017-11-30'),(162,2,'2017-12-03'),(163,2,'2017-12-05'),(164,2,'2017-12-08'),(165,2,'2017-12-09'),(166,2,'2017-12-10'),(167,2,'2017-12-11'),(168,2,'2017-12-21'),(169,16,'2017-12-02'),(170,16,'2017-12-24'),(171,23,'2017-12-02'),(172,23,'2017-12-05'),(173,23,'2017-12-15'),(174,23,'2017-12-16'),(175,23,'2017-12-22'),(176,23,'2017-12-23'),(177,23,'2017-12-24'),(178,23,'2017-12-25'),(179,23,'2017-12-26'),(180,25,'2017-12-09'),(181,26,'2017-12-02'),(182,26,'2017-12-11'),(183,27,'2017-12-02'),(184,27,'2017-12-09'),(185,28,'2017-12-02');
/*!40000 ALTER TABLE `timekeeping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `urlavatar` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `isActive` int(11) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'trandem','1996-12-02','1','012345612','trandem@gmail.com','male','images/avatar-1511454463618','manager','QN','2017-11-20',NULL,1),(2,'thao nt','1989-02-03','c4ca4238a0b923820dcc509a6f75849b','0123456872323','123456@gmai.com','male','images/avatar-1510997165958','accountant','HN','2017-11-20',NULL,1),(4,'cuong','2017-11-16','1','125125125','cuong@gmail.com','male','images/avatar-1510997165958','manager','T2352','2017-11-20',NULL,0),(16,'tuan anh nguyen','1996-08-17','c4ca4238a0b923820dcc509a6f75849b','0165423489','tuananh@gmail.com','male','images/avatar-1510997165958','order','HD','2017-11-20','2017-11-28',1),(17,'thao','1996-03-03','1','262','123456@gmai.com','female','images/avatar-1510997165958','order','HP','2017-11-28','2017-12-01',0),(18,'demytra','2017-11-16','1','125125125','trandem1@gmail.com','male','images/avatar-1510997165958','manager','T2352','2017-11-28',NULL,0),(19,'thao','1996-03-03','1','88882211','123456@gmai.com','female','images/avatar-1510997165958','order','QN','2017-11-29','2017-12-01',0),(20,'Tuan anh','1996-12-05','1','01233654','tuananh@gmail.com','male','images/avatar-1510997165958','manager','HD','2017-12-01','2017-12-01',0),(21,'a','1996-01-01','1','0123','123@gmail.com','male','images/avatar-1510997165958','order','HN','2017-12-01','2017-12-01',0),(22,'b','1996-12-02','1','123','123456@gmail.com','female','images/avatar-1510997165958','manager','4','2017-12-01','2017-12-01',0),(23,'cuong','1996-12-24','c4ca4238a0b923820dcc509a6f75849b','03126466','cuong@gmaill.com','male','images/avatar-1510997165958','order','VP','2017-12-01',NULL,1),(24,'cuong','1996-12-08','1','0123','cuong@gmail.com','female','images/avatar-1510997165958','accountant','VP','2017-12-01','2017-12-01',0),(25,'hai ha','1996-12-12','c20ad4d76fe97759aa27a0c99bff6710','0123456798','ha@gmail.com','female','images/avatar-1510997165958','accountant','HN','2017-12-01',NULL,1),(26,'nam','2017-12-20','c4ca4238a0b923820dcc509a6f75849b','123456','1@gmail.com','female','images/avatar-1510997165958','accountant','HN','2017-12-01',NULL,1),(27,'Linh','2017-12-13','c81e728d9d4c2f636f067f89cc14862c','123463333333','1569885@gmail.com','female','images/avatar-1510997165958','order','HN','2017-12-01',NULL,1),(28,'minh','2017-12-05','c4ca4238a0b923820dcc509a6f75849b','123456111111','123@gmail.com','female','images/avatar-1510997165958','order','HN','2017-12-01',NULL,1),(29,'nam','1998-12-06','123','907410925701','trandemaafa@gmail.com','male','images/avatar-1510997165958','accountant','Hà Nội','2017-12-02','2017-12-02',0),(30,'test','1998-12-12','c4ca4238a0b923820dcc509a6f75849b','12957105','test@gmail.com','male','images/avatar-1510997165958','manager','QN','2017-12-02',NULL,1);
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

-- Dump completed on 2017-12-06 14:22:23
