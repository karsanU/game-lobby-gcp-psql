import React, { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UndoIcon from '@mui/icons-material/Undo';
import { UserContext } from '../contexts';
import Box from '@mui/material/Box';
import axios from 'axios';

function Panel({ player, colors, setColors, players, setPlayers }) {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  // get profile pic if there is one
  useEffect(() => {
    if (user) {
      (async function () {
        try {
          const url = await getDownloadURL(
            ref(storage, `profilePics/${user.uid}/${player.id}`)
          );
          setProfile(url);
        } catch (err) {
          console.log(player.id + ' has no profile picture.');
        }
      })();
    }
  }, [player.id, user]);

  // change color
  const pickColorHandler = (color, removePick) => {
    if (user) {
      const colorReq = removePick ? null : color;
      (async function () {
        try {
          await axios({
            method: 'put',
            url: 'https://us-central1-gamelobby-4f59a.cloudfunctions.net/app/color/',
            data: {
              uid: user.uid,
              playerId: player.id,
              newColor: colorReq,
            },
            headers: {
              Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
            },
          });
          players[player.id] = { ...player, color: colorReq };
          setPlayers({ ...players });

          if (removePick) {
            colors.push(color);
            setColors([...colors]);
          } else {
            setColors([...colors.filter((_color) => !(_color === color))]);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  };

  // render the individual color selectors
  const renderColorPickerCircle = (color, removePick) => {
    return (
      <>
        <Box
          key={player.id + color}
          onClick={() => pickColorHandler(color, removePick)}
          component='button'
          sx={{
            padding: 2,
            marginRight: 1,
            bgcolor: color,
            borderRadius: '50%',
            border: 'none',
            '&:hover': {
              opacity: [0.5],
              cursor: 'pointer',
            },
          }}
        />
        {removePick && (
          <UndoIcon
            onClick={() => pickColorHandler(color, removePick)}
            sx={{
              position: 'relative',
              right: 34,
              top: 10,
              color: 'white',
              fontSize: 17,
              '&:hover': {
                opacity: [0.5],
                cursor: 'pointer',
              },
            }}
          />
        )}
      </>
    );
  };

  const handleProfileUpload = (e) => {
    if (e.target.files[0]) {
      let url;
      const file = e.target.files[0];
      try {
        // upload profile pic
        (async function () {
          const profileRef = ref(
            storage,
            `profilePics/${user.uid}/${player.id}`
          );
          await uploadBytes(profileRef, file).then((snapshot) => {
            console.log('Upload success');
          });
          // download it
          url = await getDownloadURL(
            ref(storage, `profilePics/${user.uid}/${player.id}`)
          );
          console.log(url);
          setProfile(url);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 400, m: 'auto' }}>
      <CardContent sx={{ display: 'flex', p: '5px' }}>
        <label htmlFor={`icon-button-file${player.id}`}>
          <input
            onChange={(e) => handleProfileUpload(e)}
            accept='image/*'
            id={`icon-button-file${player.id}`}
            type='file'
            style={{ display: 'none' }}
          />
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'>
            {profile === null ? (
              <AccountCircleIcon sx={{ fontSize: 40, color: '#DCDCDC' }} />
            ) : (
              <Box
                component='img'
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: '50%',
                }}
                alt='The house from the offer.'
                src={profile}
              />
            )}
          </IconButton>
        </label>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ margin: 'auto 0' }}>
          {`Player ${player.id + 1}`}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          minHeight: 250,
          bgcolor: player.color ? player.color : '#DCDCDC',
        }}></CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        {player.color ? (
          <span> Your color is: </span>
        ) : (
          <span> Choose your color: </span>
        )}
        {/* render each color options  */}
        <Box>
          {player.color
            ? renderColorPickerCircle(player.color, true)
            : colors.map((color) => {
                return renderColorPickerCircle(color);
              })}
        </Box>
      </CardActions>
    </Card>
  );
}

export default Panel;
