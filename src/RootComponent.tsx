import '@/styles/main.scss';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { apolloClient } from './api';
import MyPokemon from './pages/MyPokemon';
import NotFoundPage from './pages/NotFoundPage';
import PokemonDetail from './pages/PokemonDetail';
import PokemonList from './pages/PokemonList';
import { ROUTES } from './resources/routes-constants';

const RootComponent: React.FC = () => {
  const isGHPages = process.env.gh_pages === 'true';

  return (
    <ApolloProvider client={apolloClient}>
      <Router
        basename={isGHPages ? '/tokopedia-web-platform-technical-test' : ''}
      >
        <Routes>
          <Route
            path={ROUTES.HOMEPAGE}
            element={<Navigate to={ROUTES.POKEMON_LIST} replace />}
          />
          <Route path={ROUTES.POKEMON_LIST} element={<PokemonList />} />
          <Route path={ROUTES.MY_POKEMON} element={<MyPokemon />} />
          <Route
            path={ROUTES.POKEMON_DETAIL + '/:pokemonName'}
            element={<PokemonDetail />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default RootComponent;
