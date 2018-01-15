import React,{ Component } from 'react';
import CategoryList from './CategoryList';
import PostsHomePage from './PostsHomePage';
import {PageHeader} from 'react-bootstrap';
import { Link } from 'react-router-dom';
class HomePage extends Component {
  render(){
    return (
      <div className="container">
        <PageHeader>
		      <Link to={`/`} >Readable App</Link>
	     </PageHeader>
        <CategoryList/>
        <div className="page-header">
        <h3> Posts</h3>
        </div>
        <PostsHomePage/>
      </div>
    )
  }
}

export default HomePage
