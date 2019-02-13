// ----
// Dependencies
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';
import moment from 'moment';


// ----
// BlogShow class Component
class BlogShow extends Component {

  constructor( props ) {
    super( props );
    this.contentRef = createRef();
  }

  componentDidMount() {
    this.props.fetchBlog( this.props.match.params._id );
    
  }

  componentDidUpdate() {
    this.contentRef.current.innerHTML = this.props.blog.content;
  }

  render() {
    if ( !this.props.blog ) {
      return '';
    }

    const { title, createdAt } = this.props.blog;

    return (
      <div className="container">
        <div className="post container s6">
          <h3 style={{ textAlign: 'center'}}>{title}</h3>
          <h6 style={{ textAlign: 'center'}}>Posted {moment(createdAt).fromNow()} on {moment(createdAt).format( "dddd, MMMM Do YYYY" )}</h6>
          <hr className="post-divider"/>
          <p ref={this.contentRef}></p>
        </div>

      </div>
    );
  }
}


function mapStateToProps( { blogs }, ownProps ) {
  return { blog: blogs[ownProps.match.params._id] };
}


export default connect( mapStateToProps, { fetchBlog })( BlogShow );
