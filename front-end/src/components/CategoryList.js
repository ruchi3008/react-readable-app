import React,{ Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
class CategoryList extends Component {

  render(){
    return (
      <div>
      <div className="page-header">
        <h3> Categories</h3>
      </div>
      <ul className="list-inline">
        {
          this.props && this.props.categories && this.props.categories.map((category)=>(
            <li key={category.name}>
              <Link to={`/category/${category.name}`} >{category.name}</Link>
            </li>
          ))
        }
      </ul>
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
  return {
    categories:state.categoryReducer.categories
  }
};


export default connect(mapStateToProps)(CategoryList);
