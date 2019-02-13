// ----
// Dependencies
import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


// ----
// Landing functional Component
const Landing = () => {
  return (
    <div id="lander">

      <div>

        <img 
          src='book.svg' 
          alt="MyDailyEntry logo" 
        />

        <h1 className="site-name">
          MyDailyEntry
        </h1>

        <p>
          Quickly write private Notes & Journals!
        </p>

        <a 
          id="loginWithGoogle" 
          className="waves-effect waves-light btn btn-large red white-text" 
          href={'/auth/google'}>
            <Icon icon={faGoogle} />
            <strong>Login with Google</strong>
        </a>
      </div>

    </div>
  );
};


export default Landing;
