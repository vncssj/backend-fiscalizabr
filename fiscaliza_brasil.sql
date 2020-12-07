-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.16 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para mysqlfisbrasil
CREATE DATABASE IF NOT EXISTS `mysqlfisbrasil` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mysqlfisbrasil`;


-- Copiando estrutura para tabela mysqlfisbrasil.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela mysqlfisbrasil.usuario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT IGNORE INTO `usuario` (`id`, `cidade`, `estado`, `nome`, `email`, `senha`) VALUES
	(2, 'cidade', 'estado', 'lucas', 'jlucas7@email.com', '1234');


-- Copiando estrutura para tabela mysqlfisbrasil.ocorrencia
CREATE TABLE IF NOT EXISTS `ocorrencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `local` varchar(100) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `data` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_ocorrencia` (`usuario_id`),
  CONSTRAINT `fk_usuario_ocorrencia` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela mysqlfisbrasil.ocorrencia: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `ocorrencia` DISABLE KEYS */;
INSERT IGNORE INTO `ocorrencia` (`id`, `local`, `latitude`, `foto`, `longitude`, `usuario_id`, `descricao`, `data`) VALUES
	(1, 'roma', '10', '', '11', 2, 'bateu', '06/12/2020');
/*!40000 ALTER TABLE `ocorrencia` ENABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
