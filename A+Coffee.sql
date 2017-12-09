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
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
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
INSERT INTO `products` VALUES (2,'Espresso',30,'images/editProductImage-1511947960624','Espresso sữa, Espresso sữa nóng',1),(3,'Matcha',50,'images/editProductImage-1511948013218','Espresso sữa, matcha, cream',1),(4,'Cà phê đen',24,'images/suada.jpg','Bean coffee ',1),(5,'Birthday Cake ',20,'images/editProductImage-1511947754961','Banh sinh nhat',2),(6,'Sữa tươi',10,'images/editProductImage-1511947667957','Vinamilk',3),(7,'Trà Đào',10,'images/editProductImage-1511947710656','Tra',3),(15,'Sinh tố xoài',30,'images/productImage-1511947808977','Ngon',3),(16,'Flann Cake',25,'images/productImage-1511948105080','Bánh',2),(17,'Sinh tố dâu',45,'images/productImage-1511948143309','Làm từ dâu',3),(18,'Chanh tươi',10,'images/productImage-1511948195028','Chanh rất tươi',3),(19,'Cafe nâu đên',30,'images/editProductImage-1511948339623','Màu nâu',1),(20,'Matcha latte',60,'images/productImage-1511948478136','America',1),(21,'Smoothie việt quất ',35,'images/productImage-1511948589850','Ngon',3),(22,'Cafe cốt dừa',40,'images/productImage-1511948698198','Dừa',1),(23,'Sandwich',60,'images/productImage-1511948824850','Bánh',2),(24,'Crepe',42,'images/productImage-1511948952820','Franch',2),(25,'Tiramisu',15,'images/productImage-1511949034440','Cake',2),(26,'Mochi',14,'images/productImage-1511949129461','Japan',2),(27,'Americano',30,'images/productImage-1511949398335','Espresso, nước nóng',1),(28,'Cappuccino',30,'images/productImage-1512792584189','Cappuccino',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=502 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,'2017-11-09'),(2,1,'2017-11-10'),(3,1,'2017-11-11'),(4,1,'2017-11-12'),(5,2,'2017-11-13'),(6,2,'2017-11-14'),(7,2,'2017-11-15'),(8,4,'2017-11-16'),(9,4,'2017-11-17'),(10,16,'2017-11-13'),(11,16,'2017-11-15'),(12,16,'2017-11-18'),(13,16,'2017-11-19'),(14,1,'2017-11-04'),(15,1,'2017-11-07'),(16,1,'2017-11-08'),(17,1,'2017-11-09'),(18,1,'2017-11-13'),(19,1,'2017-11-26'),(20,1,'2017-11-27'),(21,2,'2017-11-12'),(22,2,'2017-11-23'),(23,2,'2017-11-24'),(24,2,'2017-11-27'),(25,4,'2017-11-10'),(26,4,'2017-11-11'),(27,4,'2017-11-15'),(28,4,'2017-11-20'),(29,4,'2017-11-23'),(30,16,'2017-11-06'),(31,16,'2017-11-14'),(32,16,'2017-11-19'),(33,16,'2017-11-20'),(34,1,'2017-11-05'),(35,1,'2017-11-07'),(36,1,'2017-11-08'),(37,1,'2017-11-09'),(38,1,'2017-11-10'),(274,1,'2017-12-05'),(275,1,'2017-12-08'),(276,1,'2017-12-11'),(277,1,'2017-12-22'),(278,2,'2017-12-10'),(279,2,'2017-12-13'),(280,2,'2017-12-19'),(281,2,'2017-12-25'),(282,4,'2017-12-01'),(283,4,'2017-12-16'),(284,4,'2017-12-24'),(285,18,'2017-12-05'),(286,18,'2017-12-13'),(287,19,'2017-12-08'),(288,19,'2017-12-16'),(289,19,'2017-12-18'),(361,2,'2017-01-02'),(362,2,'2017-01-04'),(363,2,'2017-01-05'),(364,2,'2017-01-07'),(365,2,'2017-01-08'),(366,2,'2017-01-09'),(367,2,'2017-01-10'),(368,2,'2017-01-13'),(369,2,'2017-01-15'),(370,2,'2017-01-19'),(371,2,'2017-01-23'),(372,2,'2017-01-26'),(373,2,'2017-01-29'),(374,2,'2017-01-31'),(375,16,'2017-01-01'),(376,16,'2017-01-02'),(377,16,'2017-01-05'),(378,16,'2017-01-06'),(379,16,'2017-01-10'),(380,16,'2017-01-11'),(381,16,'2017-01-12'),(382,16,'2017-01-14'),(383,16,'2017-01-15'),(384,16,'2017-01-18'),(385,16,'2017-01-22'),(386,16,'2017-01-25'),(387,16,'2017-01-28'),(388,16,'2017-01-31'),(389,39,'2017-01-03'),(390,39,'2017-01-06'),(391,39,'2017-01-08'),(392,39,'2017-01-11'),(393,39,'2017-01-13'),(394,39,'2017-01-14'),(395,39,'2017-01-19'),(396,39,'2017-01-22'),(397,39,'2017-01-23'),(398,39,'2017-01-24'),(399,39,'2017-01-26'),(400,39,'2017-01-29'),(401,39,'2017-01-30'),(402,39,'2017-01-31'),(403,40,'2017-01-02'),(404,40,'2017-01-03'),(405,40,'2017-01-05'),(406,40,'2017-01-09'),(407,40,'2017-01-10'),(408,40,'2017-01-11'),(409,40,'2017-01-15'),(410,40,'2017-01-17'),(411,40,'2017-01-19'),(412,40,'2017-01-20'),(413,40,'2017-01-23'),(414,40,'2017-01-25'),(415,40,'2017-01-26'),(416,40,'2017-01-29'),(417,41,'2017-01-01'),(418,41,'2017-01-04'),(419,41,'2017-01-05'),(420,41,'2017-01-06'),(421,41,'2017-01-07'),(422,41,'2017-01-09'),(423,41,'2017-01-12'),(424,41,'2017-01-14'),(425,41,'2017-01-18'),(426,41,'2017-01-21'),(427,41,'2017-01-22'),(428,41,'2017-01-23'),(429,41,'2017-01-26'),(430,41,'2017-01-27'),(431,41,'2017-01-28'),(432,41,'2017-01-30'),(433,42,'2017-01-01'),(434,42,'2017-01-02'),(435,42,'2017-01-05'),(436,42,'2017-01-07'),(437,42,'2017-01-08'),(438,42,'2017-01-10'),(439,42,'2017-01-14'),(440,42,'2017-01-15'),(441,42,'2017-01-17'),(442,42,'2017-01-18'),(443,42,'2017-01-19'),(444,42,'2017-01-21'),(445,42,'2017-01-24'),(446,42,'2017-01-25'),(447,42,'2017-01-27'),(448,42,'2017-01-29'),(449,42,'2017-01-30'),(450,42,'2017-01-31'),(451,43,'2017-01-02'),(452,43,'2017-01-03'),(453,43,'2017-01-04'),(454,43,'2017-01-07'),(455,43,'2017-01-10'),(456,43,'2017-01-11'),(457,43,'2017-01-12'),(458,43,'2017-01-14'),(459,43,'2017-01-17'),(460,43,'2017-01-18'),(461,43,'2017-01-20'),(462,43,'2017-01-22'),(463,43,'2017-01-24'),(464,43,'2017-01-25'),(465,43,'2017-01-27'),(466,43,'2017-01-28'),(467,43,'2017-01-30'),(468,44,'2017-01-01'),(469,44,'2017-01-03'),(470,44,'2017-01-06'),(471,44,'2017-01-08'),(472,44,'2017-01-09'),(473,44,'2017-01-12'),(474,44,'2017-01-13'),(475,44,'2017-01-16'),(476,44,'2017-01-17'),(477,44,'2017-01-22'),(478,44,'2017-01-25'),(479,44,'2017-01-26'),(480,44,'2017-01-27'),(481,44,'2017-01-28'),(482,44,'2017-01-29'),(483,44,'2017-01-31'),(484,45,'2017-01-02'),(485,45,'2017-01-04'),(486,45,'2017-01-05'),(487,45,'2017-01-06'),(488,45,'2017-01-08'),(489,45,'2017-01-10'),(490,45,'2017-01-11'),(491,45,'2017-01-12'),(492,45,'2017-01-14'),(493,45,'2017-01-17'),(494,45,'2017-01-19'),(495,45,'2017-01-20'),(496,45,'2017-01-23'),(497,45,'2017-01-24'),(498,45,'2017-01-27'),(499,45,'2017-01-28'),(500,45,'2017-01-30'),(501,45,'2017-01-31');
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
) ENGINE=InnoDB AUTO_INCREMENT=778 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timekeeping`
--

LOCK TABLES `timekeeping` WRITE;
/*!40000 ALTER TABLE `timekeeping` DISABLE KEYS */;
INSERT INTO `timekeeping` VALUES (1,1,'2016-10-10'),(73,4,'2017-11-16'),(109,2,'2016-12-30'),(110,1,'2017-11-28'),(112,2,'2017-11-28'),(113,2,'2017-11-29'),(114,4,'2017-11-28'),(115,16,'2017-11-29'),(117,1,'2017-11-30'),(118,4,'2017-11-30'),(119,18,'2017-11-30'),(120,19,'2017-11-30'),(162,2,'2017-12-03'),(163,2,'2017-12-05'),(169,16,'2017-12-02'),(171,23,'2017-12-02'),(172,23,'2017-12-05'),(181,26,'2017-12-02'),(183,27,'2017-12-02'),(185,28,'2017-12-02'),(625,2,'2017-12-08'),(626,2,'2017-12-09'),(627,2,'2017-12-10'),(628,2,'2017-12-11'),(629,2,'2017-12-21'),(630,16,'2017-12-08'),(631,16,'2017-12-09'),(632,16,'2017-12-24'),(633,40,'2017-12-08'),(634,40,'2017-12-14'),(635,41,'2017-12-13'),(636,41,'2017-12-14'),(637,42,'2017-12-09'),(638,42,'2017-12-11'),(639,42,'2017-12-12'),(640,42,'2017-12-14'),(641,43,'2017-12-13'),(642,2,'2017-12-08'),(643,2,'2017-12-09'),(644,2,'2017-12-10'),(645,2,'2017-12-11'),(646,2,'2017-12-21'),(647,16,'2017-12-08'),(648,16,'2017-12-09'),(649,16,'2017-12-24'),(650,40,'2017-12-08'),(651,40,'2017-12-14'),(652,41,'2017-12-13'),(653,41,'2017-12-14'),(654,42,'2017-12-09'),(655,42,'2017-12-11'),(656,42,'2017-12-12'),(657,42,'2017-12-14'),(658,43,'2017-12-13'),(659,2,'2017-12-08'),(660,2,'2017-12-09'),(661,2,'2017-12-10'),(662,2,'2017-12-11'),(663,2,'2017-12-21'),(664,16,'2017-12-08'),(665,16,'2017-12-09'),(666,16,'2017-12-24'),(667,40,'2017-12-08'),(668,40,'2017-12-14'),(669,41,'2017-12-13'),(670,41,'2017-12-14'),(671,42,'2017-12-09'),(672,42,'2017-12-11'),(673,42,'2017-12-12'),(674,42,'2017-12-14'),(675,43,'2017-12-13'),(676,2,'2017-12-08'),(677,2,'2017-12-09'),(678,2,'2017-12-10'),(679,2,'2017-12-11'),(680,2,'2017-12-21'),(681,16,'2017-12-08'),(682,16,'2017-12-09'),(683,16,'2017-12-24'),(684,40,'2017-12-08'),(685,40,'2017-12-14'),(686,41,'2017-12-13'),(687,41,'2017-12-14'),(688,42,'2017-12-09'),(689,42,'2017-12-11'),(690,42,'2017-12-12'),(691,42,'2017-12-14'),(692,43,'2017-12-13'),(693,2,'2017-12-08'),(694,2,'2017-12-09'),(695,2,'2017-12-10'),(696,2,'2017-12-11'),(697,2,'2017-12-21'),(698,16,'2017-12-08'),(699,16,'2017-12-09'),(700,16,'2017-12-24'),(701,40,'2017-12-08'),(702,40,'2017-12-14'),(703,41,'2017-12-13'),(704,41,'2017-12-14'),(705,42,'2017-12-09'),(706,42,'2017-12-11'),(707,42,'2017-12-12'),(708,42,'2017-12-14'),(709,43,'2017-12-13'),(710,2,'2017-12-08'),(711,2,'2017-12-09'),(712,2,'2017-12-10'),(713,2,'2017-12-11'),(714,2,'2017-12-21'),(715,16,'2017-12-08'),(716,16,'2017-12-09'),(717,16,'2017-12-24'),(718,40,'2017-12-08'),(719,40,'2017-12-14'),(720,41,'2017-12-13'),(721,41,'2017-12-14'),(722,42,'2017-12-09'),(723,42,'2017-12-11'),(724,42,'2017-12-12'),(725,42,'2017-12-14'),(726,43,'2017-12-13'),(727,2,'2017-12-08'),(728,2,'2017-12-09'),(729,2,'2017-12-10'),(730,2,'2017-12-11'),(731,2,'2017-12-21'),(732,16,'2017-12-08'),(733,16,'2017-12-09'),(734,16,'2017-12-24'),(735,40,'2017-12-08'),(736,40,'2017-12-14'),(737,41,'2017-12-13'),(738,41,'2017-12-14'),(739,42,'2017-12-09'),(740,42,'2017-12-11'),(741,42,'2017-12-12'),(742,42,'2017-12-14'),(743,43,'2017-12-13'),(744,2,'2017-12-08'),(745,2,'2017-12-09'),(746,2,'2017-12-10'),(747,2,'2017-12-11'),(748,2,'2017-12-21'),(749,16,'2017-12-08'),(750,16,'2017-12-09'),(751,16,'2017-12-24'),(752,40,'2017-12-08'),(753,40,'2017-12-14'),(754,41,'2017-12-13'),(755,41,'2017-12-14'),(756,42,'2017-12-09'),(757,42,'2017-12-11'),(758,42,'2017-12-12'),(759,42,'2017-12-14'),(760,43,'2017-12-13'),(761,2,'2017-12-08'),(762,2,'2017-12-09'),(763,2,'2017-12-10'),(764,2,'2017-12-11'),(765,2,'2017-12-21'),(766,16,'2017-12-08'),(767,16,'2017-12-09'),(768,16,'2017-12-24'),(769,40,'2017-12-08'),(770,40,'2017-12-14'),(771,41,'2017-12-13'),(772,41,'2017-12-14'),(773,42,'2017-12-09'),(774,42,'2017-12-11'),(775,42,'2017-12-12'),(776,42,'2017-12-14'),(777,43,'2017-12-13');
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'trandem','1996-12-02','1','012345612','trandem@gmail.com','male','images/avatar-1511454463618','manager','QN','2017-11-20','2017-12-06',0),(2,'thao nt','1989-03-02','c4ca4238a0b923820dcc509a6f75849b','1236112455563','123456@gmai.com','male','images/avatar-1510997165958','order','HN','2017-11-20',NULL,1),(4,'cuong','2017-11-16','1','125125125','cuong@gmail.com','male','images/avatar-1510997165958','manager','T2352','2017-11-20',NULL,0),(16,'Order','1996-08-17','c4ca4238a0b923820dcc509a6f75849b','0165423','order@gmail.com','male','images/avatar-1512564737297','order','HD','2017-11-20','2017-11-28',1),(17,'thao','1996-03-03','1','262','123456@gmai.com','female','images/avatar-1510997165958','order','HP','2017-11-28','2017-12-01',0),(18,'demytra','2017-11-16','1','125125125','trandem1@gmail.com','male','images/avatar-1510997165958','manager','T2352','2017-11-28',NULL,0),(19,'thao','1996-03-03','1','88882211','123456@gmai.com','female','images/avatar-1510997165958','order','QN','2017-11-29','2017-12-01',0),(20,'Tuan anh','1996-12-05','1','01233654','tuananh@gmail.com','male','images/avatar-1510997165958','manager','HD','2017-12-01','2017-12-01',0),(21,'a','1996-01-01','1','0123','123@gmail.com','male','images/avatar-1510997165958','order','HN','2017-12-01','2017-12-01',0),(22,'b','1996-12-02','1','123','123456@gmail.com','female','images/avatar-1510997165958','manager','4','2017-12-01','2017-12-01',0),(23,'cuong','1996-12-24','c4ca4238a0b923820dcc509a6f75849b','09006666','cuong.vomanh195@gmaill.com','male','images/avatar-1510997165958','order','VP','2017-12-01','2017-12-06',0),(24,'cuong','1996-12-08','1','0123','cuong@gmail.com','female','images/avatar-1510997165958','accountant','VP','2017-12-01','2017-12-01',0),(25,'hai ha','1996-12-12','c20ad4d76fe97759aa27a0c99bff6710','0123456798','ha@gmail.com','female','images/avatar-1510997165958','accountant','HN','2017-12-01','2017-12-06',0),(26,'nam','2017-12-20','c4ca4238a0b923820dcc509a6f75849b','123456123','1@gmail.com','female','images/avatar-1510997165958','accountant','HN','2017-12-01','2017-12-06',0),(27,'Linh','2017-12-13','c81e728d9d4c2f636f067f89cc14862c','123463333333','1569885@gmail.com','female','images/avatar-1510997165958','order','HN','2017-12-01','2017-12-06',0),(28,'minh','2017-12-05','c4ca4238a0b923820dcc509a6f75849b','123456111111','123@gmail.com','female','images/avatar-1510997165958','order','HN','2017-12-01','2017-12-06',0),(29,'nam','1998-12-06','123','907410925701','trandemaafa@gmail.com','male','images/avatar-1510997165958','accountant','Hà Nội','2017-12-02','2017-12-02',0),(30,'Manager','1998-12-12','c4ca4238a0b923820dcc509a6f75849b','129571056888','manager@gmail.com','male','images/avatar-1512565111597','manager','QN','2017-12-02',NULL,1),(31,'Nam','2017-12-14','c4ca4238a0b923820dcc509a6f75849b','1235664','123456@gmail.com','male','images/avatar-1510997165958','order','HN','2017-12-06','2017-12-06',0),(32,'minh','2017-12-15','c4ca4238a0b923820dcc509a6f75849b','1232223456','123@gmail.com','male','images/avatar-1510997165958','order','HN','2017-12-06','2017-12-06',0),(33,'2','2017-12-04','c4ca4238a0b923820dcc509a6f75849b','01232231','ádsa@gmail.com','male','images/avatar-1510997165958','accountant','GN','2017-12-06','2017-12-06',0),(34,'sad','2017-12-06','c4ca4238a0b923820dcc509a6f75849b','0123','00@gmail.com','female','images/avatar-1510997165958','order','24','2017-12-06','2017-12-06',0),(35,'','2017-12-12','2838023a778dfaecdc212708f721b788','41','31','male','images/avatar-1510997165958','accountant','1','2017-12-06','2017-12-06',0),(36,'dem','2017-11-29','c4ca4238a0b923820dcc509a6f75849b','134','trandem@gmail.com','male','images/avatar-1510997165958','accountant','QN','2017-12-06','2017-12-06',0),(37,'dem','2017-12-25','c4ca4238a0b923820dcc509a6f75849b','14141','1234536@gmai.com','male','images/avatar-1510997165958','accountant','den','2017-12-06','2017-12-06',0),(38,'dem','2017-12-05','c4ca4238a0b923820dcc509a6f75849b','123214','qweqwe@gmail.com','male','images/avatar-1510997165958','accountant','1241','2017-12-06','2017-12-06',0),(39,'dem','2017-12-06','c4ca4238a0b923820dcc509a6f75849b','1231','dem@gmail.com','male','images/avatar-1510997165958','accountant','1','2017-12-06',NULL,1),(40,'toan','2017-12-20','c4ca4238a0b923820dcc509a6f75849b','13','email@gmail','male','images/avatar-1510997165958','accountant','13','2017-12-06',NULL,1),(41,'tra','2017-12-27','c4ca4238a0b923820dcc509a6f75849b','123141231','demt@gmail.com','male','images/avatar-1510997165958','accountant','123','2017-12-06',NULL,1),(42,'aaaa','2017-12-06','c4ca4238a0b923820dcc509a6f75849b','012333221','123@gmail.com','male','images/avatar-1510997165958','accountant','HN','2017-12-06',NULL,1),(43,'12','2017-12-12','b0ab42fcb7133122b38521d13da7120b','11223131','12','female','images/avatar-1510997165958','order','HN','2017-12-06',NULL,1),(44,'Other','2017-12-21','c4ca4238a0b923820dcc509a6f75849b','02345622','other@gmail.com','female','images/avatar-1510997165958','other','NA','2017-12-06',NULL,1),(45,'Accountant','2017-12-21','c4ca4238a0b923820dcc509a6f75849b','0945612521','accountant@gmail.com','female','images/avatar-1510997165958','accountant','HN','2017-12-09',NULL,1);
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

-- Dump completed on 2017-12-09 18:08:43
