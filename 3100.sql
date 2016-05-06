-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 2016 年 05 月 06 日 03:36
-- 伺服器版本: 10.1.10-MariaDB
-- PHP 版本： 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `3100`
--

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `TID` int(6) NOT NULL,
  `MID` int(6) NOT NULL,
  `comments` text NOT NULL,
  `star` int(11) NOT NULL,
  `time_submit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `comments`
--

INSERT INTO `comments` (`TID`, `MID`, `comments`, `star`, `time_submit`) VALUES
(2, 100000, 'Close to canteens, very convenient.', 4, '2016-04-13 12:36:27'),
(2, 100000, 'Close to canteens, very convenient.', 4, '2016-04-13 12:41:36'),
(3, 100001, 'The floor is very wet and dirty in rainy days', 3, '2016-04-13 12:41:36'),
(10, 100000, 'A bit dark, and hard to find', 3, '2016-04-13 12:41:36'),
(7, 100001, 'Very few toilets nearby. It is good to have this one', 4, '2016-04-13 12:41:36'),
(9, 100001, 'a bit smelly sometimes', 3, '2016-04-13 12:41:36'),
(12, 100002, 'quite spacious', 4, '2016-04-13 12:41:36'),
(2, 100001, 'Very far away!!!!', 2, '2016-04-13 14:48:47');

-- --------------------------------------------------------

--
-- 資料表結構 `members`
--

CREATE TABLE `members` (
  `MID` int(6) NOT NULL,
  `name` varchar(20) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `disable` tinyint(1) NOT NULL,
  `image` varchar(3000) NOT NULL,
  `password` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `members`
--

INSERT INTO `members` (`MID`, `name`, `sex`, `email`, `disable`, `image`, `password`) VALUES
(100000, 'liza', 'F', 'liza@abc.com', 0, 'http://vignette1.wikia.nocookie.net/southparkfanon/images/a/ad/Kyle.png/revision/latest?cb=20110317001632', 'abc'),
(100001, 'kyle', 'M', 'kyle@abc.immd', 0, 'https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif', 'abc'),
(100002, 'jewnid', 'M', 'jewnid', 1, 'http://10-themes.com/data_images/wallpapers/9/319813-day.jpg', 'abc');

-- --------------------------------------------------------

--
-- 資料表結構 `toilets`
--

CREATE TABLE `toilets` (
  `TID` int(6) NOT NULL,
  `location` point NOT NULL,
  `type` varchar(3) NOT NULL,
  `special` text NOT NULL,
  `image` varchar(3000) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `toilets`
--

INSERT INTO `toilets` (`TID`, `location`, `type`, `special`, `image`, `name`) VALUES
(1, '\0\0\0\0\0\0\0y �Hk6@�"h�$�\\@', 'M', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/001.jpg', 'MMW Engineering Buli'),
(2, '\0\0\0\0\0\0\0y �Hk6@�"h�$�\\@', 'F', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/002.jpg', 'MMW buliding'),
(3, '\0\0\0\0\0\0\0��V�ck6@�\\�mO�\\@', 'M', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/003.jpg', 'UC toilet'),
(4, '\0\0\0\0\0\0\0�Za�^k6@�\\�mO�\\@', 'F', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/004.jpg', 'Shaw toilet'),
(5, '\0\0\0\0\0\0\0y���ek6@k�3�\\@', 'M', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/005.jpg', 'SH.HO toilet'),
(6, '\0\0\0\0\0\0\0y���ek6@k�3�\\@', 'F', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/006.jpg', 'CC toilet'),
(7, '\0\0\0\0\0\0\0y���ek6@k�3�\\@', 'M', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/007.jpg', 'Morning side toilet'),
(8, '\0\0\0\0\0\0\0y���ek6@k�3�\\@', 'F', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/008.jpg', 'library'),
(9, '\0\0\0\0\0\0\0�d��j6@w��o�\\@', 'M', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/009.jpg', 'Science center'),
(10, '\0\0\0\0\0\0\0�d��j6@w��o�\\@', 'F', '/', 'http://appsrv.cse.cuhk.edu.hk/~wkchow5/CSCI3100/images/picture/010.jpg', 'Sir Run Run Hall'),
(11, '\0\0\0\0\0\0\0y���ek6@k�3�\\@', 'Dis', '/', 'https://s-media-cache-ak0.pinimg.com/736x/4c/60/a3/4c60a354f4796f0da7b39b55062cbef0.jpg', 'YIA'),
(12, '\0\0\0\0\0\0\0-x�W�j6@�V\n��\\@', 'Dis', '/', 'https://s-media-cache-ak0.pinimg.com/736x/86/ef/cd/86efcd9724cb0b81470121e0a8ae6949.jpg', 'Medicine canteen');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
