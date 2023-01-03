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
  `idCarBrand` int DEFAULT NULL,
  `idPartBrand` int DEFAULT NULL,
  `idPartType` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPartType` (`idPartType`),
  CONSTRAINT `AutoParts_ibfk_1` FOREIGN KEY (`idPartType`) REFERENCES `PartTypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AutoParts`
--

LOCK TABLES `AutoParts` WRITE;
/*!40000 ALTER TABLE `AutoParts` DISABLE KEYS */;
INSERT INTO `AutoParts` VALUES (1,'Polo',NULL,1,0,NULL,'20221228_103634.jpg',5,NULL,1,'2023-01-03 18:53:52','2023-01-03 18:53:52'),(3,'Corsa',NULL,1,0,NULL,'20221228_103914.jpg',6,NULL,1,'2023-01-03 19:12:50','2023-01-03 19:12:50'),(9,'Astra',NULL,3,0,NULL,'20221228_104139.jpg',4,NULL,1,'2023-01-03 19:32:06','2023-01-03 19:32:06'),(10,'Sandero',NULL,1,0,NULL,'20221228_104528.jpg',3,1,1,'2023-01-03 19:36:04','2023-01-03 19:36:04'),(11,'Sandero',NULL,1,0,NULL,'20221229_124626.jpg',3,1,1,'2023-01-03 19:37:24','2023-01-03 19:37:24'),(12,'Sandero',NULL,3,0,NULL,'20221228_123054.jpg',3,1,1,'2023-01-03 19:41:24','2023-01-03 19:41:24');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarBrands`
--

LOCK TABLES `CarBrands` WRITE;
/*!40000 ALTER TABLE `CarBrands` DISABLE KEYS */;
INSERT INTO `CarBrands` VALUES (1,'Nissan','2023-01-03 17:41:10','2023-01-03 17:41:10'),(2,'Fiat','2023-01-03 17:43:05','2023-01-03 17:43:05'),(3,'Peugeot','2023-01-03 17:43:38','2023-01-03 17:43:38'),(4,'Renault','2023-01-03 17:46:23','2023-01-03 17:46:23'),(5,'Volkswagen','2023-01-03 17:46:39','2023-01-03 17:46:39'),(6,'Chevrolet','2023-01-03 17:48:29','2023-01-03 17:48:29'),(7,'Ford','2023-01-03 17:49:15','2023-01-03 17:49:15'),(8,'Toyota','2023-01-03 17:49:41','2023-01-03 17:49:41'),(9,'Citroen','2023-01-03 17:49:54','2023-01-03 17:49:54'),(10,'Mercedes Benz','2023-01-03 17:51:01','2023-01-03 17:51:01'),(11,'Audi','2023-01-03 17:51:28','2023-01-03 17:51:28'),(12,'Honda','2023-01-03 17:51:54','2023-01-03 17:51:54'),(13,'Mini Cooper','2023-01-03 17:52:22','2023-01-03 17:52:22'),(14,'Jeep','2023-01-03 17:52:45','2023-01-03 17:52:45'),(15,'Chrysler','2023-01-03 17:54:10','2023-01-03 17:54:10');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartBrands`
--

LOCK TABLES `PartBrands` WRITE;
/*!40000 ALTER TABLE `PartBrands` DISABLE KEYS */;
INSERT INTO `PartBrands` VALUES (1,'Magneti Marelli','2023-01-03 18:13:42','2023-01-03 18:13:42'),(2,'FAMAR','2023-01-03 18:14:20','2023-01-03 18:14:20'),(3,'Bosch','2023-01-03 18:20:17','2023-01-03 18:20:17'),(4,'Valeo','2023-01-03 18:21:02','2023-01-03 18:21:02'),(5,'Delco','2023-01-03 18:21:11','2023-01-03 18:21:11'),(6,'Hitachi','2023-01-03 18:21:29','2023-01-03 18:21:29'),(7,'Denso','2023-01-03 18:21:42','2023-01-03 18:21:42'),(8,'Continental','2023-01-03 18:22:02','2023-01-03 18:22:02'),(9,'Siemens','2023-01-03 18:22:14','2023-01-03 18:22:14'),(10,'Lucas','2023-01-03 18:22:31','2023-01-03 18:22:31'),(11,'Estrada','2023-01-03 18:44:19','2023-01-03 18:44:19'),(12,'Delco Remy','2023-01-03 18:44:33','2023-01-03 18:44:33'),(13,'Schunk','2023-01-03 18:44:49','2023-01-03 18:44:49'),(14,'Izeta','2023-01-03 18:45:07','2023-01-03 18:45:07'),(15,'Vama','2023-01-03 18:45:38','2023-01-03 18:45:38'),(16,'Tecno+Plus','2023-01-03 18:45:54','2023-01-03 18:45:54'),(17,'LC','2023-01-03 18:48:42','2023-01-03 18:48:42'),(18,'ZM','2023-01-03 18:49:00','2023-01-03 18:49:00'),(19,'Autoliv','2023-01-03 18:49:19','2023-01-03 18:49:19'),(20,'TRW','2023-01-03 18:49:37','2023-01-03 18:49:37'),(21,'Temic','2023-01-03 18:49:57','2023-01-03 18:49:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartTypes`
--

LOCK TABLES `PartTypes` WRITE;
/*!40000 ALTER TABLE `PartTypes` DISABLE KEYS */;
INSERT INTO `PartTypes` VALUES (1,'Tablero','2023-01-03 18:01:07','2023-01-03 18:01:07'),(2,'ECU','2023-01-03 18:01:17','2023-01-03 18:01:17'),(3,'BSI','2023-01-03 18:06:18','2023-01-03 18:06:18'),(4,'BSM','2023-01-03 18:06:32','2023-01-03 18:06:32'),(5,'Placa portacarbones','2023-01-03 18:07:45','2023-01-03 18:07:45'),(6,'Módulo airbag','2023-01-03 18:09:07','2023-01-03 18:09:07'),(7,'Solenoide','2023-01-03 18:10:02','2023-01-03 18:10:02'),(8,'Vendi','2023-01-03 18:10:44','2023-01-03 18:10:44'),(9,'Bomba de nafta','2023-01-03 18:11:45','2023-01-03 18:11:45'),(10,'Bobina de inducido','2023-01-03 18:12:13','2023-01-03 18:12:13');
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

-- Dump completed on 2023-01-03 20:43:16
