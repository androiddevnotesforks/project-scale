import { useEffect, useState } from "react";
import { Button, Text, Modal } from "@mantine/core";
import { UPDATE_PUBLIC_AMBITION } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

export default function PublicAmbition() {

    const [updatePublicAmbition, { error }] = useMutation(UPDATE_PUBLIC_AMBITION);

    const state: any = useSelector(state => state);

    const [publicStatus] = useState(state.public);
    const [switchMessage, setSwitchMessage] = useState("")

    const [opened, setOpened] = useState(false);
    
    useEffect(() => {
        (state.public) ? setSwitchMessage("Make Abmition not viewable to anyone in Search?") : setSwitchMessage("Make ambition viewable to anyone in Search?")
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])

    const handleStatusSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await updatePublicAmbition({
                variables: {
                    ambitionId: state.ambitionId,
                    public: !publicStatus,
                },
            });
            } catch (error) {
                console.log(error);
            }

            setOpened(false);      
    };

    return (
        <>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Update Ambition Public Status?"
                >     

            <form onSubmit={handleStatusSubmit}>

                <Text size="md">{switchMessage}</Text>
    
                <Button fullWidth mt="md" variant='outline' color={"teal"} type="submit">Yes!</Button>
                <Button fullWidth mt="md" variant='outline' color={"orange"} radius="lg" onClick={() => setOpened(false)}>Go back to update Ambition settings</Button>
            </form>
            </Modal>

            <Button fullWidth mt="md" variant='outline' color={"orange"} radius="lg" onClick={() => setOpened(true)}>Click here to set Ambition Public Status</Button>

            </>
        );
}
