import React,{ Component } from 'react';
import PostList from './PostList';
import {connect} from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
class PostsHomePage extends Component {

  state ={
    sortParam:"voteScore"
  }
  sortAction=(sortParam) => {
    console.log(sortParam);
    this.setState({sortParam})
  }

 compareValues = (key, order='asc') => {
  return function(a, b) {
    if(!a.hasOwnProperty(key) ||
       !b.hasOwnProperty(key)) {
  	  return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      console.log("a>b")
      comparison = 1;
    } else if (varA < varB) {
      console.log("b>a")
      comparison = -1;
    }
    console.log("sorted the array");

     if (order ==='desc')
      {
        console.log("returning -1");
        return comparison * -1
      }
      else {
        console.log("returning 1");
        return comparison
      }
  };
}

  render(){
    console.log("Rendering");
    return (
      <div>
      <div className="text-right">
          <DropdownButton title="Sort Posts" id="sort" onSelect={(e)=>this.sortAction(e)}>
           <MenuItem eventKey="voteScore">Vote Score</MenuItem>
           <MenuItem eventKey="timestamp">Timestamp</MenuItem>
           <MenuItem eventKey="category">Category</MenuItem>
           <MenuItem eventKey="author">Author</MenuItem>
          </DropdownButton>
      </div>
      <div >
           <PostList posts={this.props.posts && this.props.posts.sort(this.compareValues(this.state.sortParam,'asc'))}/>
      </div>
      </div>
    )
  }
}
const mapStateToProps = (state,props) => {
  console.log("mapStateToProps" + state.postReducer);
  return {
    posts:state.postReducer.posts
  }
};
export default connect(mapStateToProps)(PostsHomePage)
