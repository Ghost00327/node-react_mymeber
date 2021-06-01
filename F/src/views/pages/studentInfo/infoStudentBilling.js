import React from "react"
import { Button,
       Card,
       CardBody,
       CardHeader,
       CardTitle,
       Modal,
       ModalHeader,
       ModalBody,
       Nav,
       NavItem,
       NavLink,
       TabContent,
       TabPane,
       Container,
       Row,
       Input,
       Col,
      } from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL;
const getUserId = () => {
  return localStorage.getItem("user_id")
}

const columns = [
  {
    name: "Name",
    selector: "first_name",
    sortable: true
  },
  {
    name: "Card Type",
    selector: "first_name",
    sortable: true
  },
  {
    name: "Status",
    selector: "last_name",
    sortable: true
  },
  {
    name: "Time Failed",
    selector: "email",
    sortable: true
  },
  {
    name: "Default",
    selector: "gender",
    sortable: true
  },
  {
    name: "Credit Card",
    selector: "gender",
    sortable: true
  },
  {
    name: "Type",
    selector: "gender",
    sortable: true
  },
  {
    name: "Created Date",
    selector: "gender",
    sortable: true
  },
  {
    name: "Modified Date",
    selector: "gender",
    sortable: true
  }
]

const data = [
  {
    id: 1,
    first_name: "Alyss",
    last_name: "Lillecrop",
    email: "alillecrop0@twitpic.com",
    gender: "Female"
  },
  {
    id: 2,
    first_name: "Shep",
    last_name: "Pentlow",
    email: "spentlow1@home.pl",
    gender: "Male"
  },
  {
    id: 3,
    first_name: "Gasper",
    last_name: "Morley",
    email: "gmorley2@chronoengine.com",
    gender: "Male"
  },
  {
    id: 4,
    first_name: "Phaedra",
    last_name: "Jerrard",
    email: "pjerrard3@blogs.com",
    gender: "Female"
  },
  {
    id: 5,
    first_name: "Conn",
    last_name: "Plose",
    email: "cplose4@geocities.com",
    gender: "Male"
  },
  {
    id: 6,
    first_name: "Tootsie",
    last_name: "Brandsma",
    email: "tbrandsma5@theatlantic.com",
    gender: "Female"
  },
  {
    id: 7,
    first_name: "Sibley",
    last_name: "Bum",
    email: "sbum6@sourceforge.net",
    gender: "Female"
  },
  {
    id: 8,
    first_name: "Kristoffer",
    last_name: "Thew",
    email: "kthew7@amazon.com",
    gender: "Male"
  },
  {
    id: 9,
    first_name: "Fay",
    last_name: "Hasard",
    email: "fhasard8@java.com",
    gender: "Female"
  },
  {
    id: 10,
    first_name: "Tabby",
    last_name: "Abercrombie",
    email: "tabercrombie9@statcounter.com",
    gender: "Female"
  }
]

class DataTableFixedHeader extends React.Component {
  state = {
    modal : false,
    modal_test: false,
    activeTab: "1",
    card_type:"",
    holder_name:"",
    status:"",
    credit_Card_type:"",
    credit_Card_Number:"",
    credit_cvv:"",
    expiry_month:"",
    expiry_year:""
  }

  toggle = tab => {
      this.setState({
          activeTab: tab
      })
  }

  toggleModal = () => {
      // if (this.props.testStudents.length == 0 ){
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
      // } 
    }

