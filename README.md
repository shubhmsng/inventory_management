# inventory_management

database name: pinkblue_inventory
tables:
1. users
2. roles
3. inventory_records

php version : 7.0
nodejs version : 4.2.6
npm version: 6.7.0


# API usages details:

1. <b>login API</b> <br>
  a. url: hostname/inventory_management/api/index.php <br>
  b. method : post <br> 
  c. json data : {username: "", password : "", email : "", func : "login"} <br>


2. <b> getRecords API </b> <br>
  a. url: hostname/inventory_management/api/index.php <br>
  b. method: post <br>
  c. json data:  {username: "", password : "", email : "", func="getRecords"} <br>

3. <b>insertRecord API </b>  <br>
  a. url: hostname/inventory_management/api/index.php <br>
  b. method: post <br>
  c. json data:  {username: "", password : "", email : "", func="insertRecord", record : {table data in json format}} <br>

4. <b>updateRecord API</b> <br>
  a. url: hostname/inventory_management/api/index.php <br>
  b. method: post <br>
  c. json data:  {username: "", password : "", email : "", func="updateRecord", status : "", product_id : ""} <br>
  * note: user's role should be store manager


* Note : change hostname to server's hostname in App.js file.
