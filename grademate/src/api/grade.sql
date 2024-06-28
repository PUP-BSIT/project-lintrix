-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: grade
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `academic_level`
--

DROP TABLE IF EXISTS `academic_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_level` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `academic_level` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_level`
--

LOCK TABLES `academic_level` WRITE;
/*!40000 ALTER TABLE `academic_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `university` varchar(100) DEFAULT NULL,
  `academic_level` bigint DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `academic_level` (`academic_level`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`academic_level`) REFERENCES `academic_level` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Calib',NULL,'Serrano','calib@serrano.net','2001-12-13','male','#\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','PUP',NULL,NULL),(3,'Jane',NULL,'Mingo','ed@serrano.net','2002-04-13',NULL,'123','PUP',NULL,NULL),(4,'Bob',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(5,'Bob','Herr','Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(7,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(8,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(9,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(10,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(11,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(12,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(13,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(14,'John',NULL,'Mingo','ed@serrano.net','2002-04-13','male','123','PUP',NULL,NULL),(20,'Carey',NULL,'Mulligan','carrey@mulligan.com','2000-04-13','female','$2y$10$z/KwTnn04pikxMuNo3SQbeI1RfpWQt9vMqCR9ia6BqHC5oUnjz9pi','PUP',NULL,'careym'),(21,'Oscar',NULL,'Isaac','oscar@isaac.com','2000-12-13','male','$2y$10$hFuOu6psroFjHJ0tx.WSSeMZkFVZNrvxrAZP.rm3YK.NP66I.D6O2','PUP',NULL,'oscari');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(50) DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `quiz_weight` decimal(3,2) DEFAULT NULL,
  `activity_weight` decimal(3,2) DEFAULT NULL,
  `exam_weight` decimal(3,2) DEFAULT NULL,
  `project_weight` decimal(3,2) DEFAULT NULL,
  `quiz_total` decimal(5,2) DEFAULT NULL,
  `activity_total` decimal(5,2) DEFAULT NULL,
  `exam_total` decimal(5,2) DEFAULT NULL,
  `project_total` decimal(5,2) DEFAULT NULL,
  `grand_total` decimal(5,2) DEFAULT NULL,
  `exercise_weight` decimal(3,2) DEFAULT NULL,
  `exercise_total` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_activity`
--

DROP TABLE IF EXISTS `subject_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_activity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint DEFAULT NULL,
  `score` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_activity_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_activity`
--

LOCK TABLES `subject_activity` WRITE;
/*!40000 ALTER TABLE `subject_activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_exam`
--

DROP TABLE IF EXISTS `subject_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_exam` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint DEFAULT NULL,
  `score` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_exam_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_exam`
--

LOCK TABLES `subject_exam` WRITE;
/*!40000 ALTER TABLE `subject_exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_exercise`
--

DROP TABLE IF EXISTS `subject_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_exercise` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint DEFAULT NULL,
  `score` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_exercise_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_exercise`
--

LOCK TABLES `subject_exercise` WRITE;
/*!40000 ALTER TABLE `subject_exercise` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_project`
--

DROP TABLE IF EXISTS `subject_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint DEFAULT NULL,
  `score` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_project_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_project`
--

LOCK TABLES `subject_project` WRITE;
/*!40000 ALTER TABLE `subject_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_quiz`
--

DROP TABLE IF EXISTS `subject_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_quiz` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint DEFAULT NULL,
  `score` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_quiz_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_quiz`
--

LOCK TABLES `subject_quiz` WRITE;
/*!40000 ALTER TABLE `subject_quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` char(60) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token`
--

LOCK TABLES `user_token` WRITE;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
INSERT INTO `user_token` VALUES (1,'e5d331a929925be4bca4ec199237903e5dd05927c6cfd58adf066ff65e51',20),(2,'92a3a2b370d1a9fc77c52ec70bfeb8d78964383b8ed46645d98f6ad7e096',20),(3,'596d21ca29dc679434cf6f4b4894866fbe1453b34d392f6cf5ee8ac978e6',20),(4,'736f000589eb10f96f0f488d0b112ea3be5e7f8175096f35fa944bba0c9b',20),(5,'4e1451d2742d8be1f50698a73e650b64ecbd723d6394b7c4fd80879b8e13',20),(6,'93f8ed420dd692531f9cdf56bd477e28f910112187144159a757f54db1f2',21),(7,'d064588f9ac479e19ac7323d63cfe0cc83d886d8b7fd8269e8a7849301ac',21);
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-24 15:06:05
