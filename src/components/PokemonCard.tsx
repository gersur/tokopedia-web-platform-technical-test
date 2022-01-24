import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { pokemons_pokemons_results } from '@/api';
import { useAppSelector } from '@/hooks';
import { ROUTES } from '@/resources';
import { capitalizeFirstLetter } from '@/utility';

interface PokemonCardProps {
  data: pokemons_pokemons_results;
  nickname?: string;
  onReleaseClick?: (nickname: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  data,
  nickname,
  onReleaseClick,
}) => {
  const [imageArtworkToggle, setImageArtworkToggle] = useState(false);
  const myPokemonList = useAppSelector(
    (state) => state.myPokemonSlice.myPokemonList
  );

  const pokemons = myPokemonList.filter((x) => x.pokemonName == data.name!);
  const pokemonCount = pokemons.length;

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          setImageArtworkToggle((x) => !x);
        }}
      >
        <CardMedia
          component="img"
          image={imageArtworkToggle ? data.artwork! : data.image!}
          alt={data.name!}
        />
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {capitalizeFirstLetter(data.name!)}
        </Typography>
        {nickname == undefined && (
          <Typography variant="body2" color="text.secondary">
            Owned: {pokemonCount}
          </Typography>
        )}
        {nickname != undefined && (
          <Typography variant="body2" color="text.secondary">
            {nickname}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={ROUTES.POKEMON_DETAIL + '/' + data.name}
        >
          Detail
        </Button>

        {onReleaseClick != undefined && nickname != undefined && (
          <Button
            size="small"
            color="primary"
            onClick={() => onReleaseClick(nickname)}
          >
            Release
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
