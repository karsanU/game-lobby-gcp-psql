import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts';
import axios from 'axios';

function SignUp({ setWantsToSignIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpErr, setSingUpErr] = useState('');
  const { user, setUser } = useContext(UserContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (user) {
      userIsLoggedIn();
    }
  });

  function handleOnChange(e, set) {
    set(e.target.value);
  }

  function userIsLoggedIn() {
    navigate('/home');
  }

  function handleSingUp() {
    (async function () {
      try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:3001/users/create',
          data: {
            name,
            email,
            password,
          },
        });
        console.log(res.data.user);
        setUser(res.data.user);
        userIsLoggedIn();
      } catch (err) {
        console.log(err.response.data.message);
        setSingUpErr(err.response.data.message || err.toString());
      }
    })();
  }

  return (
    <Container maxWidth='md' sx={{ display: 'flex' }}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': {
            mx: 'auto',
            mb: 2,
            width: 250,
          },
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          mx: 'auto',
          my: 'auto',
        }}
        noValidate
        autoComplete='off'>
        <Box component='h1' sx={{ color: 'black' }}>
          Sign up
        </Box>
        <TextField
          size=''
          label='Name'
          id='filled-size-normal'
          value={name}
          onChange={(e) => {
            handleOnChange(e, setName);
          }}
        />
        <TextField
          label='Email'
          id='filled-size-normal'
          value={email}
          onChange={(e) => {
            handleOnChange(e, setEmail);
          }}
        />
        <TextField
          label='Password'
          type='password'
          id='filled-size-normal'
          value={password}
          onChange={(e) => {
            handleOnChange(e, setPassword);
          }}
        />
        {signUpErr && (
          <Box
            sx={{ m: 0, mx: 'auto', mb: 2, width: 250, color: 'red' }}
            component='p'>
            {signUpErr}
          </Box>
        )}
        <Button
          variant='outlined'
          sx={{ width: 250, height: 50, mx: 'auto' }}
          onClick={() => handleSingUp()}>
          Sign up
        </Button>
        <Box sx={{ mx: 'auto', my: 2 }}>
          <RouterLink style={{ color: '#1976d2' }} to='/signin'>
            {'Sign in'}
          </RouterLink>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
