<?php

/**
 * inventory management API
 *
 * @author Shubham Singh <shubhmsing@gmail.com>
 * @version 1.0
 */

include_once 'database.php';
include_once 'functions.php';
include_once 'config.php';


switch ($data['func']) {
    case 'login':
        $response = login($data, $db_obj);
        sendResponse($response);
        break;
    
    case 'getRecords':
        $response = getRecords($data, $db_obj);
        sendResponse($response);
        break;
    
    case 'insertRecord':
        $response = insertRecord($data, $db_obj);
        sendResponse($response);
        break;

    case 'updateRecord' :
        $response = updateRecord($data, $db_obj);
        sendResponse($response);
        break;
    
    case 'addUser' :
        $response = addUser($data, $db_obj);
        sendResponse($response);
        break;

    default:
        $response = array("httpcode" => "200", "data" => "NULL");
        sendResponse($response);
        break;
}

