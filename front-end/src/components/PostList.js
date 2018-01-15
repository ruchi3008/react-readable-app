import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
import PostForm from './PostForm.js';
import {ListGroup,ListGroupItem,Button,Modal} from 'react-bootstrap';

class PostList extends Component {
  state = {
    postModal:false
  }
  openPostModal = () => {
    this.setState({
      postModal:true
    })
  }
  closePostModal = ()=>{
    this.setState({
      postModal:false
    })
  }
  render(){
    return (
      <div>
      <ListGroup>
      {
        this.props && this.props.posts && this.props.posts.map((post)=>(
          <ListGroupItem key={post.id} header={<Link to={`/postDetails/${post.id}`}>{post.title}</Link>}>
              {post.body}
            </ListGroupItem>
        ))
      }
      </ListGroup>
      <Button bsStyle="primary" onClick={()=>this.openPostModal('Submit')}>Add Post</Button>

      <div>

          <Modal show={this.state.postModal} onHide={this.closePostModal}>
  					<Modal.Header closeButton>
  						<Modal.Title>Add a Post</Modal.Title>
  					</Modal.Header>
  					<Modal.Body>
  					  <PostForm mode="Submit" category={this.props.category}/>
  					</Modal.Body>
  					<Modal.Footer>
  						<Button onClick={this.closePostModal}>Close</Button>
  					</Modal.Footer>
				</Modal>
      </div>
      </div>
    )
  }
}

export default PostList;
