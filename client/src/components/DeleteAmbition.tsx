import { useEffect, useState } from "react";
import { Button, TextInput, Modal, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { useMutation} from "@apollo/client";
import { DELETE_AMBITION } from "../utils/mutations";



export default function DeleteAmbition() {

    const state: any = useSelector(state  => state)

    const [deleteAmbition, { error }] = useMutation(DELETE_AMBITION);

    const [disableButton, setDisableButton] = useState(true);
    const [identity, setIdentity] = useState(state.ambitions.identity); // default states need to be set
    const [endValue, setEndValue] = useState(""); // for textinput for deleting the ambition
    // const [endErr, setEndErr] = useState("");


    const [opened, setOpened] = useState(false);

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

            // eslint-disable-next-line no-restricted-globals
            location.reload();     
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
                label={`You must type out your quoted ego to confirm deletion and then submit! I am... "${state.ambitions.identity}"`}
                placeholder="..."
                value={endValue}
                onChange={(event) => setEndValue(event.target.value)}
                />
    
                <Button radius="lg" disabled={disableButton} color={"red"} type="submit">Delete!</Button>
            </form>
            </Modal>

            <Group position="center" style={{padding: "1em"}}>
                    <Button radius="lg" variant="gradient" gradient={{ from: 'crimson', to: 'black' }} onClick={() => setOpened(true)}>Delete Ambition!</Button>
            </Group>
        </>
    );
}