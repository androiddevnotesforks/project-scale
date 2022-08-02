import { useState, useEffect } from 'react';
import { Modal, Button, Group, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function LoginSignup() {

  const [addUser] = useMutation(ADD_USER);
  const [login, { error }] = useMutation(LOGIN);
  
  const [opened, setOpened] = useState(false);
  const [signup, setSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const emailValidation = /\S+@\S+\.\S+/.test(email) // regex from: https://bobbyhadz.com/blog/react-check-if-email-is-valid

  useEffect(() => {
    (username && username.length < 2) ? setUsernameErr("Username must have at least 2 characters.") : setUsernameErr("");
    if (email) {
      (emailValidation) ? setEmailErr("") : setEmailErr("That is not a valid email address.");
    }
    (password && password.length < 8) ? setPasswordErr("Password needs to be at least 8 characters long.") : setPasswordErr("");

    (username.length > 1 && emailValidation && password.length > 7 && password === confirmPassword) ? setDisableButton(false) : setDisableButton(true)

}, [username, email, password, confirmPassword])

    const handleSignUpSubmit = async (event: any) => {
      event.preventDefault();
      
      const mutationResponse = await addUser({
        variables: {
          username: username,
          email: email,
          password: password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    };

    const handleLoginSubmit = async (event: any) => {
      event.preventDefault();
      
      try {
        const mutationResponse = await login({
          variables: { 
            email: email, 
            password: password},
        });
        
        const token = mutationResponse.data.login.token;
        
        Auth.login(token);
      } catch (e) {
        console.log(e);
        setLoginErr("Invalid email and/or password.")
      }
    };

    function onClose() {
      setOpened(false);
      setUsername(""); // clears form fields
      setEmail(""); // clears form fields
      setPassword(""); // clears form fields
      setConfirmPassword(""); // clears form fields
    }

  return (
    <>
    {signup === false ? (
        <Modal
        opened={opened}
        onClose={onClose}
        title="Login"
      >

        <form onSubmit={handleLoginSubmit}>
        <TextInput // email field
            required // requires entry
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={loginErr}
            />

        <PasswordInput // password field
            required
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={loginErr}
          />

        <Group position="apart" spacing="xl" mt="md">
          <Button variant='outline' color={"teal"} type="submit">Login</Button>
          <Button variant='outline' color={"orange"} radius="lg" onClick={() => setSignup(true)}>Click here to signup</Button>
        </Group>
      </form>
      </Modal>
    ) : (
        <Modal
        opened={opened}
        onClose={onClose}
        title="Signup!"
      >
        <form onSubmit={handleSignUpSubmit}>
        <TextInput //username field
            required // requires entry
            label="Username"
            placeholder="Your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            error={usernameErr}
        />

        <TextInput // email field
            required // requires entry
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailErr}
            />

        <PasswordInput // password field
            required
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordErr}
          />

        <PasswordInput // password field
            required
            label="Confirm password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

        <Group position="apart" spacing="xl" mt="md">
          <Button disabled={disableButton} variant='outline' color="teal" type="submit">Signup</Button>
          <Button variant='outline' color="orange" radius="lg" onClick={() => setSignup(false)}>Click here to login</Button>
        </Group>
      </form>
      </Modal>
    )}
      
      <Button radius="lg" fullWidth variant="outline" color="cyan" onClick={() => setOpened(true)}>Login/Signup</Button>
    </>
  );
}
