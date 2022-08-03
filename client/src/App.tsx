import React, { useEffect, useState } from 'react';
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

import { Settings as SettingsIcon, Logout, Search as SearchIcon, UserCircle, Butterfly, Moon, Sun } from 'tabler-icons-react';

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
       <MantineProvider 
       theme={{ colorScheme: colorScheme}} 
      //  theme={{ colorScheme: colorScheme }} 
       withGlobalStyles withNormalizeCSS>
        <AppShell // the default styles implemented in appShell was overwriting the colorScheme
          styles={(theme) => ({main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1] },})}
          navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1] })} p="xl" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 175, lg: 175 }}>
            <Stack spacing="xl">
              <Link to="/">
                  <Button leftIcon={<Butterfly size={24} strokeWidth={2} color={'#40bfb2'}/>} radius="lg" fullWidth onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="outline" color="cyan">Home</Button>
              </Link>
              <Link to="/search">
                  <Button leftIcon={<SearchIcon size={24} strokeWidth={2} color={'#40bfb2'} />} radius="lg" fullWidth onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="outline" color="cyan">Search</Button>
              </Link>
            {Auth.loggedIn() ? (
              <Stack spacing="xl" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1] })}>
                <Link to="/ego">
                    <Button leftIcon={<UserCircle size={24} strokeWidth={2} color={'#40bfb2'}/>} radius="lg" fullWidth onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="outline" color="cyan">Ego</Button>
                </Link>
                    <Button leftIcon={<Logout size={24} strokeWidth={2} color={'#40bfb2'} />} radius="lg" fullWidth variant="outline" color="cyan" onClick={Auth.logout}>Logout</Button>
                <Link to="/settings">
                  <Button leftIcon={<SettingsIcon size={24} strokeWidth={2} color={'#40bfb2'} />} radius="lg" fullWidth onClick={() => (opened === true) ? setOpened((o) => !o) : null} variant="outline" color="cyan">Settings</Button>
                </Link>
                </Stack>
              ) : (
              <LoginSignup />
            )}
            </Stack>
          </Navbar>
        }
        header={
          <Header sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1] })} height={70} p="md">
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
                <Text>Project S.C.A.L.E.</Text>
                <Button leftIcon={(colorScheme === 'dark') 
                                  ? <Sun size={24} strokeWidth={2} color={'yellow'} /> 
                                  : <Moon size={24} strokeWidth={2} color={'#40bfb2'} />} 
                                    radius="xl" variant='outline' color={colorScheme === "dark" ? "yellow" : "blue"} onClick={() => toggleColorScheme()} title="Toggle mode">
                  {colorScheme === "dark" ? "Light" : "Dark"}
                </Button>
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
