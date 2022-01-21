/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pokemons
// ====================================================

export interface pokemons_pokemons_results {
  __typename: "PokemonItem";
  id: number | null;
  name: string | null;
  image: string | null;
  artwork: string | null;
}

export interface pokemons_pokemons {
  __typename: "PokemonList";
  count: number | null;
  nextOffset: number | null;
  status: boolean | null;
  message: string | null;
  results: (pokemons_pokemons_results | null)[] | null;
}

export interface pokemons {
  pokemons: pokemons_pokemons | null;
}

export interface pokemonsVariables {
  limit?: number | null;
  offset?: number | null;
}
