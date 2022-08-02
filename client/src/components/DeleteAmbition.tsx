import { useEffect, useState } from "react";
import { Button, TextInput, Modal, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { DELETE_AMBITION } from "../utils/mutations";
import { USER } from "../utils/queries";

export default function DeleteAmbition() {

    const state: any = useSelector(state  => state)

    const [deleteAmbition, { error }] = useMutation(DELETE_AMBITION, {
        refetchQueries: [
            {query: USER}, // so that the page re-renders with the new user data
        ]
    });

    const [disableButton, setDisableButton] = useState(true);
    const [identity, setIdentity] = useState(state.ambitions.identity); // default states need to be set
    const [identityConfirm, setIdentityConfirm] = useState(""); // for textinput for deleting the ambition

    const [opened, setOpened] = useState(false); // opens/closes the modal

    useEffect(() => {
        setIdentity(state.ambitions.identity)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])

    useEffect(() => {
        (identityConfirm === identity) ? setDisableButton(false) : setDisableButton(true)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [identityConfirm])


    const handleDeleteSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await deleteAmbition({
                variables: {
                    ambitionId: state.ambitions.ambitionId,
                },
            });
            } catch (error) {
                console.log(error);
            }

            setOpened((o) => (!o))  
    };

    function onClose() {
        setOpened(false);
        setIdentityConfirm(""); // to erase text if the user closes the modal and if they open it again, it will not remember so that it prevents an accidental submit
    }

    return (
        <>
        <Modal
                opened={opened}
                onClose={onClose}
                title="Delete Ambition?"
                >     

            <form onSubmit={handleDeleteSubmit}>
            
            
            <TextInput // end value
                required // requires entry
                label={`To delete ambition, type out your ego inside the quotes to confirm deletion and then submit! I am... "${state.ambitions.identity}"`}
                placeholder="..."
                value={identityConfirm}
                onChange={(event) => setIdentityConfirm(event.target.value)}
                />
    
                <Button mt="md" radius="lg" fullWidth variant="outline" color="red" disabled={disableButton} type="submit">Delete!</Button>
            </form>
            </Modal>

            <Button mt="sm" radius="lg" fullWidth variant="outline" color="orange" onClick={() => setOpened(true)}>Delete Ambition!</Button>
        </>
    );
}