import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import {Link} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';
class CategoryDetail extends Component {

  render(){
     let {posts,match} = this.props
    return (
      <div className="container">
      <PageHeader>
        <Link to={`/`} >Readable App</Link>
      </PageHeader>
      <div className="page-header">
      <h3> Posts on {match.params.categoryName}</h3>
      </div>
      <PostList posts={posts && posts.filter((post) => post.category === match.params.categoryName)} category={this.props.match.params.categoryName}/>
      </div>
    )
  }
}
const mapStateToProps = (state,props) => {
  return {
    posts:state.postReducer.posts
  }
};



export default connect(mapStateToProps)(CategoryDetail);
