// BlogForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import BlogField from './BlogField';
import formFields from './formFields';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class BlogForm extends Component {

  constructor( props ) {
    super( props )
    this.state = { ContentText: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  renderFields() {
    return _.map( formFields, ({ label, name }) => {
      if ( name === 'content' ) {
        return  <ReactQuill 
                  key={name} 
                  value={this.state.text}
                  //onChange={this.handleChange}
                />
      } else {
        return  <Field
                  key={name}
                  component={BlogField}
                  type="text"
                  label={label}
                  name={name}
                />
      }
    });
  }

  handleChange( value ) {
    this.setState({ text: value.getContents() })
  }

  render() {
    return (
      <div>
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
            <button type="submit" className="teal btn-flat right white-text">
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
    if ( !values[name] ) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}


export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})( BlogForm );
