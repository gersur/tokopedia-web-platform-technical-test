import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import React from 'react';

import { pokemons_pokemons_results } from '@/api';
import PageLayout from '@/components/PageLayout';
import PokemonCard from '@/components/PokemonCard';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { myPokemonSlice } from '@/store';

const MyPokemon: React.FC = () => {
  const [dialogReleaseConfirmation, setDialogReleaseConfirmation] =
    React.useState(false);
  const [releaseNickname, setReleaseNickname] = React.useState('');

  const myPokemonList = useAppSelector(
    (state) => state.myPokemonSlice.myPokemonList
  );
  const dispatch = useAppDispatch();

  return (
    <PageLayout title="My Pokemon">
      <Grid container spacing={2} marginBottom={1}>
        {myPokemonList.length == 0 && (
          <Grid item xs={12}>
            <h3 style={{ textAlign: 'center' }}>
              You don't have any pokemon yet.
            </h3>
            <p style={{ textAlign: 'center' }}>Go catch some pokemons!</p>
          </Grid>
        )}
        {myPokemonList.length != 0 &&
          myPokemonList.map((myPokemon) => {
            const pokemon: pokemons_pokemons_results = {
              __typename: 'PokemonItem',
              id: myPokemon.idPokemon,
              name: myPokemon.pokemonName,
              artwork: myPokemon.backSprite,
              image: myPokemon.frontSprite,
            };

            return (
              <Grid
                item
                key={myPokemon.nickName}
                xs={12}
                sm={4}
                md={3}
                lg={2}
                xl={2}
              >
                <PokemonCard
                  key={myPokemon.nickName}
                  data={pokemon}
                  nickname={myPokemon.nickName}
                  onReleaseClick={(nickname) => {
                    setDialogReleaseConfirmation(true);
                    setReleaseNickname(nickname);
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
      <Dialog
        open={dialogReleaseConfirmation}
        onClose={() => setDialogReleaseConfirmation(false)}
      >
        <DialogTitle>Release Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to relase this Pokemon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogReleaseConfirmation(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(myPokemonSlice.actions.removeMyPokemon(releaseNickname));
              setDialogReleaseConfirmation(false);
            }}
          >
            Release
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default MyPokemon;
