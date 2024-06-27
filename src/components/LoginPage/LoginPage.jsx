import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/joy';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          sx={{ bgcolor: '#ADB5BD' }}
          onClick={() => {
            history.push('/registration');
          }}
        >
          REGISTER
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
