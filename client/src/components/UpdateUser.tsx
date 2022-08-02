import { useEffect, useState } from "react";
import { Button, TextInput, PasswordInput, Loader, Modal, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ; // regex taken from 16-Stu_React-Forms utils/helpers.js

export default function UpdateUser() {
    
    const { loading, data } = useQuery(USER, {
        fetchPolicy: "cache-and-network"
    });

    const userData = data?.user || [];

    const [updateUser, { error }] = useMutation(UPDATE_USER);

    // console.log(userData);
    
    const [username, setUsername] = useState(userData.username); // default states need to be set
    const [email, setEmail] = useState(userData.email); // how they are going to get there
    // const [password, setPassword] = useState(""); // where they want to be

    const [opened, setOpened] = useState(false);

    const form = useForm({ // useForm is a Mantine function
        initialValues: { // objects for the fields you are using
            username: '',
            email: '',
            // password: '',
            // confirmPassword: '',
        },
    
        validate: { // validate function that occurs on Submit.
            username: (value) => (value.length < 2 ? 'Username must have at least 2 letters.' : null),
            email: (value) => (emailValidation.test(value) ? null : 'Invalid email'),
            // password: (value) => (value.length < 8 ? 'Password must contain at least 8 characters.' : null),
            // confirmPassword: (value, values) => value !== values.password ? "Confirm password did not match password." : null, 
        },
      });
    
    useEffect(() => {
        setUsername(userData.username);
        setEmail(userData.email);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])
    
    // useEffect(() => {
    //     Number(endValue) ? setEndErr("") : setEndErr("Your ending value must be numbers only, e.g. 88.8");
    //     dailyPlan.length > 1000 ? setDailyErr("You cannot type more than 1000 characters.") : setDailyErr("");
    //     dailyPlan.length === 0 ? setDailyErr("You need a daily plan if you are going to achieve something.") : setDailyErr("");

    // }, [endValue, dailyPlan])

    const handleUserSubmit = async (event: any) => {
        event.preventDefault();

        console.log(event);
        console.log("....");
        console.log("userData._id");
        console.log("....");
        
        // console.log(username);
        // console.log(email);
        // // console.log(form.values.password);
        // console.log(userData._id);
        console.log(form.values);
        console.log("what??");
        console.log(form);
        console.log("huh???");
        
        // console.log(event);
        console.log(username);
        console.log(email);
        
        
        
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

            // Auth.logout(); 
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
                <form onSubmit={
                    // () => {
                    // form.onSubmit((values) =>
                    handleUserSubmit
                    // console.log(values)
                    // (values: any, event: any) => {handleUserSubmit(values, event)}
                }>
                <TextInput //username field
                    required // requires entry
                    label="Username"
                    placeholder="Your username"
                    {...form.getInputProps("username")} // uses password input on submit
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
        
                <TextInput // email field
                    required // requires entry
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")} // uses password input on submit
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
        
                {/* <PasswordInput // password field
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
                  /> */}
        
                <Group position="apart" spacing="xl" mt="md">
                  <Button color={"teal"} type="submit">Update!</Button>
                </Group>
              </form>
              </Modal>
            )}

                <Group position="center" style={{padding: "1em"}}>
                    <Button radius="lg" variant="gradient" gradient={{ from: 'lime', to: 'orange' }} onClick={() => setOpened(true)}>Update User</Button>
                </Group>
            </>
        );
}
