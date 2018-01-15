import React,{ Component } from 'react';
import PostList from './PostList';
import {connect} from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
class PostsHomePage extends Component {

  state ={
    sortParam:"voteScore"
  }
  sortAction=(sortParam) => {

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

      comparison = 1;
    } else if (varA < varB) {

      comparison = -1;
    }


     if (order ==='desc')
      {

        return comparison * -1
      }
      else {

        return comparison
      }
  };
}

  render(){

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

  return {
    posts:state.postReducer.posts
  }
};
export default connect(mapStateToProps)(PostsHomePage)
