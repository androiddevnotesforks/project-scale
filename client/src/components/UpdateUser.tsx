import { useEffect, useState } from "react";
import { Button, TextInput, PasswordInput, Loader, Modal, Group } from "@mantine/core";
import { USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

export default function UpdateUser() {

    const { loading, data } = useQuery(USER, {
        fetchPolicy: "cache-and-network"
    });

    const userData = data?.user || [];

    const [updateUser, { error }] = useMutation(UPDATE_USER);

    // console.log(userData);
    
    const [username, setUsername] = useState(userData.username); // default states need to be set
    const [email, setEmail] = useState(userData.email); // how they are going to get there
    const [usernameErr, setUsernameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");

    const [opened, setOpened] = useState(false);

    const emailValidation = /\S+@\S+\.\S+/.test(email) // regex from: https://bobbyhadz.com/blog/react-check-if-email-is-valid
    
    useEffect(() => {
        setUsername(userData.username);
        setEmail(userData.email);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])
    
    useEffect(() => {
        (username.length < 2) ? setUsernameErr("Username must have at least 2 characters.") : setUsernameErr("");
        (emailValidation) ? setEmailErr("") : setEmailErr("That is not a valid email address.");

    }, [username, email])

    const handleUserSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await updateUser({
                variables: {
                    username: username,
                    email: email,
                },
            });
            } catch (error) {
                console.log(error);
            }
    };

    return (
        <>
            {loading ? (
                <Loader color="red" size="xl" />
            ) : (

                <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Update User"
              >
                <form onSubmit={handleUserSubmit}>
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
    
                  <Button mt="md" fullWidth variant="outline" color={"teal"} type="submit">Update!</Button>
              </form>
              </Modal>
            )}

            <Button radius="lg" variant="outline" color="red" onClick={() => setOpened(true)}>Update User</Button>
            </>
        );
}
