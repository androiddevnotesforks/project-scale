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
  // Footer,
  // Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Tabs,
  Center,
} from '@mantine/core';

// import pages here
import Home from "./pages/Home";
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Search from "./pages/Search";

import LoginSignup from './components/LoginSignup';

import Auth from "./utils/auth";

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

  // fixed issue for why the routing wasn't working, source: https://stackoverflow.com/questions/70220413/error-usehref-may-be-used-only-in-the-context-of-a-router-component-it-wor
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar p="xl" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 175, lg: 175 }}>
            <Center>
              <Tabs color="orange" variant="pills" orientation="vertical" defaultValue="Home">
                <Tabs.List>
                  <Link to="/">
                    <Tabs.Tab value="Home">Home</Tabs.Tab>
                  </Link>
                  <Link to="/profile">
                    <Tabs.Tab value="Profile">Profile</Tabs.Tab>
                  </Link>
                  <Link to="/search">
                    <Tabs.Tab value="search">Search</Tabs.Tab>
                  </Link>
                </Tabs.List>
              </Tabs>
            </Center>
            {Auth.loggedIn() ? (
              // profile button or tab also appears here
              <Button color={"orange"} onClick={Auth.logout}>Logout</Button>
            ) : (
              <LoginSignup />
            )}
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="lg"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text>Project S.C.A.L.E.</Text>
            </div>
          </Header>
        }
        >
          <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route element={<NoMatch />} />
              </Routes>
          </div>
        </AppShell>
      </Router>
    </ApolloProvider>
  );
}

export default App;
