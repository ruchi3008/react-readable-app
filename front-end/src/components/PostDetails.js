import React,{ Component } from 'react';
import { fetchPostDetails,votePost,deletePost } from '../actions/postActions';
import { fetchComments,submitNewComment,voteComment,deleteComment} from '../actions/commentActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

//import Modal from 'react-modal';
import PostForm from './PostForm';
import {Panel,Badge,Button,Modal,PageHeader,FormGroup,Form,FormControl,Col,Glyphicon,ControlLabel,ListGroup,ListGroupItem,ButtonGroup,ButtonToolbar} from 'react-bootstrap';
class PostDetails extends Component{
  state = {
    modal :false,
    mode:'Submit',
    comment:'',
    postModal:false,
    editPost:'',
    commentMsgText:''
  }
  openPostModal = (post) => {
    console.log(post.category)
    this.setState({
      editPost:post,
      postModal:true
    })
  }
  closePostModal = ()=>{
    this.setState({
      postModal:false,
      editPost:''
    })
  }

  votePost = (postId,voteType) => {
    console.log("votePost"+postId + voteType);
    this.props.votePost(postId,voteType);
    this.setState({
      postModal:false,
      editPost:''
    })
  }

  deletePost = (postId) => {
    this.props.deletePost(postId);
    this.setState({
      postModal:false,
      editPost:''
    })
    this.props.history.goBack();
  }
  openCommentModal = (mode,comment='') => {
    this.setState({
      modal:true,
      mode:mode,
      comment:comment
    })
    console.log(comment.id + mode);
  }

  closeCommentModal = () => {
    this.setState({
      modal:false,
      mode:'Submit',
      comment:'',
      commentMsgText:''
    })
  }

  submitComment = () => {
    console.log(this.text.value);

    let id = this.state.comment!==''?this.state.comment.id:''
    let messageText = this.state.comment!==''?"Comment Updated":'Comment Added';
    this.props.submitNewComment(this.props.match.params.postId,this.text.value,id);
    this.setState({
      commentMsgText:messageText
    })
    //this.closeCommentModal();
  }

  voteComment = (commentId,voteType) => {
    console.log("voteComment"+commentId + voteType);
    this.props.voteComment(commentId,voteType);
    this.setState({
      modal:false,
      mode:'Submit',
      comment:''
    })
  }

  deleteComment = (commentId) => {
    this.props.deleteComment(commentId);
    this.setState({
      modal:false,
      mode:'Submit',
      comment:''
    })
  }
  getDate(timestamp){
    let date = new Date(timestamp);
    let formattedDate = date.format('dd.mm.yyyy hh:MM:ss');
    console.log(formattedDate);
    return formattedDate;
  }
  componentDidMount(){
    console.log("mounting compoent");
    this.props.fetchPostDetails(this.props.match.params.postId);
    this.props.fetchComments(this.props.match.params.postId);
  }

  render(){

    return (
      <div className="container">
      <PageHeader>
        <Link to={`/`} >Readable App</Link>
     </PageHeader>
        {this.props && this.props.post &&
          <div>
          <div><Panel className="primary">
          <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.post.title} by {this.props.post.author}</Panel.Title>
          </Panel.Heading>
		        <Panel.Body>
              <div>
                <div>{this.props.post.body}</div>
                <div>
                  <Moment format="DD-MMM-YYYY HH:mm A">{this.props.post.timestamp}</Moment>

                </div>
                <div>Votes : {this.props.post.voteScore}</div>
                <div>Total Number of Comments : <Badge>{this.props.comments && this.props.comments.length}</Badge></div>
              </div>
              <div>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button bsStyle="primary" onClick={()=>this.openPostModal(this.props.post)}>Edit</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                  <Button bsStyle="primary" onClick={()=>this.votePost(this.props.post.id,'upVote')}><Glyphicon glyph="thumbs-up" /></Button>
                  <Button bsStyle="primary" onClick={()=>this.votePost(this.props.post.id,'downVote')}><Glyphicon glyph="thumbs-down" /></Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button bsStyle="primary" onClick={()=>this.deletePost(this.props.post.id)}>Delete</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
                </Panel.Body>
              <div>

              <ListGroup>
              {
                this.props && this.props.comments && this.props.comments.map((comment)=>(
                  <ListGroupItem header={<div><b>{comment.author}</b> says {comment.body}</div>}>

                  <div>
                  <Moment format="DD-MMM-YYYY HH:mm A">{comment.timestamp}</Moment>
                  </div>
                  <div>
                  Votes: {comment.voteScore}
                  </div>
                  <div>
                  <ButtonToolbar>
                  		<ButtonGroup>
                  			<Button bsStyle="primary" onClick={()=>this.openCommentModal('Update',comment)}>Edit</Button>
                      </ButtonGroup>
                      <ButtonGroup>
                        <Button  bsStyle="primary" onClick={()=>this.voteComment(comment.id,'upVote')}><Glyphicon glyph="thumbs-up" /></Button>
                          <Button  bsStyle="primary" onClick={()=>this.voteComment(comment.id,'downVote')}><Glyphicon glyph="thumbs-down" /></Button>
                      </ButtonGroup>
                      <ButtonGroup>
                  			<Button  bsStyle="primary" onClick={()=>this.deleteComment(comment.id)}>Delete</Button>
                      </ButtonGroup>
                  </ButtonToolbar>

                  </div>
                  </ListGroupItem>
                ))
              }
              </ListGroup>
              </div>
              <Panel.Footer><Button bsStyle="primary" onClick={()=>this.openCommentModal('Submit')}>Add Comment</Button></Panel.Footer>



	           </Panel>
          </div>
          <div>

          </div>
          </div>
        }

                <Modal show={this.state.modal} onHide={this.closeCommentModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add a Comment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <Form horizontal>
                    <FormGroup>
                     <Col componentClass={ControlLabel} sm={7}>
                         {this.state.commentMsgText}
                     </Col>
                   </FormGroup>
                		<FormGroup controlId="commentText">
                			<Col componentClass={ControlLabel} sm={2}>
                				Comment
                			</Col>
                			<Col sm={10}>
                				<FormControl inputRef={node => this.text = node} type="text" defaultValue={this.state.comment.body} />
                			</Col>
                		</FormGroup>
                    <FormGroup>
              			<Col smOffset={2} sm={10}>
                      <div className="text-right">
              				<Button bsStyle="primary" onClick={()=>{this.submitComment()}}>{this.state.mode}</Button>
                      </div>
              			</Col>
              		  </FormGroup>
                   </Form>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.closeCommentModal}>Close</Button>
                  </Modal.Footer>
                  </Modal>


                <Modal show={this.state.postModal} onHide={this.closePostModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PostForm mode="Update" post={this.state.editPost}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closePostModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

      </div>

    )
  }
}

const mapStateToProps = (state,props) => {
  console.log("mapStateToProps" + state.postReducer);
  return {
    post:state.postReducer.postDetails,
    comments:state.commentReducer.comments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetails :(id) => dispatch(fetchPostDetails(id)),
    fetchComments :(id) => dispatch(fetchComments(id)),
    submitNewComment :(postId,commentText,commentId) => dispatch(submitNewComment(postId,commentText,commentId)),
    voteComment :(commentId,voteType) => dispatch(voteComment(commentId,voteType)),
    deleteComment:(commentId) => dispatch(deleteComment(commentId)),
    votePost:(postId,voteType) => dispatch(votePost(postId,voteType)),
    deletePost:(postId)=> dispatch(deletePost(postId))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostDetails)
