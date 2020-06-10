import React, { Component } from 'react';
import { postComment, fetchDishes, fetchComments, fetchPromos,fetchLeaders,postFeedback } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent'; 
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect,withRouter} from  'react-router-dom'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    promotions:state.promotions,
    leaders:state.leaders,
    comments:state.comments
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback:(firstname, lastname, email, telnum,agree,contactType,message)=>dispatch
  (postFeedback(firstname, lastname, email, telnum,agree,contactType,message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:()=>dispatch(fetchLeaders()),
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render()
  { 
    const HomePage=()=>{
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
    />
    )
    }
      
    const DishWithId=({match})=>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
      )
    }
  
  const AboutUs=()=>{
    return(
      <About
      leaders={this.props.leaders.leaders}
      isLoading={this.props.leaders.isLoading}
      errMess={this.props.leaders.errMess}/>
    )
  }

  return (
    <div>
      <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>          
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes} />}/>
              <Route path='/menu/:dishId' component={DishWithId}/>
              <Route exact path='/contactus' component={() => 
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />           
              <Route path='/aboutus' component={AboutUs}/>
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      <Footer/>
    </div>
  );
 }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));