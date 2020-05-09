import React from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
    
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

 const RenderComment=({comments})=>
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
         </div>
     )
    }
    else
    return(
        <div></div>
        )
    }

  const DishDetail=(props)=>
    {
     const {dish}=props;
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
                        <RenderComment comments={props.comments} />
                    </div>
                </div>
       </div>
    );
  }

export default DishDetail