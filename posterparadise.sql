-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2023 at 04:23 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `posterparadise`
--
CREATE DATABASE IF NOT EXISTS `posterparadise` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `posterparadise`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'danadmin', 'pass1');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `username`, `email`, `address`, `total`) VALUES
(1, 'dan', 'ferdetd@pb.co', 'ldkjslk', '29.98'),
(2, 'dan', 'ferdetd@pb.co', 'ldkjslk', '9.99'),
(3, 'dan', 'ferdettad1@montclair.edu', 'ldkjslk', '9.99'),
(5, 'dan', 'danferd@b.c', 'Knowhere, Space', '99.99'),
(6, 'dan', 'a@b.co', 'ffsdfdsaafsdfdsfsadfsa', '59.97'),
(7, 'moop', 'a@b.co', 'knowhere', '89.96'),
(8, 'Dan Ferdetta', 'ferdettad1@montclair.edu', '1 Normal Avenue, Montclair, NJ, 07043', '35.28'),
(9, 'dan', 'asdf@a.b', '1 Normal Avenue, Montclair, NJ, 07043', '78.06'),
(10, 'dan ferdetta', 'danferdetta@gmail.com', '1 Normal Avenue, Montclair, NJ, 07043', '10.69');

-- --------------------------------------------------------

--
-- Table structure for table `posters`
--

DROP TABLE IF EXISTS `posters`;
CREATE TABLE `posters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posters`
--

INSERT INTO `posters` (`id`, `name`, `genre`, `price`, `image`) VALUES
(1, 'Space Poster 1', 'Science', '9.99', '/IMG_1.jpg'),
(2, 'Space Poster 2', 'Science', '19.99', '/IMG_2.jpg'),
(3, 'Space Poster 3', 'Science', '29.99', '/IMG_3.jpg'),
(8, 'Space Poster 4', 'space', '3.00', '/IMG_7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(2, 'dan', 'password1'),
(6, 'jjthejetplane', 'asdf'),
(10, 'numbaten', '10'),
(11, 'allen', 'asdf'),
(12, 'boop', 'beep'),
(13, 'dani', 'rudyirish'),
(15, 'moop', 'meep'),
(16, 'exampleuser', 'thisisatest'),
(17, 'test', 'test'),
(18, 'exampleuser', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `posters`
--
ALTER TABLE `posters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `posters`
--
ALTER TABLE `posters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
