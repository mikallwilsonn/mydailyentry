// ----
// Depedencies
import React, { Component } from 'react'; 
import { connect } from 'react-redux';


// ----
// Footer class Component
class Footer extends Component {
    render () {
        if ( this.props.auth ) {
            return (
                <footer className="page-footer white">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 blue-grey-text text-darken-4">
                                <h5 className="site-name">MyDailyEntry</h5>
                                <p className="grey-text text-darken-4">Quickly write private Notes & Journals!</p>
                            </div>
                            <div className="col l4 offset-l2 s12">
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright white">
                        <div className="container blue-grey-text text-darken-4">
                            © 2019 MyDailyEntry
                        </div>
                    </div>
                </footer>
            );
        } else {
            return '';
        }
    }
}

function mapStateToProps({ auth }) {
    return { auth };
  }

export default connect( mapStateToProps )( Footer );
