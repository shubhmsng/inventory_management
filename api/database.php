<?php

/**
 * inventory management database connection
 * 
 * Establish database connection and execute queries
 * @author shubham singh<shubhmsing@gmail.com>
 * @version 1.0
 */

class Database {

    private $host = "localhost";
    private $db = "pinkblue_inventory";
    private $username = "root";
    private $password = "root";
    public $conn;

    public function connect() {
        $this->conn = @new mysqli($this->host, $this->username, $this->password, $this->db);
        return $this->conn->connect_error ? false : true;
    }

    public function exec($sql) {
        return $this->conn->query($sql);
    }
}
