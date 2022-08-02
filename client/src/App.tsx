import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import { AppShell, Navbar, Header } from '@mantine/core';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Center,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Group,
  Space,
  Stack
} from '@mantine/core';

// import pages here
import Home from "./pages/Home";
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Search from "./pages/Search";

import LoginSignup from './components/LoginSignup';

import Auth from "./utils/auth";
import Records from './pages/Records';
import Settings from './pages/Settings';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light'); // when pressing a specific icon it toggles the light/dark mode
  const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // fixed issue for why the routing wasn't working, source: https://stackoverflow.com/questions/70220413/error-usehref-may-be-used-only-in-the-context-of-a-router-component-it-wor
  return (
    <ApolloProvider client={client}>
      <Router>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
       <MantineProvider theme={{ colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell // the default styles implemented in appShell was overwriting the colorScheme
          navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar p="xl" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 175, lg: 175 }}>
            <Stack align="center" spacing="xl" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
              <Link to="/">
                  <Button radius="lg" onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="gradient" gradient={{ from: 'crimson', to: 'rgba(255, 89, 0, 1)' }}>Home</Button>
              </Link>
              <Link to="/search">
                  <Button radius="lg" onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="gradient" gradient={{ from: 'crimson', to: 'rgba(171, 97, 97, 1)' }}>Search</Button>
              </Link>
            {Auth.loggedIn() ? (
              <Stack align="center" spacing="xl" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
                <Link to="/ego">
                    <Button radius="lg" onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="gradient" gradient={{ from: 'crimson', to: 'rgba(18, 18, 18, 1)' }}>Ego</Button>
                </Link>
                    <Button radius="lg" variant="gradient" gradient={{ from: 'crimson', to: 'rgba(18, 255, 243, 1)' }} onClick={Auth.logout}>Logout</Button>
                <Link to="/settings">
                  <Button radius="lg" onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="gradient" gradient={{ from: 'crimson', to: 'gray' }}>Settings</Button>
                </Link>
                </Stack>
              ) : (
              <LoginSignup />
            )}
            </Stack>
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: "none"}}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="lg"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              {/* <Group position='apart' spacing="xl"> */}
                <Text>Project S.C.A.L.E.</Text>
                <Button radius="xl" color={colorScheme === "dark" ? "yellow" : "blue"} onClick={() => toggleColorScheme()} title="Toggle mode">
                  {colorScheme === "dark" ? "Light" : "Dark"}
                </Button>
              {/* </Group> */}
            </div>
          </Header>
        }
        >
          <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ego" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/records" element={<Records />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
          </div>
        </AppShell>
       </MantineProvider>
       </ColorSchemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
