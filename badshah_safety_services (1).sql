-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 09, 2021 at 05:44 PM
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
-- Database: `badshah_safety_services`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminlogin`
--

CREATE TABLE `adminlogin` (
  `username` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `adminlogin`
--

INSERT INTO `adminlogin` (`username`, `password`) VALUES
('murtazabadshah', '55010123');

-- --------------------------------------------------------

--
-- Table structure for table `banner_img`
--

CREATE TABLE `banner_img` (
  `id` int(10) NOT NULL,
  `banner_name` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `banner_img`
--

INSERT INTO `banner_img` (`id`, `banner_name`) VALUES
(1, '1.jpg'),
(2, '2.jpg'),
(3, '3.jpg'),
(4, '4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `category_image` varchar(200) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_name`, `category_image`) VALUES
('Gloves', 'Gloves.jpeg'),
('Portable Extinguisher', 'Portable Extinguisher.jpeg'),
('Barricade', 'Barricade.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(10) NOT NULL,
  `uuid_no` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `date_current` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `client` varchar(5000) COLLATE utf8_bin DEFAULT NULL,
  `product_detail` varchar(5000) COLLATE utf8_bin DEFAULT NULL,
  `status` varchar(30) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `uuid_no`, `date_current`, `client`, `product_detail`, `status`) VALUES
(1, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"murt\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(2, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"murtaz\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(3, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"mur\",\"mobile_order\":\"07869786465\",\"email_order\":\"mu@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(4, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"mur\",\"mobile_order\":\"07869786465\",\"email_order\":\"murtaza@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(5, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"mur\",\"mobile_order\":\"07869786465\",\"email_order\":\"s@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(6, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"urt\",\"mobile_order\":\"07869786465\",\"email_order\":\"dd@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(7, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"fwf\",\"mobile_order\":\"07869786465\",\"email_order\":\"g@GMAIL.COM\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(8, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"mu\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(9, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"hh\",\"mobile_order\":\"07869786465\",\"email_order\":\"murtaza@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(10, '9e503137-ab25-4adb-88a4-96bea0a69c1f', '28/09/2020', '[{\"name_order\":\"Myrtaza\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Calvin Klein\",\"product_price\":599,\"product_size\":\"X\"}]', NULL),
(11, '39916de2-351d-43f8-9474-64406d2189a0', '28/09/2020', '[{\"name_order\":\"mur\",\"mobile_order\":\"07869786465\",\"email_order\":\"murtaza@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Airpods 2\",\"product_price\":1249}]', NULL),
(12, '39916de2-351d-43f8-9474-64406d2189a0', '28/09/2020', '[{\"name_order\":\"mur\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Airpods 2\",\"product_price\":1249}]', NULL),
(13, 'bef5b645-63ec-44ea-b277-792bf7ccb450', '28/09/2020', '[{\"name_order\":\"mut\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"ADIDAS RED SHIRT\",\"product_price\":499,\"product_size\":\"X\"}]', NULL),
(14, 'c1bc6e6b-12fb-4143-ad99-47d33a34f819', '28/09/2020', '[{\"name_order\":\"Murtaza\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Adidas Shoe\",\"product_price\":1400,\"product_size\":\"8\"}]', NULL),
(15, '0a2c566e-3371-42de-abaf-06d4129b98de', '28/09/2020', '[{\"name_order\":\"murtaza Badshah\",\"mobile_order\":\"07869786465\",\"email_order\":\"muretaza@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Fossil\'s Watch\",\"product_price\":1050,\"product_size\":\"Fit\"}]', NULL),
(16, 'eef758fb-83b6-4eea-812f-0bcb520237c2', '01/10/2020', '[{\"name_order\":\"taha\",\"mobile_order\":\"07869786465\",\"email_order\":\"d@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"ADDIDAS Store Article DryFit\",\"product_price\":499}]', NULL),
(17, 'aaa3932f-4b54-4c0d-b68c-9bc3f9cc48c3', '01/10/2020', '[{\"name_order\":\"murtaza\",\"mobile_order\":\"07869786465\",\"email_order\":\"m@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"HOOD SWETSHIRT\",\"product_price\":800}]', NULL),
(19, 'c1bc6e6b-12fb-4143-ad99-47d33a34f819', '04/10/2020', '[{\"name_order\":\"huzaifa\",\"mobile_order\":\"07869786465\",\"email_order\":\"murtaza@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Adidas Shoe\",\"product_price\":1400,\"product_size\":\"9\"}]', NULL),
(20, 'd0db5d7e-1c2a-42b8-a664-00bab75e161a', '14/10/2020', '[{\"name_order\":\"Taha Badshah\",\"mobile_order\":\"7415293153\",\"email_order\":\"tahabadshah55@gmail.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"PUMA SHOE\",\"product_price\":900,\"product_size\":\"10\"}]', 'order_confirmed'),
(21, '9fc212fa-cbb3-4ae3-b556-771359a10d28', '24/10/2020', '[{\"name_order\":\"Ajit Kumar\",\"mobile_order\":\"07869786465\",\"email_order\":\"ajit@foxdebug.com\",\"address_order\":\"Mohammedi park colony, jawalinala telipara road\\nI-5\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"ROLEX\",\"product_price\":900,\"product_size\":\"X\"}]', 'order_confirmed'),
(22, '0aaa994b-d089-4c89-adff-3bec29de257d', '23/04/2021', '[{\"name_order\":\"taha badshah\",\"mobile_order\":\"7415293153\",\"email_order\":\"tahabadshah55@gmail.com\",\"address_order\":\"mohammedi\",\"pincode_order\":\"495001\"}]', '[{\"product_name\":\"Fire Bucket\",\"product_price\":150}]', 'order_confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_name` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `product_price` int(10) DEFAULT NULL,
  `product_description` varchar(5000) COLLATE utf8_bin DEFAULT NULL,
  `product_image` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `product_size` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `products_tags` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `category` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `uuid_no` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_name`, `product_price`, `product_description`, `product_image`, `product_size`, `products_tags`, `category`, `uuid_no`) VALUES
('Fire Stop', 5, 'testing', 'ec396acf-0c3b-46f6-8136-8f3aaef9b842.jpeg', '[{\"size\":\"full\"}]', '[{\"tags\":\"fire\"},{\"tags\":\"portable\"}]', 'Portable Extinguisher', 'ec396acf-0c3b-46f6-8136-8f3aaef9b842'),
('Queue Manager', 1500, 'tatesing', '8819f158-cca4-47df-af11-bdf216257a91.jpeg', '[{\"size\":\"1 Meter\"},{\"size\":\"2 Meter\"}]', '[{\"tags\":\"Queue\"},{\"tags\":\"manager\"}]', 'Barricade', '8819f158-cca4-47df-af11-bdf216257a91');

-- --------------------------------------------------------

--
-- Table structure for table `recentProducts`
--

CREATE TABLE `recentProducts` (
  `product_name` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `product_price` int(10) DEFAULT NULL,
  `product_image` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `category` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `uuid_no` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner_img`
--
ALTER TABLE `banner_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner_img`
--
ALTER TABLE `banner_img`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
