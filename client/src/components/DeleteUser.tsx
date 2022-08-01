import { useEffect, useState } from "react";
import { Button, TextInput, Modal, Group, Loader } from "@mantine/core";
import { useMutation, useQuery} from "@apollo/client";
import { DELETE_USER } from "../utils/mutations";
import { USERNAME } from "../utils/queries";
import Auth from "../utils/auth";

export default function DeleteUser() {
    const { loading, data } = useQuery(USERNAME, {
        fetchPolicy: "cache-and-network"
    });

    const username = data?.user.username || "ERROR"; // retrieves only the username otherwise gives ERROR if data wasn't retrieved in time for the message.

    const [deleteUser, { error }] = useMutation(DELETE_USER);

    const [disableButton, setDisableButton] = useState(true);
    const [checkUsername, setCheckUsername] = useState(username); 
    const [userConfirm, setUserConfirm] = useState(""); // for textinput for deleting the ambition

    const [opened, setOpened] = useState(false); // opens/closes the modal

    useEffect(() => {
        setCheckUsername(username)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])

    useEffect(() => {
        (userConfirm === checkUsername) ? setDisableButton(false) : setDisableButton(true)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userConfirm])

    const handleDeleteSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await deleteUser();
            } catch (error) {
                console.log(error);
            }
    
            Auth.logout();
    };

    return (
        <>
            {loading ? (
                <Loader color="red" size="xl" />
            ) : (
            <div>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Delete Ambition?"
                    >     

                <form onSubmit={handleDeleteSubmit}>
                
                
                <TextInput // end value
                    required // requires entry
                    label={`You must type out your username to confirm deletion and then submit! I am... "${username}"`}
                    placeholder="..."
                    value={userConfirm}
                    onChange={(event) => setUserConfirm(event.target.value)}
                    />

                    <Button radius="lg" disabled={disableButton} color={"red"} type="submit">Delete!</Button>
                </form>
                </Modal>

                <Group position="center" style={{padding: "1em"}}>
                    <Button radius="lg" variant="gradient" color="crimson" onClick={() => setOpened(true)}>Delete Account!</Button>
                </Group>
            </div>
                )}
        </>
    )
}