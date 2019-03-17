import React, { Component } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

const API = "http://192.168.44.129/inventory_management/api/index.php";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      route     : 'login',
      username  : '',
      password  : '',
      recrods   : '',
      email     : ''
    };
  }

  onLoginClick = () => {

    var post_data = {
      username  : this.state.username, 
      password  : this.state.password,
      func      : 'login',
      role      : ''
    };

    const that = this;

    fetch(API, {
      method: 'post',
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      referrer: "no-referrer",
      body: JSON.stringify(post_data)
    }).then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if(result.httpcode == "200") {
        that.fetchRecord();
        var role = "";
        that.setState({email : result.email});
        if(result.manager == "1") {
          role = "Store Manager";
        } else if(result.assistant = "1") {
          role = "Store Assistant"
        } else {
          role = "N/A";
        }
        that.setState({role : role});
        that.setState({route : "home"});
      } else {
        alert("incorrect login credential");
      }
    });
  }

  fetchRecord = () => {
    var that = this;
    var post_data = {
      username  : this.state.username, 
      password  : this.state.password,
      func      : 'getRecords'
    };

    fetch(API, {
      method: 'post',
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      referrer: "no-referrer",
      body: JSON.stringify(post_data)
    }).then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if(result.httpcode == "200") {
        that.setState({records : result.data});
      } else {
        alert("failed to fetch record");
      }
    });
  }


  insertRecord = (product_id, mrp, product_name, vendor, batch_num, batch_date, stock, username, password, email) => {
    var post_data = {
      record : {
        product_id    : product_id,
        mrp           : mrp,
        product_name  : product_name,
        vendor        : vendor,
        batch_num     : batch_num,
        batch_date    : batch_date,
        stock         : stock
      },
      func          : 'insertRecord',
      username      : username,
      password      : password,
      email         : email
    };
    
    var that = this;

    fetch(API, {
      method: 'post',
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      referrer: "no-referrer",
      body: JSON.stringify(post_data)
    }).then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if(result.httpcode == "200") {
        that.fetchRecord();
      } else {
        alert("failed to insert record");
      }
    });

  }

  approveRecord = (username, password, email, status, product_id) => {
    var post_data = {
      func          : 'updateRecord',
      username      : username,
      password      : password,
      email         : email,
      status        : status,
      product_id    : product_id
    };
    
    var that = this;
    fetch(API, {
      method: 'post',
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      referrer: "no-referrer",
      body: JSON.stringify(post_data)
    }).then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if(result.httpcode == "200") {
        that.fetchRecord();
      } else {
        alert("failed to update record");
      }
    });

  }

  onInputChange = (event) => {
    if(event.target.name == "username") {
      this.setState({username: event.target.value});
    } else {
      this.setState({password: event.target.value});
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.route=="login" ? <Login onInputChange={this.onInputChange} onLoginClick={this.onLoginClick}/> : <Home username = {this.state.username} password = {this.state.password} email = {this.state.email} role = {this.state.role} records = {this.state.records} insertRecord = {this.insertRecord} approveRecord = {this.approveRecord}/>}
      </div>
    );
  }
}

export default App;
