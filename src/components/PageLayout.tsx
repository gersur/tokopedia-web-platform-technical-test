import { Icon } from '@iconify/react';
import {
  AppBar,
  Button,
  Container,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/resources';

interface PageLayoutProps {
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          <div style={{ flex: 1 }}></div>
          <Button color="inherit" component={Link} to={ROUTES.POKEMON_LIST}>
            <SvgIcon>
              <Icon icon="mdi:format-list-bulleted" />
            </SvgIcon>
            &nbsp;Pokemon List
          </Button>
          <Button color="inherit" component={Link} to={ROUTES.MY_POKEMON}>
            <SvgIcon>
              <Icon icon="ic:baseline-catching-pokemon" inline={true} />
            </SvgIcon>
            &nbsp;My Pokemon
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 10, pb: 2 }}>
        {children}
      </Container>
    </React.Fragment>
  );
};

export default PageLayout;