  changeHandler = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  addFinance = () => {
    let k = this , list=[];
    console.log('tetetetet', k.state.card_type)
    console.log('fgfgfgfgfg',this.state.card_type)
    list.push({
      card_type:k.state.card_type,
      holder_name:k.state.holder_name,
      status:k.state.holder_name,
      credit_Card_type:k.state.credit_Card_type,
      credit_Card_Number:k.state.credit_Card_Number,
      credit_cvv:k.state.credit_cvv,
      expiry_month:k.state.expiry_month,
      expiry_year:k.state.expiry_year
    })
    console.log("tttttttttttttt!!!!", k.state.card_type )
    axios.post(`${baseUrl}/api/finance_info/create_finance_info/${getUserId()}/${this.props.stdId.studentId}`, list, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        'content-type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      k.setState( prevState => ({
        modal: false,
      }))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Finance</CardTitle>
          <Button.Ripple color="success" onClick={this.toggleModal}> Add New</Button.Ripple>
        </CardHeader>
        <CardBody>
          <DataTable
            data={data}
            columns={columns}
            noHeader
            fixedHeader
            fixedHeaderScrollHeight="300px"
          />
        </CardBody>
        <Modal 
          isOpen={this.state.modal}
          className="modal-dialog-centered modal-mg"
          toggle={this.toggleModal}
        >
            <ModalHeader toggle={this.toggleModal}>
            Add New Finance Info
            </ModalHeader>
                  <ModalBody>
                    <Nav tabs>
                      <NavItem>
                          <NavLink
                              className={classnames({
                                  active: this.state.activeTab === "1"
                              })}
                              onClick={() => {
                                  this.toggle("1")
                              }}
                          >
                              {/* <User size={16} /> */}
                              <span className="align-middle ml-50">Finance Info</span>
                          </NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink
                              className={classnames({
                                  active: this.state.activeTab === "2"
                              })}
                              onClick={() => {
                                  this.toggle("2")
                              }}
                          >
                              <span className="align-middle ml-50">Credit Card Detail</span>
                          </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                      <Container>
                                        <Row>
                                        <Col sm={4}>
                                           <p className="float-left">Type</p>
                                        </Col>
                                        <Col sm={8}>                                        
                                          <Input type="select" className="float-left" name={"card_type"} value={this.state.card_type} onChange={this.changeHandler}>
                                              <option value="credit card">Credit Card</option>
                                              <option value="debit card">Debit card</option>
                                          </Input>
                                        </Col>                                  
                                        </Row>
                                        <Row>
                                        <Col sm={4}>
                                           <p className="float-left">Holder Name</p>
                                        </Col>
                                        <Col sm={8}>                                        
                                          <Input type="text" className="float-left"placeholder="holder_name" name={"holder_name"} value={this.state.holder_name} onChange={this.changeHandler}/>
                                        </Col>  
                                        </Row>
                                        <Row>
                                        <Col sm={4}>
                                           <p className="float-left">Notes</p>
                                        </Col>
                                        <Col sm={8}>                                        
                                          <Input type="textarea" />
                                        </Col>  
                                        </Row>
                                        <Row>
                                        <Col sm={4}>
                                           <p className="float-left">Default</p>
                                        </Col>
                                        <Col sm={8}>                                        
                                          <Input type="checkbox" value="on"/>
                                        </Col>  
                                        </Row>
                                        <Row>
                                          <Col sm={4}>
                                            <p>Time Faild</p>
                                          </Col>
                                          <Col sm={8}>
                                            <p>0</p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm={4}>
                                            <p>Status</p>
                                          </Col>
                                          <Col sm={8}>
                                            <Input type="select" className="float-left" name={"status"} value={this.state.status} onChange={this.changeHandler}>
                                                <option>Active</option>
                                                <option>Unactive</option>
                                            </Input>
                                          </Col>
                                        </Row>
                                        <Button.Ripple color="success" onClick={() => {this.toggle("2")}}>
                                           Next
                                        </Button.Ripple>          
                                      </Container>
                                    </TabPane>
                                    <TabPane tabId="2">
                                      <Container>
                                          <Row>
                                          <Col sm={4}>
                                            <p className="float-left" >Credit card type:</p>
                                          </Col>
                                          <Col sm={8}>                                        
                                            <Input type="select" className="float-left" name={"credit_Card_type"} value={this.state.credit_Card_type} onChange={this.changeHandler}>
                                                <option value="discover">Discover</option>
                                                <option value="visa">visa</option>
                                                <option value="american express">American express</option>
                                                <option value="master card">Master card</option>
                                            </Input>
                                          </Col>                                  
                                          </Row>
                                          <Row>
                                          <Col sm={4}>
                                            <p className="float-left">Credit Card Number:</p>
                                          </Col>
                                          <Col sm={8}>                                        
                                            <Input type="text" placeholder="holder_name" className="float-left" name={"credit_Card_Number"} value={this.state.credit_Card_Number} onChange={this.changeHandler}/>
                                          </Col>  
                                          </Row>
                                          <Row>
                                          <Col sm={4}>
                                            <p className="float-left">CVV</p>
                                          </Col>
                                          <Col sm={8}>                                        
                                             <Input type="text" placeholder="holder_name" className="float-left" name={"credit_cvv"} value={this.state.credit_cvv} onChange={this.changeHandler} />
                                          </Col>  
                                          </Row>
                                          <Row>
                                          <Col sm={6}>
                                            <p className="float-left">Expiry Month:</p>
                                            <Input type="select" name={"expiry_month"} value={this.state.expiry_month} onChange={this.changeHandler}>
                                              <option value="01">January</option>
                                              <option value="02">February</option>
                                              <option value="03">March</option>
                                              <option value="04">Apiral</option>
                                              <option value="05">May</option>
                                              <option value="06">June</option>
                                              <option value="07">July</option>   
                                              <option value="08">August</option>
                                              <option value="09">Septemer</option>
                                              <option value="10">October</option>
                                              <option value="11">November</option>
                                              <option value="12">December</option>
                                            </Input>
                                          </Col>
                                          <Col sm={6}>      
                                            <p className="float-left">Expiry Year:</p>                                  
                                            <Input type="select" name="expiry_year" value={this.state.expiry_year} onChange={this.changeHandler}>
                                              <option value="2021">2021</option>
                                              <option value="2022">2022</option>
                                              <option value="2023">2023</option>
                                              <option value="2024">2024</option>
                                              <option value="2025">2025</option>
                                              <option value="2026">2026</option>
                                              <option value="2027">2027</option>   
                                              <option value="2028">2028</option>
                                              <option value="2029">2029</option>
                                              <option value="2030">2030</option>
                                              <option value="2031">2031</option>
                                              <option value="2032">2032</option>
                                            </Input>
                                          </Col>  
                                          </Row>
                                          <Row>
                                            <Col sm={4}>
                                              <p>Billing Address</p>
                                            </Col>
                                            <Col sm={8}>                                             
                                              <Input type="text"></Input>                                                                                                
                                            </Col>
                                          </Row>
                                          <Row>
                                              <Col sm={6}>
                                              <Input type="text" placeholder="Country" ></Input> 
                                              </Col>
                                              <Col sm={6}>
                                              <Input type="text" placeholder="State"></Input>                                                 
                                              </Col>
                                          </Row>
                                          <Row>
                                              <Col sm={6}>
                                              <Input type="text" placeholder="City" ></Input> 
                                              </Col>
                                              <Col sm={6}>
                                              <Input type="text" placeholder="Zip Postal"></Input>                                                 
                                              </Col>                                                                                 
                                          </Row>
                                          <Button color="success" onClick={this.toggle}>
                                            Cancel
                                          </Button>
                                          <Button.Ripple color="success" onClick={this.addFinance} >
                                            Save
                                          </Button.Ripple>               
                                        </Container>
                                    </TabPane>
                                    
                                </TabContent>                   
                  </ModalBody>
                </Modal>
      </Card>
    )
  }
}

export default DataTableFixedHeader
