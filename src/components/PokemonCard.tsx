import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';

import { pokemons_pokemons_results } from '@/api';
import { ROUTES } from '@/resources';
import { capitalizeFirstLetter } from '@/utility';

interface PokemonCardProps {
  data: pokemons_pokemons_results;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ data }) => {
  const [imageArtworkToggle, setImageArtworkToggle] = useState(false);

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
        <Typography variant="body2" color="text.secondary">
          Owned: 0
        </Typography>
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
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
