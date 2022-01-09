import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInErr, setSingInErr] = useState('');

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

  function handleSingIn() {
    (async function () {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        userIsLoggedIn();
      } catch (err) {
        setSingInErr(err.toString());
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
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          mx: 'auto',
          my: 'auto',
        }}
        noValidate
        autoComplete='off'>
        <Box component='h1' sx={{ color: 'black' }}>
          Sign in
        </Box>
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
          id='filled-size-normal'
          type='password'
          value={password}
          onChange={(e) => {
            handleOnChange(e, setPassword);
          }}
        />
        {signInErr && (
          <Box
            sx={{ m: 0, mx: 'auto', mb: 2, width: 250, color: 'red' }}
            component='p'>
            {signInErr}
          </Box>
        )}
        <Button
          onClick={() => handleSingIn()}
          variant='outlined'
          sx={{ width: 250, height: 50, mx: 'auto' }}>
          Sign in
        </Button>
        <Box sx={{ mx: 'auto', my: 2 }}>
          <RouterLink style={{ color: '#1976d2' }} to='/signup'>
            {'Sign up'}
          </RouterLink>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
