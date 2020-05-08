import React from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';

    
function RenderDishDetail({dish}){
        if (dish != null){
             return(
                 <Card key={dish.id}>
                     <CardImg top src={dish.image} alt={dish.name}/>
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

 const RenderComment=({comment})=>
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

  const DishDetail=(props )=>
    {
     const {dish}=props;
     return(
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDishDetail dish={dish}/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComment comment={dish?dish.comments:null}/>
            </div>
       </div>
    );
  }

export default DishDetail