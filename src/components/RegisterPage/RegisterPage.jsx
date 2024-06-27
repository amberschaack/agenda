import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/joy';

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          sx={{ bgcolor: '#ADB5BD' }}
          onClick={() => {
            history.push('/login');
            dispatch({ type: 'FETCH_ALL_GROUPS'});
          }}
        >
          LOGIN
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
