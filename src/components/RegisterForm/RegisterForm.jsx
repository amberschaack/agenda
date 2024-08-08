import { Button, Stack, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password
      },
    });

    history.push('/select-group');
  }; // end registerUser

  return (
    <div className='container'>
    <form className="formPanel" onSubmit={registerUser}>
    <Stack direction='column' alignItems='center'>
      <img src='AgendaBanner.png' />
    </Stack>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Stack direction='column' spacing={1} alignItems='center'>
        <Typography level='h3'>REGISTRATION</Typography>
      <div>
        <label htmlFor="username">
          Username
          <input
            className='form-control'
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            className='form-control'
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button className="btn" type="submit" name="submit" value="Register" sx={{mt: '10px', bgcolor: "#0097B2"}}>REGISTER</Button>
      </div>
      </Stack>
    </form>
    </div>
  );
}

export default RegisterForm;
