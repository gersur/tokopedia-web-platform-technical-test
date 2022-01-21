import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  GET_POKEMONS,
  pokemons,
  pokemons_pokemons_results,
  pokemonsVariables,
} from '@/api';
import PageLayout from '@/components/PageLayout';
import PokemonCard from '@/components/PokemonCard';

const title = 'Pokemon List';
const limit = 25;

const PokemonList: React.FC = () => {
  const [dataPokemons, setDataPokemons] = useState<pokemons_pokemons_results[]>(
    []
  );
  const [nextOffset, setNextOffset] = useState<number>(limit + 1);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const { loading, error, data, fetchMore } = useQuery<
    pokemons,
    pokemonsVariables
  >(GET_POKEMONS, {
    variables: {
      limit: limit,
    },
  });

  useEffect(() => {
    if (!data?.pokemons?.results) {
      return;
    }

    const dataNotNull: pokemons_pokemons_results[] = [];
    const arrImageArtworkToggles: boolean[] = [];
    data.pokemons.results.forEach((item) => {
      if (item != null) {
        dataNotNull.push(item);
        arrImageArtworkToggles.push(false);
      }
    });

    setDataPokemons((x) => [...x, ...dataNotNull]);
  }, [data, fetchMore]);

  if (loading) return <PageLayout title={title}></PageLayout>;
  if (error) {
    console.error(error);
    return <PageLayout title={title}>Error! {error.message}</PageLayout>;
  }

  const isListEnd =
    data?.pokemons?.count ?? 0 + limit >= (data?.pokemons?.nextOffset ?? 1);

  return (
    <PageLayout title={title}>
      <Grid container spacing={2} marginBottom={1}>
        {dataPokemons.map((element) => {
          if (!element) return;

          return (
            <Grid item key={element.id} xs={12} sm={4} md={3} lg={2} xl={2}>
              <PokemonCard data={element} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container justifyContent={'center'}>
        <Grid item>
          {isListEnd ? (
            <LoadingButton
              onClick={() => {
                setLoadingUpdate(true);
                fetchMore({
                  variables: {
                    limit: limit,
                    offset: nextOffset,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    setLoadingUpdate(false);
                    if (!fetchMoreResult) {
                      return previousResult;
                    }

                    setNextOffset(fetchMoreResult!.pokemons!.nextOffset!);

                    return {
                      ...fetchMoreResult,
                      ...{
                        pokemons: {
                          ...fetchMoreResult.pokemons!,
                          ...{
                            pokemons: {
                              result: [
                                ...previousResult.pokemons!.results!,
                                ...fetchMoreResult!.pokemons!.results!,
                              ],
                            },
                          },
                        },
                      },
                    };
                  },
                });
              }}
              endIcon={
                <SvgIcon>
                  <Icon icon="mdi:arrow-down" />
                </SvgIcon>
              }
              loading={loadingUpdate}
              loadingPosition="end"
              variant="contained"
            >
              Load More
            </LoadingButton>
          ) : (
            'HABIS'
          )}
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default PokemonList;
