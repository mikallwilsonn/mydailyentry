// BlogForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component, createRef } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import BlogField from './BlogField';
import BlogContentField from './BlogContentField';
import formFields from './formFields';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentContext from '../../contexts/ContentContext';


class BlogForm extends Component {

  constructor( props ) {
    super( props )
    this.state = { contentText: '' };
    this.handleChange = this.handleChange.bind(this);
    this.contentRef = createRef();
  }

  handleContentInputValue() {
    this.contentRef.current.children[0].children[1].value = this.state.contentText;
  }

  componentDidMount() {
    this.handleContentInputValue();
  }

  componentDidUpdate() {
    this.handleContentInputValue();
  }

  renderFields() {
    return _.map( formFields, ({ label, name }) => {
      if ( name === 'content' ) {
        return  (
          <div key={`${name}-container`}>
              <label>{label}</label>
              <ReactQuill 
                  style={{marginTop: '25px'}}
                  value={this.state.contentText}
                  onChange={this.handleChange}
              />
              <br />
              <div id="hidden-content" ref={this.contentRef}>
                <ContentContext.Provider value={this.state.contentText}>
                  <Field
                    key={name}
                    component={BlogContentField}
                    type="text"
                    label={label}
                    name={name}
                    ref={this.hiddenContentRef}
                  />
                </ContentContext.Provider>

              </div>

          </div>
        );
      } else {
        return (
          <Field
            key={name}
            component={BlogField}
            type="text"
            label={label}
            name={name}
          />
        );
      }
    });
  }

  handleChange( value ) {
    this.setState({ contentText: value });
    this.handleContentInputValue();
  }

  render() {
    return (
      <div className="container">
        <h3>Create A New Entry</h3>
        <form 
          id="createNewBlogForm" 
          onSubmit={this.props.handleSubmit( this.props.onBlogSubmit )}
        >
          {this.renderFields()}

          <br />
          <div className="button-wrapper">
            <Link to="/blogs" className="red btn-flat white-text">
              Cancel
            </Link>
            <button 
              type="submit" 
              className="teal btn-flat right white-text" 
              onMouseEnter={() => this.contentRef.current.children[0].children[1].focus()}
            >
              Next
              <i className="material-icons right">done</i>
            </button>
          </div>

        </form>
      </div>
    );
  }
}


function validate( values ) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if ( name === 'title' ) {
      if ( !values[name] ) {
        errors[name] = 'You must provide a value';
      }
    }
  });

  return errors;
}


export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})( BlogForm );
