import React,{Component} from 'react';
import ReactDOM from 'react';
import {submitPost} from '../actions/postActions';
import {connect} from 'react-redux';
import {FormGroup,Form,FormControl,Col,ControlLabel,Button,DropdownButton,InputGroup,MenuItem} from 'react-bootstrap';
class PostForm extends Component{
   state = {
     messagetext:''
   }
  submitPost = () => {
    //console.log("Inside SubmitPosthome" + this.title.value + this.category.value);
    console.log("Inside SubmitPostcategory" + this.props.category );
    if(this.props.mode!==undefined && this.props.mode==='Update'){
      console.log('Updating' + this.props.post.id);
      this.props.submitPost(this.title.value,this.text.value,this.props.post.category,this.props.post.id);
      this.setState({
        messagetext:'Post Updated'
      })
    }else
    {
      if(this.props.category!=null || this.props.category!==undefined){
        {
          this.props.submitPost(this.title.value,this.text.value,this.props.category,'');
        }
      }
    else if (this.refs.category!==null||this.refs.category!==undefined)
        {
          this.props.submitPost(this.title.value,this.text.value,this.category.value,'','');
        }
    this.setState({
          messagetext:'Post Added'
        })
    }
  }
  render(){
    return(
      <div>
        <Form horizontal>
          <FormGroup>
           <Col componentClass={ControlLabel} sm={7}>
               {this.state.messagetext}
           </Col>
         </FormGroup>
      		<FormGroup controlId="postTitle">
      			<Col componentClass={ControlLabel} sm={2}>
      				Title
      			</Col>
      			<Col sm={10}>
      				<FormControl inputRef={node => this.title = node} type="text" defaultValue={this.props&&this.props.post&&this.props.post.title} />
      			</Col>
      		</FormGroup>

      		<FormGroup controlId="postText">
      			<Col componentClass={ControlLabel} sm={2}>
      				Body
      			</Col>
      			<Col sm={10}>
      				<FormControl inputRef={node => this.text = node} type="text" defaultValue={this.props&&this.props.post&&this.props.post.body} />
      			</Col>
      		</FormGroup>
          {(this.props.category===undefined && this.props.mode==="Submit") &&
          <FormGroup controlId="postCategory">
      			<Col componentClass={ControlLabel} sm={2}>
      				Category
      			</Col>
      			<Col sm={10}>
                <FormControl inputRef={select => { this.category = select }} componentClass="select" disabled={this.state.added}>
                         {this.props.categories.map((category)=>(<option key={category.name} value={category.name}>{category.name}</option>))}
                </FormControl>
      			</Col>
      		</FormGroup>
        }
          <FormGroup>
    			<Col smOffset={2} sm={10}>
            <div className="text-right">
    				<Button bsStyle="primary" onClick={()=>{this.submitPost()}}>{this.props.mode}</Button>
            </div>
    			</Col>
    		  </FormGroup>
        </Form>
      </div>
    )
  }
}
const mapStateToProps = (state,props) => {
  console.log("mapStateToProps" + state.postReducer + state.categoryReducer.categories);
  return {
    categories:state.categoryReducer.categories
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitPost :(postTitle,postText,postCategory,postId) => dispatch(submitPost(postTitle,postText,postCategory,postId))
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(PostForm);
