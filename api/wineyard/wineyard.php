<?php

define('TEST', "GET /status");
define('WINEYARD_REGISTER', "POST /register");
define('WINEYARD_GETALL', "POST /getall");
define('WINEYARD_PASSWORD', "gtf");




Flight::route(TEST, function(){
    Flight::setCrossDomainHeaders();
    $res = array(
        "ok"   => true,
        "message"=>"Api de wineyard 10 puntos"
        );
    Flight::jsoncallback($res);
});

Flight::route(WINEYARD_GETALL, function(){
    Flight::setCrossDomainHeaders();

    $postData = json_decode(file_get_contents('php://input'),TRUE);
   
    if($postData['pass'] != WINEYARD_PASSWORD){
      Flight::jsoncallback(array(
        "ok"   => false,
        "message"=>"Invalid password",
        "data"=>null,
        "errorcode"=>"INVALID_PASSWORD"
        ));
    }

	  $my_file = "users.json";
    $data = Flight::getJsonAsArray($my_file);
    $res = array(
        "ok"   => true,
        "message"=>"Everithing work just fine.",
        "data"=>$data
        );
    Flight::jsoncallback($res);
});

Flight::route(WINEYARD_REGISTER, function(){
    Flight::setCrossDomainHeaders();
    
    $data = json_decode(file_get_contents('php://input'),TRUE);

//Flight::jsoncallback(array("ok"=>"aver","data"=>$d));


 	

    $my_file = "users.json";
    $collection = Flight::getJsonAsArray($my_file);
    //
    $collection[] = array(
      "name"=> $data['name'],
      "last_name"=> $data['last_name'],
      "email"=> $data['email'],
      "bird_date"=> $data['bird_date'],
      "zone"=> $data['zone']
      );
    file_put_contents($my_file, json_encode($collection));
    //
    $res = array(
        "ok"   => true,
        "message"=>  $data['name'] . " registrado!."
        );
    //
    Flight::jsoncallback($res);
});


Flight::map('getJsonAsArray', function($filename){
  $my_file = $filename;
    $collection = array();
    if (file_exists($my_file)) {
      $collection =  json_decode(file_get_contents($my_file));
  }else{
    $handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
    fclose($handle);
  }
    return $collection;
});




?>