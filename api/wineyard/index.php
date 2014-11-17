<?php
define('ROOT', dirname(dirname(__FILE__)) ); //public/API/
include ROOT . '/config/includes.php'; 		//QJARVIS API
//
//ROUTES
require 'wineyard.php';    
//
Flight::start();
?>
