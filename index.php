<?php

/**
 * inventory management API
 *
 * Display API documentation
 * @author Shubham Singh <shubhmsing@gmail.com>
 * @version 1.0
 */

include_once "database.php";

$db = new Database();

$connection = $db->connect();
if($connection) {
    echo "done";
} else {
    echo "failed";
}


include($_SERVER['DOCUMENT_ROOT']."/inventory_management/views/instructions.html");