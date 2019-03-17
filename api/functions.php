<?php

function login($data, $db_obj) {
    $username   = $data['username'];
    $password   = hash('sha256', $data['password']);
    $output     = array();
    $query      = "SELECT * FROM roles WHERE email IN (SELECT email FROM users WHERE username='$username' AND password='$password')";

    try {
        $result = $db_obj->exec($query);

        if(!$result->num_rows) {
            $output['httpcode'] = "403";
            $output['data']     = "Unauthorized access";
        } else {
            $row = $result->fetch_assoc();
            $output['httpcode'] = "200";
            $output['data']     = "Login Successfull";
            $output['email']    = $row['email'];
            $output['assistant']= $row['assisant'];
            $output['manager']  = $row['manager'];
        }
    } catch(Exception $error) {
        $output['httpcode'] = "500";
        $output['data']     = "internal server error";
    }
    return $output;
}

function getRecords($data, $db_obj) {
    //check authentication with user credentials if failed will stop execution and send unauthorized response
    $login_res = login($data, $db_obj);
    if($login_res['httpcode'] != "200") {
        return $login_res;
    }

    $output = array();
    $query   = "SELECT * FROM inventory_records";

    try {
        $result = $db_obj->exec($query);
        if($result->num_rows > 0) {
            $records    = array();
            while($row = $result->fetch_assoc()) {
                $records[] = $row;
            }
            $records = json_encode($records);
            $output['data'] = $records;
        } else {
            $output['data'] = "";
        }
        $output['httpcode'] = "200";
    } catch(Exception $error) {
        $output['httpcode'] = "500";
        $output['data']     = "internal server error";
    }
    return $output;
}

function insertRecord($data, $db_obj) {
    //check authentication with user credentials if failed will stop execution and send unauthorized response
    $login_res = login($data, $db_obj);
    if($login_res['httpcode'] != "200") {
        return $login_res;
    }
    
    $record         = $data['record'];
    $status         = getRole($data, $db_obj);
    $product_id     = $record['product_id'];
    $mrp            = $record['mrp'];
    $product_name   = $record['product_name'];
    $vendor         = $record['vendor'];
    $batch_num      = $record['batch_num'];
    $batch_date     = $record['batch_date'];
    $stock          = $record['stock'];
    $output         = array();

    if($status >= 0) {
        $query   = "INSERT INTO inventory_records VALUES ('$product_id', '$mrp', '$product_name', '$vendor', '$batch_num', '$batch_date', '$stock', '$status')";

        try {
            $result = $db_obj->exec($query);
            if ($result === TRUE) {
                $output['httpcode'] = '200';
                $output['data'] = "New record created successfully";
            } else {
                $output['httpcode'] = '500';
                $output['data'] = "failed to insert record";
            }
        } catch(Exception $error) {
            $output['httpcode'] = '500';
            $output['data']     = "internal server error";
        }
    } else {
        $output['httpcode'] = '403';
        $output['data'] = 'Access forbidden';
    }

    return $output;
}

function addUser($data, $db_obj) {
    //check authentication with user credentials if failed will stop execution and send unauthorized response
    $login_res = login($data, $db_obj);
    if($login_res['httpcode'] != "200") {
        return $login_res;
    }
    
    $new_user       = $data['new_user'];
    $status         = getRole($data, $db_obj);
    $new_username   = $new_user['new_username'];
    $new_password   = hash('sha256', $new_user['new_password']);
    $new_email      = $new_user['new_email'];
    $is_manager     = $new_user['new_manager'];
    $is_assistant   = $new_user['new_assistant'];

    $output         = array();

    if($status > 0) {
        $query1 = "INSERT INTO users VALUES ('$new_username', '$new_email', '$new_password')";
        $query2 = "INSERT INTO roles VALUES('$new_email', '$is_assistant', '$is_manager')";

        try {
            $result1 = $db_obj->exec($query1);
            $result2 = $db_obj->exec($query2);
            if ($result1 === TRUE && $result2 === TRUE) {
                $output['httpcode'] = '200';
                $output['data'] = "New record created successfully";
            } else {
                $output['httpcode'] = '500';
                $output['data'] = "failed to insert record";
            }
        } catch(Exception $error) {
            $output['httpcode'] = '500';
            $output['data']     = "internal server error";
        }
    } else {
        $output['httpcode'] = '403';
        $output['data'] = 'Access forbidden';
    }

    return $output;
}


function updateRecord($data, $db_obj) {
    $login_res = login($data, $db_obj);
    if($login_res['httpcode'] != "200") {
        return $login_res;
    }
    $user_status    = getRole($data, $db_obj);
    $new_status     = $data['status'];
    $product_id     = $data['product_id'];
    $output         = array();

    if($user_status > 0) {
        $query   = "UPDATE inventory_records SET status = '$new_status' WHERE product_id = '$product_id'";

        try {
            $result = $db_obj->exec($query);
            if ($result === TRUE) {
                $output['httpcode'] = '200';
                $output['data'] = "New record created successfully";
            } else {
                $output['httpcode'] = '500';
                $output['data'] = "failed to update record";
            }
        } catch(Exception $error) {
            $output['httpcode'] = '500';
            $output['data']     = "internal server error";
        }
    } else {
        $output['httpcode'] = '403';
        $output['data'] = 'Access forbidden';
    }

    return $output;
}

function getRole($data, $db_obj) {
    $login_res = login($data, $db_obj);
    if($login_res['httpcode'] != "200") {
        return $login_res;
    }
    $email = $data['email'];
    try {
        $query = "SELECT assisant, manager FROM roles where email='$email'";
        $result = $db_obj->exec($query);
        $row = $result->fetch_assoc();
        if($row['manager'] == '1') {
            return 1;
        } elseif($row['assisant'] == '1') {
            return 0;
        } else {
            return -1;
        }
    } catch (Exception $err) {
        return -1;
    }
}

function sendResponse($res_data) {
    echo json_encode($res_data);
    exit;
}