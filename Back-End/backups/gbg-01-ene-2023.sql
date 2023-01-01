-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: gbg
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AutoParts`
--

DROP TABLE IF EXISTS `AutoParts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AutoParts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partModel` varchar(25) DEFAULT NULL,
  `serialNumber` varchar(25) DEFAULT NULL,
  `stock` int NOT NULL,
  `drawer` int NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `idCarBrand` int NOT NULL,
  `idPartBrand` int NOT NULL,
  `idPartType` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCarBrand` (`idCarBrand`),
  KEY `idPartBrand` (`idPartBrand`),
  KEY `idPartType` (`idPartType`),
  CONSTRAINT `AutoParts_ibfk_1` FOREIGN KEY (`idCarBrand`) REFERENCES `CarBrands` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `AutoParts_ibfk_2` FOREIGN KEY (`idPartBrand`) REFERENCES `PartBrands` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `AutoParts_ibfk_3` FOREIGN KEY (`idPartType`) REFERENCES `PartTypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AutoParts`
--

LOCK TABLES `AutoParts` WRITE;
/*!40000 ALTER TABLE `AutoParts` DISABLE KEYS */;
INSERT INTO `AutoParts` VALUES (21,'ME 7.4.9','123',1,1,'asd 123','pexels-maxime-francis-2246476.jpg',1,1,1,'2023-01-01 21:27:49','2023-01-01 21:27:49'),(22,'ME 7.4.9','123',1,1,'asd 123','20221228_111020.jpg',1,1,1,'2023-01-01 21:30:46','2023-01-01 21:30:46'),(23,'ME 7.4.9','123',1,1,'asd 123','test.jpg',1,1,1,'2023-01-01 22:08:40','2023-01-01 22:08:40');
/*!40000 ALTER TABLE `AutoParts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarBrands`
--

DROP TABLE IF EXISTS `CarBrands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarBrands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarBrands`
--

LOCK TABLES `CarBrands` WRITE;
/*!40000 ALTER TABLE `CarBrands` DISABLE KEYS */;
INSERT INTO `CarBrands` VALUES (1,'Volkswagen','2023-01-01 18:55:46','2023-01-01 18:55:46'),(2,'Volkswagen','2023-01-01 22:08:11','2023-01-01 22:08:11'),(3,'Volkswagen','2023-01-01 22:11:43','2023-01-01 22:11:43'),(4,'Volkswagen','2023-01-01 22:11:44','2023-01-01 22:11:44'),(5,'Volkswagen','2023-01-01 22:11:44','2023-01-01 22:11:44'),(6,'Volkswagen','2023-01-01 22:11:45','2023-01-01 22:11:45'),(7,'Volkswagen','2023-01-01 22:11:46','2023-01-01 22:11:46'),(8,'Volkswagen','2023-01-01 22:11:46','2023-01-01 22:11:46'),(9,'Volkswagen','2023-01-01 22:11:47','2023-01-01 22:11:47'),(10,'Volkswagen','2023-01-01 22:11:47','2023-01-01 22:11:47');
/*!40000 ALTER TABLE `CarBrands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PartBrands`
--

DROP TABLE IF EXISTS `PartBrands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PartBrands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartBrands`
--

LOCK TABLES `PartBrands` WRITE;
/*!40000 ALTER TABLE `PartBrands` DISABLE KEYS */;
INSERT INTO `PartBrands` VALUES (1,'Bosch','2023-01-01 18:53:11','2023-01-01 18:53:11'),(2,'Bosch','2023-01-01 22:07:58','2023-01-01 22:07:58');
/*!40000 ALTER TABLE `PartBrands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PartTypes`
--

DROP TABLE IF EXISTS `PartTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PartTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartTypes`
--

LOCK TABLES `PartTypes` WRITE;
/*!40000 ALTER TABLE `PartTypes` DISABLE KEYS */;
INSERT INTO `PartTypes` VALUES (1,'ECU','2023-01-01 18:55:44','2023-01-01 18:55:44'),(2,'ECU','2023-01-01 22:08:05','2023-01-01 22:08:05');
/*!40000 ALTER TABLE `PartTypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-01 19:12:37
