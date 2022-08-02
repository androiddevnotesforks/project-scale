import { useEffect, useState } from "react";
import { Button, TextInput, PasswordInput, Modal, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CHANGE_PASSWORD } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function ChangePassword() {

    const [changePassword, { error }] = useMutation(CHANGE_PASSWORD);

    const [opened, setOpened] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
    (password && password.length < 8) ? setPasswordErr("Password needs to be at least 8 characters long.") : setPasswordErr("");

    (password.length > 7 && password === confirmPassword) ? setDisableButton(false) : setDisableButton(true)

    }, [password, confirmPassword])

    const handlePasswordSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await changePassword({
                variables: {
                    password: password,
                },
            });
            } catch (error) {
                console.log(error);
            }
    };

    function onClose() {
      setOpened(false);
      setPassword(""); // clears form fields
      setConfirmPassword(""); // clears form fields
    }

    return (
        <>
                <Modal
                opened={opened}
                onClose={onClose}
                title="Change Password"
              >
                <form onSubmit={handlePasswordSubmit}>

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
        
                  <Button mt="md" disabled={disableButton} variant='outline' fullWidth color={"teal"} type="submit">Change!</Button>
              </form>
              </Modal>

              <Button radius="lg" variant="outline" color="violet" onClick={() => setOpened(true)}>Change Password</Button>
            </>
        );
}
