import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  styled,
  SvgIcon,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { GET_POKEMON, pokemon, pokemonVariables } from '@/api';
import PageLayout from '@/components/PageLayout';
import { useAppDispatch } from '@/hooks';
import { addMyPokemon } from '@/store';
import { capitalizeFirstLetter, kebabCaseToTitle } from '@/utility';

import NotFoundPage from './NotFoundPage';

const title = 'Pokemon Detail';

const ChipListItem = styled('li')(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
}));

const PokemonDetail: React.FC = () => {
  const pokemonName = (useParams().pokemonName ?? '').trim().toLowerCase();
  const pokemonNameValid = !(pokemonName.length == 0);

  const dispatch = useAppDispatch();

  const [imageToggle, setImageToggle] = useState(false);
  const [catchLoading, setCatchLoading] = React.useState(false);
  const [dialogSuccess, setDialogSuccess] = React.useState(false);
  const [dialogFail, setDialogFail] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  const closeDialog = () => {
    setDialogSuccess(false);
    setDialogFail(false);
    setNickname('');
  };

  const { loading, error, data } = useQuery<pokemon, pokemonVariables>(
    GET_POKEMON,
    {
      variables: {
        name: pokemonName,
      },
    }
  );

  if (!pokemonNameValid) {
    return <NotFoundPage />;
  }
  if (loading) return <PageLayout title={title}></PageLayout>;
  if (error) {
    console.error(error);
    return <PageLayout title={title}>Error! {error.message}</PageLayout>;
  }

  const pokemon = data!.pokemon!;

  return (
    <PageLayout title={title}>
      <Paper>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={3} sx={{ padding: 2 }}>
            <h2 style={{ marginLeft: 32 }}>
              {capitalizeFirstLetter(pokemon.name ?? '')}
            </h2>
            <CardActionArea
              onClick={() => {
                setImageToggle((x) => !x);
              }}
            >
              <CardMedia
                component="img"
                image={
                  imageToggle
                    ? pokemon.sprites?.back_default ?? ''
                    : pokemon.sprites?.front_default ?? ''
                }
                alt={data?.pokemon?.name ?? ''}
                sx={{
                  maxWidth: 200,
                  margin: 'auto',
                }}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={5} alignSelf="center" sx={{ padding: 2 }}>
            <Card>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SvgIcon>
                      <Icon icon="mdi:human-male-height" />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={((pokemon.height ?? 1) / 10).toFixed(1) + ' m'}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SvgIcon>
                      <Icon icon="mdi:weight" />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={((pokemon.weight ?? 1) / 10).toFixed(1) + ' kg'}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>Type</ListItemIcon>
                  <ListItemText
                    primary={
                      <ul
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          listStyle: 'none',
                          paddingLeft: 0,
                          margin: 0,
                        }}
                      >
                        {pokemon.types?.map((x) => (
                          <ChipListItem key={x!.type!.name!}>
                            <Chip
                              label={capitalizeFirstLetter(x!.type!.name!)}
                              variant="outlined"
                              size="small"
                            />
                          </ChipListItem>
                        ))}
                      </ul>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>Ability</ListItemIcon>
                  <ListItemText
                    primary={
                      <ul
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          listStyle: 'none',
                          paddingLeft: 0,
                          margin: 0,
                        }}
                      >
                        {pokemon.abilities?.map((x) => (
                          <ChipListItem key={x!.ability!.name!}>
                            <Chip
                              label={capitalizeFirstLetter(x!.ability!.name!)}
                              variant="outlined"
                              size="small"
                            />
                          </ChipListItem>
                        ))}
                      </ul>
                    }
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ padding: 2 }}>
            <h4 style={{ marginLeft: 16 }}>Moves</h4>
            <Paper>
              <List
                sx={{
                  width: '100%',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}
              >
                {pokemon.moves?.map((x) => (
                  <ListItem key={x!.move!.name!}>
                    <ListItemText primary={kebabCaseToTitle(x!.move!.name!)} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        <Grid item>
          <LoadingButton
            endIcon={
              <SvgIcon>
                <Icon icon="iconoir:drag-hand-gesture" width={24} />
              </SvgIcon>
            }
            loading={catchLoading}
            loadingPosition="end"
            variant="contained"
            onClick={() => {
              setErrorMessage('');
              setCatchLoading(true);
              const success = Math.random() < 0.5;
              setTimeout(() => {
                setCatchLoading(false);
                if (success) {
                  setDialogSuccess(true);
                } else {
                  setDialogFail(true);
                }
              }, 1000);
            }}
          >
            Catch Pokemon
          </LoadingButton>
        </Grid>
      </Grid>

      <Dialog open={dialogSuccess} fullWidth>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const nicknameTemp = nickname.trim();
            if (nicknameTemp.length == 0) {
              setNickname('');
              return setErrorMessage('Nickname cannot be empty');
            }

            try {
              dispatch(
                addMyPokemon({
                  backSprite: pokemon.sprites!.back_default!,
                  frontSprite: pokemon.sprites!.front_default!,
                  idPokemon: pokemon.id!,
                  nickName: nicknameTemp,
                  pokemonName: pokemon.name!,
                })
              );
            } catch (err) {
              if (typeof err === 'string') {
                setErrorMessage(err);
              } else if (err instanceof Error) {
                setErrorMessage(err.message);
              }

              return;
            }
            setSnackbarMessage(
              `${nickname} (${capitalizeFirstLetter(
                pokemon.name!
              )}) is in the bag!`
            );
            setSnackbarOpen(true);

            closeDialog();
          }}
        >
          <DialogTitle>GOTCHA!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {errorMessage != '' && (
                <Alert
                  severity="error"
                  sx={{
                    m: 2,
                  }}
                >
                  {errorMessage}
                </Alert>
              )}
              <img
                src={pokemon.sprites!.front_default!}
                alt={data?.pokemon?.name ?? ''}
                style={{
                  width: 200,
                  margin: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
              <p>
                <b>{capitalizeFirstLetter(pokemon.name!)}</b> was caught!
              </p>
              <TextField
                required
                fullWidth
                label="Nickname"
                helperText="Give some nickname to keep"
                onInput={(e) => setNickname((e.target as any).value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={dialogFail} onClose={closeDialog}>
        <DialogTitle>Failed...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img
              src={pokemon.sprites!.back_default!}
              alt={data?.pokemon?.name ?? ''}
              style={{
                width: 200,
                margin: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
            <p>
              Oh no! The wild <b>{capitalizeFirstLetter(pokemon.name!)}</b>{' '}
              fled.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>OK</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </PageLayout>
  );
};

export default PokemonDetail;
