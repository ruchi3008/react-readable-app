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
          <Route name="category" path="/category/:categoryName" component={CategoryDetail}/>
          <Route path="/postDetails/:postId" component={PostDetails}/>
        </Switch>
        <div>
        </div>
      </div>
    )
  }
}

export default App;
