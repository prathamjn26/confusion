import React,{Component} from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Row,Col, Button,Modal,ModalBody,ModalHeader,Label } from 'reactstrap';
import {LocalForm,Control, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const minLen=(len)=>(val)=> val && val.length>=len;
const maxLen=(len)=>(val)=> !val || val.length<=len;

function RenderDishDetail({dish}){
        if (dish != null){
             return(
                 <Card key={dish.id}>
                     <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                     <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                     </CardBody>
                 </Card>
             );}
         else
             return(
                 <div></div>
             );
    }

const RenderComment=({comments,postComment,dishId})=>
    { 
     if(comments!=null)
    {
     return(
        <div>
            <h4>Comments</h4>
        <ul key={comments.id}
         className="list-unstyled">
           {comments.map(item=>
           <div>
           <li>{item.comment}</li>
           <li>--{item.author},
           {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</li><br/>
           </div>)}          
        </ul>
            <div className="row">
            <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
         </div>
     )
    }
    else
    return(
        <div></div>
        )
    }


class CommentForm extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             isModalOpen:false
        }
    }
    
    toggleModal=()=>{
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    
    handleSubmit=(values)=>{
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);
    }

    render()
    {
        return(
            <div>
                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values)=>this.handleSubmit(values)} >
                                <Row className="form-group m-1">
                                    <Label htmlFor="rating" >Rating</Label>
                                    <Control.select model=".rating" id='rating' name="rating"
                                        className="form-control">
                                        <option selected>1</option>
                                        <option >2</option>
                                        <option >3</option>
                                        <option >4</option>
                                        <option >5</option>
                                    </Control.select>

                                </Row>
                                <Row className="form-group m-1" >
                                    <Label htmlFor="yourname">Your Name</Label>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{minLen:minLen(3),maxLen:maxLen(15)}}
                                            />
                                        <Errors model=".yourname"
                                               show="touched"
                                               className="text-danger"
                                               messages={{
                                                   minLen:"Must be greater than 2 characters",
                                                   maxLen:"Must be lesser than 15 characters",
                                                   required:"Field is Required"
                                               }}/>
                                </Row>
                                    
                                <Row className="form-group m-1 ">
                                    <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                                className="form-control"
                                                rows={6}/>
                                </Row>

                                <Row className="form-group m-1 ">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Row>
                                </LocalForm>
                            </ModalBody>
                    </Modal>
                </div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"/>Submit Comment </Button>
            </div>
        )
    }    
    }

        

const DishDetail=(props)=>
{
    const {dish}=props;

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
    {
        return(
        <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetail dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id} />
                    </div>
                </div>
        </div>
    );
    }
    else
        return(<div></div>)
    }

export default DishDetail