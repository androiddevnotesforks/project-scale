import { useState, useEffect } from "react";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core"
import { useSelector } from "react-redux";
import { ADD_EVENT as ADD_EVENT_MUTATION } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function AddEvent() {
    
    const [addEvent, { error }] = useMutation(ADD_EVENT_MUTATION);

    const state: any = useSelector(state => state)

    const [opened, setOpened] = useState(false);

    const [dataInputVal, setDataInputVal] = useState(""); // value
    const [notesVal, setNotesVal] = useState(""); // value
    const [confirmData, setConfirmData] = useState("");
    const [dataInputErr, setDataInputErr] = useState("");
    const [notesErr, setNotesErr] = useState("");

    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        Number(dataInputVal) ? setDataInputErr("") : setDataInputErr("Your data input must be numbers only, e.g. 88.8");
        (Number(dataInputVal) === Number(confirmData)) ? setDisableButton(false) : setDisableButton(true);
        
        notesVal.length < 256 ? setNotesErr("") : setNotesErr("You cannot type more than 255 characters.");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notesVal, dataInputVal, confirmData])
    
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        
        // doing the dispatch below overcomplicated the process and caused issues, it was only necessary to dispatch the ambitions ID and that's it for this whole process
        // dispatch(ADD_EVENT({ dataInput: form.values.dataInput, notes: form.values.notes, }))
        
        try {
            const { data } = await addEvent({
                variables: {
                    ambitionId: state.ambitions.ambitionId, // gets the Ambition ID that was dispatched when clicking to open up the events modal
                    dataInput: Number(dataInputVal), // needs number not string due to model type
                    notes: notesVal, 
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
            title="Add an event"
        >
                <form onSubmit={handleFormSubmit}>

                <TextInput // datainput
                    required // requires entry
                    label="Input data"
                    placeholder="..."
                    value={dataInputVal}
                    onChange={(event) => setDataInputVal(event.target.value)}
                    error={dataInputErr}
                />

                <TextInput // datainput
                    required // requires entry
                    label="Confirm data input."
                    placeholder="..."
                    value={confirmData}
                    onChange={(event) => setConfirmData(event.target.value)}
                />

                <Textarea // notes
                    label="Notes"
                    description="(Optional) Write anything of significance that is relevant to your ambition."
                    placeholder="..."
                    value={notesVal}
                    onChange={(event) => setNotesVal(event.target.value)}
                    error={notesErr}
                />

                <Group position="apart" spacing="xl" mt="md">
                    <Button disabled={disableButton} color={"red"} type="submit">Record!</Button>
                </Group>
            </form>
        </Modal>

        <Button radius="lg" variant="gradient" gradient={{ from: 'crimson', to: 'teal' }} fullWidth onClick={() => setOpened(true)}>Create Record</Button>
    </>
    );
};