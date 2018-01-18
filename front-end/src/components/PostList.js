import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
import PostForm from './PostForm.js';
import * as postActions from '../actions/postActions';
import { connect } from 'react-redux';
import {compareValues} from '../utils/utils';
import {ListGroup,MenuItem,DropdownButton,Button,Modal,Badge,Panel,ButtonToolbar,ButtonGroup,Glyphicon} from 'react-bootstrap';
import Moment from 'react-moment';
class PostList extends Component {
  state = {
    postModal:false,
    mode:"Submit",
    sortParam:"category"
  }
  openPostModal = (mode,post={}) => {
    this.setState({
      postModal:true,
      editPost:post,
      mode:mode
    })
  }
  closePostModal = ()=>{
    this.setState({
      postModal:false,
      mode:"Submit",
      editPost:{}
    })
  }

  sortAction=(sortParam) => {
    this.setState({sortParam})
  }
  render(){
    let {posts,category} = this.props;
    return (
      <div>
      <div className="text-right">
          <DropdownButton title="Sort Posts" id="sort" onSelect={(e)=>this.sortAction(e)}>
           <MenuItem eventKey="voteScore">Vote Score</MenuItem>
           <MenuItem eventKey="timestamp">Timestamp</MenuItem>
           <MenuItem eventKey="author">Author</MenuItem>
          </DropdownButton>
      </div>
      <ListGroup>
      {
        posts && posts.sort(compareValues(this.state.sortParam,'asc')).map((post)=>(

          <Panel key={post.id} className="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                <Link to={`/${post.category}/${post.id}`}>{post.title} by {post.author}({post.category})</Link>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <div>
                <div>{post.body}</div>
                <div>
                  <Moment format="DD-MMM-YYYY HH:mm A">{post.timestamp}</Moment>
                </div>
                <div>Votes : {post.voteScore}</div>
                <div>Total Number of Comments : <Badge>{post.commentCount}</Badge></div>
              </div>
              <div>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button bsStyle="primary" onClick={()=>this.openPostModal("Update",post)}>Edit</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                  <Button bsStyle="primary" value={post.id} onClick={(event)=>this.props.votePost(post.id,'upVote')}><Glyphicon glyph="thumbs-up"/></Button>
                  <Button bsStyle="primary" onClick={()=>this.props.votePost(post.id,'downVote')}><Glyphicon glyph="thumbs-down" /></Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button bsStyle="primary" onClick={()=>this.props.deletePost(post.id)}>Delete</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Panel.Body>
            </Panel>
        ))
      }
      </ListGroup>
      <Button bsStyle="primary" onClick={()=>this.openPostModal("Submit")}>Add Post</Button>
      <div>
          <Modal show={this.state.postModal} onHide={this.closePostModal}>
  					<Modal.Header closeButton>
  						<Modal.Title>Add a Post</Modal.Title>
  					</Modal.Header>
  					<Modal.Body>
  					  <PostForm mode={this.state.mode} category={category} post={this.state.editPost}/>
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

const mapStateToProps = (state,props) =>{
  return {}
}

export default connect(mapStateToProps,postActions)(PostList);
