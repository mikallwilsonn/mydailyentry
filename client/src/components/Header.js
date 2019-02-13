// ----
// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


// ----
// Header class Compnonent
class Header extends Component {
  renderContent() {
    switch ( this.props.auth ) {
      case null:
        return;
      case false:
        return (
          <li>
            <a id="loginWithGoogle" href={'/auth/google'}>
              <Icon icon={faGoogle} />
              <strong>Login with Google</strong>
            </a>
          </li>
        );
      default:
        return [
          <li key="1" style={{ margin: '0 10px' }}>
          <Link to="/blogs/new" className="btn btn-sm white new-entry blue-grey-text">
            <Icon icon={faPencilAlt} />
            <strong>New Entry</strong>
          </Link>
        </li>,
          <li key="3" style={{ margin: '0 10px' }}>
            <Link to="/blogs" className="blue-grey-text">
              <strong>My Blogs</strong>
            </Link>
          </li>,
          <li key="2">
            <a id="logoutButton" className="blue-grey-text" href={'/auth/logout'}>
              <strong>Logout</strong>
            </a>
          </li>
        ];
    }
  }

  render() {

    if ( this.props.auth ) {
      return (
        <nav className="header-nav white blue-grey-text">
          <div className="container nav-wrapper blue-grey-text">
            <Link
              to={this.props.auth ? '/blogs' : '/'}
              className="left brand-logo site-name blue-grey-text"
              style={{ marginLeft: '10px' }}
            >
              MyDailyEntry
            </Link>
            <ul className="right blue-grey-text">{this.renderContent()}</ul>
          </div>
        </nav>
      );
    } else {
      return '';
    }
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}


export default connect( mapStateToProps )( Header );
