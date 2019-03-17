<?php

header('Access-Control-Allow-Origin: *');
$method = $_SERVER['REQUEST_METHOD'];
$data   = json_decode(file_get_contents('php://input'), true);

//call database class
$db_obj = new Database();

//establish connection to database
$connection = $db_obj->connect();

//failed to connect database
if(!$connection) {
    //store data in array format that will be sent to user
    $result = array();
    $result['httpcode'] = '503';
    $result['data'] = 'server error';
    sendResponse($result);
}
