<?php

class Database {

    private $host = "localhost";
    private $db = "pinkblue_inventory";
    private $username = "admin";
    private $password = "admin";
    public $conn;

    public function connect() {
        
        $this->conn = new mysqli($this->host, $this->username, $this->password);
            
        return $this->conn;
    } 
}
