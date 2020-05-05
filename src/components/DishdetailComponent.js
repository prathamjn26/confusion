import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';

export class DishDetail extends Component {
    
    renderDishdetail=(dish)=>{
        if (dish != null){
         console.log(dish.comments)
             return(
                 <Card>
                     <CardImg top src={dish.image} alt={dish.name}/>
                     <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                       {/* {dish.comments.map(item=><h1>{item.comment}</h1>)}                */}
                     </CardBody>
                 </Card>
             );}
         else
             return(
                 <div></div>
             );
    }

    renderComment(comment)
    { 
        
        if(comment!=null)
        {
        comment.map(item=>{return(<p>{item.comment}</p>)})
        }
        else
        {
            return(
                <div></div>
            )
        }
    }

    render() 
    {
    const {dish}=this.props;
    console.log(dish.comments)
     return(
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                {/* {this.renderDishdetail(dish.map(item=>item.comments))} */}
            </div>
            <div className="col-12 col-md-5 m-1">
                {this.renderComment(dish)}
            </div>
       </div>
    );
  }
}

export default DishDetail
