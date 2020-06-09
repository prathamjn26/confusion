import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,Button,Label, Col,Row} from 'reactstrap';
import {Control,Form, Errors,actions} from 'react-redux-form'
import {Link} from 'react-router-dom';

const required=(val)=>val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber =(val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    
    handleSubmit=(values)=>{
    alert(JSON.stringify(values))
    this.props.resetFeedbackForm();
 //   values.preventDefault();
    }

    render()
    {
    return(
        <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
            </div>

            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send Your Feedback</h3><br/>
                </div>
                <div className="col-12 col-md-9">
                    <Form model='feedback' onSubmit={(values)=>this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="firstname" md={2}>First Name</Label>
                        <Col md={10}>
                            <Control.text model=".firstname" id="firstname" name="firstname"
                                placeholder="First Name"
                                className="form-control"
                                validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}
                                />
                            <Errors model=".firstname"
                            className="text-danger"
                            show="touched"
                            messages={{
                                required:"Field is Required",
                                minLength:"minimum lenght of character is more than 2",
                                maxLength:"maximum lenght of character is 15",
                            }}/>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="lastname" md={2}>Last Name</Label>
                        <Col md={10}>
                            <Control.text model=".lastname" id="lastname" name="lastname"
                                placeholder="Last Name"
                                className="form-control"
                                className="form-control"
                                validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}
                                />
                                <Errors model=".lastname"
                                    className="text-danger"
                                    show="touched"
                                    messages={{
                                        required:"Field is Required",
                                        minLength:"minimum lenght of character is more than 2",
                                        maxLength:"maximum lenght of character is 15",
                                    }}/>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                        <Col md={10}>
                            <Control.text model=".telnum" id="telnum" name="telnum"
                                placeholder="Tel. Number"
                                className="form-control"
                                validators={{required,isNumber,minLength:minLength(10),maxLength:maxLength(12)}}
                                />
                            <Errors
                            className="text-danger"
                            model=".telnum"
                            show="touched"
                            messages={{
                                required:"Field is Required",
                                minLength:"minimum lenght of number is 10",
                                maxLength:"maximum lenght of number is 12",
                                isNumber:"Please enter a valid number"
                            }}/>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="email" md={2}>Email</Label>
                        <Col md={10}>
                            <Control.text model=".email" id="email" name="email"
                                placeholder="Email"
                                className="form-control"
                                validators={{required,validEmail}} />
                            <Errors
                             model=".email"
                             className="text-danger"
                             show="touched"
                             messages={{
                                 required:"Field is Required",
                                 validEmail:"Please enter a valid Email id"
                             }}/>
                        </Col>
                    </Row>
                    
                    <Row className="form-group">
                        <Col md={{size: 6, offset: 2}}>
                            <div className="form-check">
                                <Label check>
                                    <Control.checkbox model=".agree" name="agree"
                                        className="form-check-input"
                                            /> {' '}
                                        <strong>May we contact you?</strong>
                                </Label>
                            </div>
                        </Col>
                        <Col md={{size: 3, offset: 1}}>
                            <Control.select model=".contactType" name="contactType"
                                className="form-control">
                                <option>Tel.</option>
                                <option>Email</option>
                            </Control.select>
                        </Col>
                    </Row>
                    
                    <Row className="form-group">
                        <Label htmlFor="message" md={2}>Your Feedback</Label>
                        <Col md={10}>
                            <Control.textarea model=".message" id="message" name="message"
                                rows="12"
                                className="form-control" />
                        </Col>
                    </Row>
                    
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Send Feedback
                            </Button>
                        </Col>
                    </Row>
                </Form>
                </div>
            </div>

        </div>
    );
}
}
export default Contact;