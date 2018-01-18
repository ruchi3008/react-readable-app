import React,{ Component } from 'react';
import CategoryDetail from './CategoryDetail';
import HomePage from './HomePage';
import PostDetails from './PostDetails';
import { Switch, Route } from 'react-router-dom';
class App extends Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact name="category" path="/:categoryName" component={CategoryDetail}/>
          <Route exact path="/:postCategory/:postId" component={PostDetails}/>
        </Switch>
        <div>
        </div>
      </div>
    )
  }
}

export default App;
