import { useEffect, useState } from "react";
import { Button, TextInput, PasswordInput, Loader, Modal, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CHANGE_PASSWORD } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";


export default function ChangePassword() {

    const [changePassword, { error }] = useMutation(CHANGE_PASSWORD);

    const [opened, setOpened] = useState(false);

    const form = useForm({ // useForm is a Mantine function
        initialValues: { // objects for the fields you are using
            password: '',
            confirmPassword: '',
        },
    
        validate: { // validate function that occurs on Submit.
            password: (value) => (value.length < 8 ? 'Password must contain at least 8 characters.' : null),
            confirmPassword: (value, values) => value !== values.password ? "Confirm password did not match password." : null, 
        },
      });

    const handlePasswordSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            // const { data } = await changePassword({
                await changePassword({
                variables: {
                    password: form.values.password,
                },
            });
            } catch (error) {
                console.log(error);
            }

            // Auth.logout(); 
    };

    return (
        <>
                <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Change Password"
              >
                <form onSubmit={handlePasswordSubmit}>

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
                  <Button color={"teal"} type="submit">Change!</Button>
                </Group>
              </form>
              </Modal>

                <Group position="center" style={{padding: "1em"}}>
                    <Button radius="lg" variant="gradient" gradient={{ from: 'blue', to: 'orange' }} onClick={() => setOpened(true)}>Change Password</Button>
                </Group>
            </>
        );
}
