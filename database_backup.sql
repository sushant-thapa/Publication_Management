-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: SeProject
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

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
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author` (
  `author_email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`author_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES ('cmpunk@gmail.com','CM','Punk'),('HoganIsthebest@gmail.com','Hogan','John'),('johncena@gmail.com','Cena','John'),('kennedyMcMahon@gmail.com','Kennedy','McMahon'),('thapa.sushant.ts@gmail.com','Sushant','Thapa');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contribution`
--

DROP TABLE IF EXISTS `contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contribution` (
  `publication_id` int(11) DEFAULT NULL,
  `author_email` varchar(255) DEFAULT NULL,
  KEY `author_email` (`author_email`),
  KEY `publication_id` (`publication_id`),
  CONSTRAINT `contribution_ibfk_1` FOREIGN KEY (`author_email`) REFERENCES `author` (`author_email`),
  CONSTRAINT `contribution_ibfk_2` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contribution`
--

LOCK TABLES `contribution` WRITE;
/*!40000 ALTER TABLE `contribution` DISABLE KEYS */;
INSERT INTO `contribution` VALUES (2,'johncena@gmail.com'),(2,'thapa.sushant.ts@gmail.com'),(3,'johncena@gmail.com'),(3,'thapa.sushant.ts@gmail.com'),(4,'johncena@gmail.com'),(4,'thapa.sushant.ts@gmail.com'),(5,'kennedyMcMahon@gmail.com'),(5,'thapa.sushant.ts@gmail.com'),(6,'HoganIsthebest@gmail.com'),(6,'thapa.sushant.ts@gmail.com');
/*!40000 ALTER TABLE `contribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publication` (
  `publication_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `isbn` int(11) DEFAULT NULL,
  `impact_factor` float DEFAULT NULL,
  `type_of_article` varchar(255) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `name_of_journal` varchar(255) DEFAULT NULL,
  `page_number` varchar(255) DEFAULT NULL,
  `location_of_conference` varchar(255) DEFAULT NULL,
  `article_link` varchar(255) DEFAULT NULL,
  `academic_level` varchar(255) DEFAULT NULL,
  `doi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`publication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
INSERT INTO `publication` VALUES (2,'Mosby@gmail.com','My Time is now','2010-12-12',12232,2,'academic','first','Zerone','12-23','Zimbawe','google.com','Amateur','this_is_doi'),(3,'Mosby@gmail.com','Neon Tomorrow','2010-12-12',12232,2,'academic','first','Zerone','12-23','Zimbawe','google.com','Amateur','this_is_doi'),(4,'Mosby@gmail.com','AI in tv','2010-12-12',12232,2,'research','first','Zerone','12-23','Zimbawe','google.com','Amateur','this_is_doi'),(5,'Mosby@gmail.com','AI in tv','2010-12-12',12232,2,'research','first','Zerone','12-23','Zimbawe','google.com','Amateur','this_is_doi'),(6,'Mosby@gmail.com','New Tester for Sobit','2018-12-12',12232,2,'academic','first','Zerone-Scholar','123','Nambia','google.com','Professional','this_is_doi');
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-09 19:42:52
