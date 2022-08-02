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
    const [endValue, setEndValue] = useState(""); // for textinput for deleting the ambition

    const [opened, setOpened] = useState(false); // opens/closes the modal

    useEffect(() => {
        setIdentity(state.ambitions.identity)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])

    useEffect(() => {
        (endValue === identity) ? setDisableButton(false) : setDisableButton(true)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endValue])


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

    return (
        <>
        <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Delete Ambition?"
                >     

            <form onSubmit={handleDeleteSubmit}>
            
            
            <TextInput // end value
                required // requires entry
                label={`To delete ambition, type out your ego inside the quotes to confirm deletion and then submit! I am... "${state.ambitions.identity}"`}
                placeholder="..."
                value={endValue}
                onChange={(event) => setEndValue(event.target.value)}
                />
    
                <Button radius="lg" disabled={disableButton} color={"red"} type="submit">Delete!</Button>
            </form>
            </Modal>

            <Button mt="sm" radius="lg" fullWidth variant="outline" color="orange" onClick={() => setOpened(true)}>Delete Ambition!</Button>
        </>
    );
}