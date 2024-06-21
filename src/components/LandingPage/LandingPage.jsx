import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <img src="/public/AgendaBanner.png" />
          <p>
            Paragraph 1
          </p>

          <p>
            Paragraph 2
          </p>

          <p>
            Paragraph 3
          </p>
        </div>
          {/* <center>
        <div className='container'>
          <RegisterForm />

            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
        </div>
          </center> */}
      </div>
    </div>
  );
}

export default LandingPage;
