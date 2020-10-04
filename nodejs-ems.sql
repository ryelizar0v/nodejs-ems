-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2020 at 03:31 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-ems`
--
CREATE DATABASE IF NOT EXISTS `nodejs-ems` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nodejs-ems`;

-- --------------------------------------------------------

--
-- Stand-in structure for view `account_info`
-- (See below for the actual view)
--
CREATE TABLE `account_info` (
`employee_id` int(11)
,`username` text
,`password` text
,`email_address` text
,`contact_no` varchar(20)
);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `dept_id` int(11) NOT NULL,
  `dept_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `middle_name` text NOT NULL,
  `last_name` text NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL DEFAULT 'Other',
  `date_of_birth` date NOT NULL,
  `home_address` text NOT NULL,
  `email_address` text NOT NULL,
  `contact_no` varchar(20) NOT NULL,
  `job_description` text NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `employment_type` enum('Part time','Full time','Job contract') NOT NULL DEFAULT 'Job contract',
  `username` text NOT NULL,
  `password` text NOT NULL,
  `role_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `employment_info`
-- (See below for the actual view)
--
CREATE TABLE `employment_info` (
`employee_id` int(11)
,`first_name` text
,`middle_name` text
,`last_name` text
,`gender` enum('Male','Female','Other')
,`date_of_birth` date
,`home_address` text
,`email_address` text
,`contact_no` varchar(20)
,`job_description` text
,`dept_id` int(11)
,`dept_name` text
,`role_description` text
,`salary` decimal(10,0)
,`employment_type` enum('Part time','Full time','Job contract')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `personal_info`
-- (See below for the actual view)
--
CREATE TABLE `personal_info` (
`employee_id` int(11)
,`first_name` text
,`middle_name` text
,`last_name` text
,`gender` enum('Male','Female','Other')
,`date_of_birth` date
,`home_address` text
,`contact_no` varchar(20)
,`email_address` text
,`dept_id` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `token_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure for view `account_info`
--
DROP TABLE IF EXISTS `account_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `account_info`  AS  select `employees`.`employee_id` AS `employee_id`,`employees`.`username` AS `username`,`employees`.`password` AS `password`,`employees`.`email_address` AS `email_address`,`employees`.`contact_no` AS `contact_no` from `employees` ;

-- --------------------------------------------------------

--
-- Structure for view `employment_info`
--
DROP TABLE IF EXISTS `employment_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `employment_info`  AS  select `e`.`employee_id` AS `employee_id`,`e`.`first_name` AS `first_name`,`e`.`middle_name` AS `middle_name`,`e`.`last_name` AS `last_name`,`e`.`gender` AS `gender`,`e`.`date_of_birth` AS `date_of_birth`,`e`.`home_address` AS `home_address`,`e`.`email_address` AS `email_address`,`e`.`contact_no` AS `contact_no`,`e`.`job_description` AS `job_description`,`e`.`dept_id` AS `dept_id`,`d`.`dept_name` AS `dept_name`,`r`.`role_description` AS `role_description`,`e`.`salary` AS `salary`,`e`.`employment_type` AS `employment_type` from ((`employees` `e` join `departments` `d` on(`e`.`dept_id` = `d`.`dept_id`)) join `roles` `r` on(`e`.`role_id` = `r`.`role_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `personal_info`
--
DROP TABLE IF EXISTS `personal_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `personal_info`  AS  select `e`.`employee_id` AS `employee_id`,`e`.`first_name` AS `first_name`,`e`.`middle_name` AS `middle_name`,`e`.`last_name` AS `last_name`,`e`.`gender` AS `gender`,`e`.`date_of_birth` AS `date_of_birth`,`e`.`home_address` AS `home_address`,`e`.`contact_no` AS `contact_no`,`e`.`email_address` AS `email_address`,`e`.`dept_id` AS `dept_id` from ((`employees` `e` join `departments` `d` on(`e`.`dept_id` = `d`.`dept_id`)) join `roles` `r` on(`e`.`role_id` = `r`.`role_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH,
  ADD KEY `role_id` (`role_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
