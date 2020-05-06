import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';

class DishDetail extends Component {
    
    renderDishdetail=(dish)=>{
        if (dish != null){
             return(
                 <Card key={dish.id}>
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

    renderComment=(comment)=>
    { 
     if(comment!=null)
    {
     return(
        <div>
            <h4>Comments</h4>
        <ul key={comment.id}
         className="list-unstyled">
           {comment.map(item=>
           <div>
           <li>{item.comment}</li>
           <li>--{item.author},
           {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</li><br/>
           </div>)}          
        </ul>

         </div>
     )
    }
    else
    return(
        <div></div>
        )
    }

render() 
    {
    const {dish}=this.props;
     return(
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                {this.renderDishdetail(dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
                {this.renderComment(dish?dish.comments:null)}
            </div>
       </div>
    );
  }
}

export default DishDetail
