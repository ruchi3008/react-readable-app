import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import {Link} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';
class CategoryDetail extends Component {

  render(){
    return (
      <div className="container">
      <PageHeader>
        <Link to={`/`} >Readable App</Link>
      </PageHeader>
      <div className="page-header">
      <h3> Posts on {this.props.match.params.categoryName}</h3>
      </div>
      <PostList posts={this.props.posts && this.props.posts.filter((post) => post.category === this.props.match.params.categoryName)} category={this.props.match.params.categoryName}/>
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



export default connect(mapStateToProps)(CategoryDetail);
