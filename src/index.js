import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router,Switch,Route ,withRouter} from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Spinner from './Spinner';

import firebase from "./firebase";//firebase listener . detect if any person recently has logged in or registered in our app

import 'semantic-ui-css/semantic.min.css'

import { connect, Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

import { setUser,clearUser } from "./actions/index";




const store = createStore(rootReducer, composeWithDevTools());


class Root extends Component{
  
  componentDidMount(){

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
            // detects whether is a logged-in user in our app
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    })
  }
  
  render(){
    return this.props.isloading ? (<Spinner/>): 
      (<Switch>
        <Route path="/" exact component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>);
        
    
  }

}



const mapStateFromProps = state =>(
  {
    isloading : state.user.isLoading
  }
)


const RootWithAuth = withRouter(connect(mapStateFromProps,{setUser,clearUser})(Root));



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
