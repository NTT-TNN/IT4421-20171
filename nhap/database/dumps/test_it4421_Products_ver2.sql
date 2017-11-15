CREATE TABLE `Products` (
  `ProductID` int NOT NULL auto_increment,
  `ProductName` varchar(45) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `Categories_CategoryID` int(11) NOT NULL,
  `Url_images` varchar(100) DEFAULT NULL,
  `Description` varchar(45) DEFAULT "Đây là description!",
  PRIMARY KEY (`ProductID`),
  KEY `fk_Products_Categories` (`Categories_CategoryID`),
  CONSTRAINT `fk_Products_Categories` FOREIGN KEY (`Categories_CategoryID`) REFERENCES `Categories` (`CategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `Products` (ProductName, Price, Categories_CategoryID, Url_images, Description) VALUES ('Capuchino',35,1,'images/capuchino.jpg','Đây là description cai nafu day vcd thu ffffx'),('Espresso',30,1,'images/espresso.jpg','Đây là description'),('Matcha',40,1,'images/matcha.jpg','Đây là description'),('Cà phê đen',20,1,'images/suada.jpg','Đây là miêu tả cho cà phê đen');
