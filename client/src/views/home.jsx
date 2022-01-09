import React, { useState, useEffect, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Panel from '../components/Panel';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { UserContext } from '../contexts';
import { useNavigate } from 'react-router-dom';

function App() {
  const [players, setPlayers] = useState();
  const [colors, setColors] = useState();
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const res = await axios({
        method: 'get',
        url: 'https://us-central1-gamelobby-4f59a.cloudfunctions.net/app/color/',
        headers: {
          authorization: `Bearer ${user.stsTokenManager.accessToken}`,
        },
        params: {
          uid: user.uid,
        },
      });
      setPlayers(res.data.players);
      setColors(res.data.colors);
    })();
  }, [user]);

  function handleLogOut() {
    (async function () {
      try {
        await signOut(auth);
      } catch (err) {
        console.log(err);
      }
      setUser(null);
    })();
  }

  function renderPlayers() {
    const result = [];
    for (const id in players) {
      result.push(
        <Grid key={id} item xs={10} sm={5}>
          <Panel
            key={id}
            sx={{ display: 'flex', justifyContent: 'center' }}
            player={{ ...players[id] }}
            colors={colors}
            setColors={setColors}
            setPlayers={setPlayers}
            players={players}
          />
        </Grid>
      );
    }
    return result;
  }

  return (
    <>
      <CssBaseline />
      <AppBar style={{ background: 'rgba(0, 0, 0, 0.87)' }}>
        <Toolbar color='white'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Game Lobby
          </Typography>
          <Button color='inherit' onClick={() => handleLogOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md'>
        <Grid
          sx={{ mt: 8 }}
          container
          rowSpacing={5}
          columnSpacing={{ xs: 5 }}
          justifyContent='center'>
          {players && colors && renderPlayers()}
        </Grid>
      </Container>
    </>
  );
}

export default App;
