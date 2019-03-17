import React from 'react';
import {Table, Button, Modal, Form, Row, Col} from 'react-bootstrap';

const Home = ({username, password, email, role, records, insertRecord, approveRecord, adduser}) => {
    
    if(records != undefined) {
        records = JSON.parse(records);
        return (
            <div>
                <h1 className="text-center">Inventory Record</h1>
                <h4 className="text-right">User : {username}</h4>
                <h4 className="text-right">Role : {role}</h4>
                <div className ="text-right m-1">
                    <AddRecord insertRecord={insertRecord} email={email} username={username} password={password}/>
                    {(role == "Store Manager") ?
                        <span className ="text-right m-1">
                        <AddUser adduser = {adduser} email={email} username={username} password={password}/>
                        </span> : <div></div>
                    }
                </div>
                
                

                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product ID</th>
                            <th>MRP</th>
                            <th>Product Name</th>
                            <th>Vendor</th>
                            <th>Batch No</th>
                            <th>Batch Date</th>
                            <th>Stock</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { (() => {
                            var table_data = [];
                            for(var i = 0; i < records.length; i++) {
                                table_data.push(
                                <tr key = {i+1}>
                                    <td>{i+1}</td>
                                    <td>{records[i].product_id}</td>
                                    <td>{records[i].mrp}</td>
                                    <td>{records[i].product_name}</td>
                                    <td>{records[i].vendor}</td>
                                    <td>{records[i].batch_num}</td>
                                    <td>{records[i].batch_date}</td>
                                    <td>{records[i].stock}</td>
                                    <td>{records[i].status == "1" ? "Approved" : (role == "Store Manager") ? <Pending username={username} password={password} email={email} product_id = {records[i].product_id} approveRecord={approveRecord}/> : "pending"}</td>
                                </tr>);
                            }
                            return table_data;
                          })()
                        }
                    </tbody>
                </Table>
            </div>
        );
    } else {
        return (<div></div>)
    }
}


class AddRecord extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        show: false,
        product_id: '',
        mrp : '',
        product_name : '',
        vendor : '',
        batch_num : '',
        batch_date : '',
        stock : ''
      };
    }
  
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
  
    insertDataInTable = () => {
        this.setState({ show: false });
        this.props.insertRecord(this.state.product_id, this.state.mrp, this.state.product_name, this.state.vendor, this.state.batch_num, this.state.batch_date, this.state.stock, this.props.username, this.props.password, this.props.email);
    }

    handleProductId = (event) => {
        this.setState({product_id : event.target.value});
    }

    handleMrp = (event) => {
        this.setState({mrp : event.target.value});
    }

    handleProductName = (event) => {
        this.setState({product_name : event.target.value});
    }

    handleVendor = (event) => {
        this.setState({vendor : event.target.value});
    }

    handleBatchNum = (event) => {
        this.setState({batch_num : event.target.value});
    }

    handleBatchDate = (event) => {
        this.setState({batch_date : event.target.value});
    }

    handleStock = (event) => {
        this.setState({stock : event.target.value});
    }
  
    render() {
      return (
        <>
          <Button variant="success" onClick={this.handleShow}>
            Add Record
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="text-left">
                    <Form.Group as={Row} controlId="product_id">
                        <Form.Label column sm="6"> Product ID </Form.Label>
                        <Col sm="6">
                        <Form.Control type="text" placeholder="Enter Product ID" id="product_id" name="product_id" onChange={this.handleProductId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="MRP">
                        <Form.Label column sm="6">MRP</Form.Label>
                        <Col sm="6">
                        <Form.Control type="number" placeholder="MRP" id="mrp" name="mrp" onChange={this.handleMrp}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="product_name">
                        <Form.Label column sm="6">Product Name</Form.Label>
                        <Col sm="6">
                        <Form.Control type="text" placeholder="Product Name" id="product_name" name="product_name" onChange={this.handleProductName}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="vendor">
                        <Form.Label column sm="6">Vendor</Form.Label>
                        <Col sm="6">
                        <Form.Control type="text" placeholder="Vendor" id="vendor" name="vendor" onChange={this.handleVendor}/>
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as={Row} controlId="batch_num">
                        <Form.Label column sm="6">Batch Number</Form.Label>
                        <Col sm="6">
                        <Form.Control type="text" placeholder="Batch Number" id="batch_num" name="batch_num" onChange={this.handleBatchNum}/>
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as={Row} controlId="batch_date">
                        <Form.Label column sm="6">Batch Date</Form.Label>
                        <Col sm="6">
                        <Form.Control type="date" placeholder="Batch Date" id="batch_date" name="batch_date" onChange={this.handleBatchDate}/>
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as={Row} controlId="stock">
                        <Form.Label column sm="6">Stock</Form.Label>
                        <Col sm="6">
                        <Form.Control  type="number" placeholder="Stock" id="stock" name="stock" onChange={this.handleStock}/>
                        </Col>
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.insertDataInTable}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}

class Pending extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        show    : false
      };
    }
  
    handleClose = () => {
      this.setState({ show: false });
    }
  
    handleShow = () => {
      this.setState({ show: true });
    }

    handleApprove = () => {
        this.props.approveRecord(this.props.username, this.props.password, this.props.email, 1, this.props.product_id);
    }
  
    render() {
      return (
        <>
          <Button variant="warning" onClick={this.handleShow}>
            Pending
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Approve Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to approve this record.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleApprove}>
                Approve
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}

