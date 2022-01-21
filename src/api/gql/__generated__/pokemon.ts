/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pokemon
// ====================================================

export interface pokemon_pokemon_abilities_ability {
  __typename: "BaseName";
  name: string | null;
}

export interface pokemon_pokemon_abilities {
  __typename: "Ability";
  ability: pokemon_pokemon_abilities_ability | null;
}

export interface pokemon_pokemon_forms {
  __typename: "BaseName";
  name: string | null;
}

export interface pokemon_pokemon_sprites {
  __typename: "Sprite";
  front_default: string | null;
  back_default: string | null;
}

export interface pokemon_pokemon_moves_move {
  __typename: "BaseName";
  name: string | null;
}

export interface pokemon_pokemon_moves {
  __typename: "Move";
  move: pokemon_pokemon_moves_move | null;
}

export interface pokemon_pokemon_types_type {
  __typename: "BaseName";
  name: string | null;
}

export interface pokemon_pokemon_types {
  __typename: "Type";
  type: pokemon_pokemon_types_type | null;
}

export interface pokemon_pokemon {
  __typename: "Pokemon";
  id: number | null;
  name: string | null;
  weight: number | null;
  height: number | null;
  order: number | null;
  abilities: (pokemon_pokemon_abilities | null)[] | null;
  forms: (pokemon_pokemon_forms | null)[] | null;
  sprites: pokemon_pokemon_sprites | null;
  moves: (pokemon_pokemon_moves | null)[] | null;
  types: (pokemon_pokemon_types | null)[] | null;
}

export interface pokemon {
  pokemon: pokemon_pokemon | null;
}

export interface pokemonVariables {
  name: string;
}
