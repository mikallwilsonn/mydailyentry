// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


class BlogFormReview extends Component {

  constructor( props ) {
    super( props );
    this.contentRef = createRef();
  }

  componentDidMount() {
    this.contentRef.current.innerHTML = this.props.formValues['content'];
  }

  renderFields() {
    const { formValues } = this.props;

    return _.map( formFields, ({ name, label } ) => {
      if ( name === 'content' ) {
        return (
          <div key={name}>
            <label>{label}</label>
            <div ref={this.contentRef}></div>
          </div>
        );
      } else {
        return (
          <div key={name}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
          </div>
        );
      }


    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div className="button-wrapper">
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  onSubmit( event ) {
    event.preventDefault();

    const { submitBlog, history, formValues } = this.props;

    submitBlog( formValues, history );
  }

  render() {
    return (
      <form className="container" onSubmit={this.onSubmit.bind( this )}>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}

        {this.renderButtons()}
      </form>
    );
  }
}


function mapStateToProps( state ) {
  return { formValues: state.form.blogForm.values };
}


export default connect( mapStateToProps, actions )( withRouter( BlogFormReview ));