class AddUser extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        show: false,
        new_username: '',
        new_password : '',
        new_email : '',
        new_manager : 0,
        new_assistant : 0,
        new_re_password : ''
      };
    }
  
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
  
    insertUserData = () => {
        if(this.state.new_password !== this.state.new_re_password) {
            alert("password and reentered password not matched");
            return;
        }
        this.setState({ show: false });
        this.props.adduser(this.props.username, this.props.password, this.props.email, this.state.new_username, this.state.new_password, this.state.new_email, this.state.new_manager, this.state.new_assistant);
    }

    handleNewUsername = (event) => {
        this.setState({new_username : event.target.value});
    }

    handleNewPassword = (event) => {
        this.setState({new_password : event.target.value});
    }

    handleNewRePassword = (event) => {
        this.setState({new_re_password : event.target.value});
    }

    handleNewEmail = (event) => {
        this.setState({new_email : event.target.value});
    }

    handleNewManager = () => {
        this.setState({new_manager : this.state.new_manager ? 0 : 1});
    }

    handleNewAssistant = () => {
        this.setState({new_assistant : this.state.new_assistant ? 0 : 1});
    }
  
    render() {
      return (
        <>
          <Button variant="success" onClick={this.handleShow}>
            Add User
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="text-left">
                    <Form.Group as={Row} controlId="new_username">
                        <Form.Label column sm="6">Username</Form.Label>
                        <Col sm="6">
                        <Form.Control type="text" placeholder="Enter Username" id="new_username" name="new_username" onChange={this.handleNewUsername} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="new_email">
                        <Form.Label column sm="6">Email</Form.Label>
                        <Col sm="6">
                        <Form.Control type="email" placeholder="abc@xyz.com" id="new_email" name="new_email" onChange={this.handleNewEmail} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="new_password">
                        <Form.Label column sm="6">Password</Form.Label>
                        <Col sm="6">
                        <Form.Control type="password" id="new_password" name="new_password" onChange={this.handleNewPassword} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="new_re_password">
                        <Form.Label column sm="6">Re-Enter Password</Form.Label>
                        <Col sm="6">
                        <Form.Control type="password" id="new_re_password" name="new_re_password" onChange={this.handleNewRePassword} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="new_manager">
                        <Form.Label column sm="6">Store Manager</Form.Label>
                        <Col sm="6">
                        <Form.Check type="checkbox" id="new_manager" name="new_manager" checked={this.state.new_manager} onChange={this.handleNewManager} required/>
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as={Row} controlId="new_assistant">
                        <Form.Label column sm="6">Store Assistant</Form.Label>
                        <Col sm="6">
                        <Form.Check type="checkbox"  id="new_assistant" name="new_assistant" checked={this.state.new_assistant} onChange={this.handleNewAssistant} required/>
                        </Col>
                        
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.insertUserData}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}

export default Home;