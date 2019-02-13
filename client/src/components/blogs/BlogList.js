// ----
// Dependencies
import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';
import moment from 'moment';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';


// ----
// BlogList class Component
class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  trimContent( content ) {
    if ( !content ) {
      return '';
    } else if ( content.length > 250 ) {
      return `${content.substring( 0, 250 )} ...`;
    } else {
      return content;
    }
  }

  renderBlogs() {
    return map( this.props.blogs, blog => {
      return (
        <div className="blog-card card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <Link to={`/blogs/${blog._id}`} className="black-text">
                <span className="card-title">{blog.title}</span>
              </Link>
              <small className="blog-date">Posted {moment(blog.createdAt).fromNow()} on {moment(blog.createdAt).format( "dddd, MMMM Do YYYY" )}</small>
              <p className="blog-content">{this.trimContent( blog.content ).replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`} className="read-more blue-grey-text text-darken-1">
                <Icon icon={faBookReader} />
                <strong>Read Entry</strong>
                
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderBlogs()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect( mapStateToProps, { fetchBlogs })( BlogList );
