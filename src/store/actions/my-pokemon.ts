import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MyPokemonList {
  pokemonName: string;
  nickName: string;
  frontSprite: string;
  backSprite: string;
  idPokemon: number;
}

interface MyPokemonState {
  myPokemonList: MyPokemonList[];
}

const initialState: MyPokemonState = {
  myPokemonList: [],
};

export const myPokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addMyPokemon: (state, action: PayloadAction<MyPokemonList>) => {
      const exist = state.myPokemonList.find(
        (x) => x.nickName == action.payload.nickName
      );
      if (exist != undefined) {
        throw new Error('Nickname cannot be same with other nicknames');
      }
      state.myPokemonList.push(action.payload);
    },
    removeMyPokemon: (state, action: PayloadAction<string>) => {
      const index = state.myPokemonList.findIndex(
        (x) => x.nickName == action.payload
      );
      if (index == -1) {
        throw new Error('Nickname cannot be found');
      }
      state.myPokemonList.splice(index, 1);
    },
  },
});

export const { addMyPokemon, removeMyPokemon } = myPokemonSlice.actions;

export default myPokemonSlice.reducer;
