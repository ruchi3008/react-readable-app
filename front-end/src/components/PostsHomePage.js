import React,{ Component } from 'react';
import PostList from './PostList';
import {connect} from 'react-redux';
class PostsHomePage extends Component {

  render(){

    return (
      <div>
      <div >
           <PostList posts={this.props.posts && this.props.posts}/>
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
