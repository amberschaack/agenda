import { Button, Stack, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className='container'>
    <form onSubmit={login} className='formPanel'>
    <Stack direction='column' alignItems='center' spacing={1}>
      <img src='AgendaBanner.png' />
    </Stack>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Stack direction='column' spacing={1} alignItems='center'>
        <Typography level='h3'>LOGIN</Typography>
      <div>
        <label htmlFor="username">
          Username
          <input
            className='form-control'
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button className="btn" type="submit" name="submit" value="Log In" sx={{mt: '10px', bgcolor: "#0097B2"}}>LOGIN</Button>
        {/* <input className="btn" type="submit" name="submit" value="Log In" /> */}
      </div>
      </Stack>
    </form>
    </div>
  );
}

export default LoginForm;
