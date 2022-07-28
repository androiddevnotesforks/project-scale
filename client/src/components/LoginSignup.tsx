import { useState } from 'react';
import { Modal, Button, Group, TextInput, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ; // regex taken from 16-Stu_React-Forms utils/helpers.js

export default function LoginSignup() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [opened, setOpened] = useState(false);
  const [signup, setSignup] = useState(false);
    // reusing form code from my react portfolio
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm({ // useForm is a Mantine function
    initialValues: { // objects for the fields you are using
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    },

    validate: { // validate function that occurs on Submit.
        username: (value) => (value.length < 2 ? 'Username must have at least 2 letters.' : null),
        email: (value) => (emailValidation.test(value) ? null : 'Invalid email'),
        password: (value) => (value.length < 8 ? 'Password must contain at least 8 characters.' : null),
        confirmPassword: (value, values) => value !== values.password ? "Confirm password did not match password." : null, 
    },
  });

  const login = useForm({ // useForm is a Mantine function
    initialValues: { // objects for the fields you are using
        email: '',
        password: '',
    },

    validate: { // validate function that occurs on Submit.
        email: (value) => (emailValidation.test(value) ? null : 'Invalid email'),
        password: (value) => (value.length < 8 ? 'Password must contain at least 8 characters.' : null),
    },
  });

    

  return (
    <>
    {signup === false ? (
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Login"
      >
        <form onSubmit={login.onSubmit((values) => console.log(values))}>
        <TextInput // email field
            required // requires entry
            label="Email"
            placeholder="your@email.com"
            {...login.getInputProps('email')} // uses email input on submit
            />

        <PasswordInput // password field
            required
            label="Password"
            placeholder="Enter Password"
            {...login.getInputProps("password")} // uses password input on submit
          />

        <Group position="apart" spacing="xl" mt="md">
          <Button color={"teal"} type="submit">Login</Button>
          <Button color={"orange"} radius="lg" onClick={() => setSignup(true)}>Click here to signup</Button>
        </Group>
      </form>
      </Modal>
    ) : (
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Signup!"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput //username field
            required // requires entry
            label="Username"
            placeholder="Your username"
            {...form.getInputProps('name')} // uses username input on submit
        />

        <TextInput // email field
            required // requires entry
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')} // uses email input on submit
            />

        <PasswordInput // password field
            required
            label="Password"
            placeholder="Enter Password"
            {...form.getInputProps("password")} // uses password input on submit
          />

        <PasswordInput // password field
            required
            label="Confirm password"
            placeholder="Confirm Password"
            {...form.getInputProps("confirmPassword")} // uses password input on submit
          />

        <Group position="apart" spacing="xl" mt="md">
          <Button color={"teal"} type="submit">Signup</Button>
          <Button color={"orange"} radius="lg" onClick={() => setSignup(false)}>Click here to login</Button>
        </Group>
      </form>
      </Modal>
    )}
      

      <Group position="center" style={{padding: "1em"}}>
        <Button radius="lg" variant="gradient" gradient={{ from: 'teal', to: 'red' }} onClick={() => setOpened(true)}>Login/Signup</Button>
      </Group>
    </>
  );
}
