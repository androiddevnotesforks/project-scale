import { useState, useEffect } from "react";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core"
import { useSelector } from "react-redux";
import { ADD_EVENT as ADD_EVENT_MUTATION } from "../utils/mutations";
import { USER } from "../utils/queries";
import { useMutation } from "@apollo/client";

export default function AddEvent() {
    
    const [addEvent, { error }] = useMutation(ADD_EVENT_MUTATION, {
        refetchQueries: [
            {query: USER}, // so that the page re-renders with the new user data
        ]
    });

    const state: any = useSelector(state => state)

    const [opened, setOpened] = useState(false);

    const [dataInputVal, setDataInputVal] = useState(""); // value
    const [notesVal, setNotesVal] = useState(""); // value
    const [confirmData, setConfirmData] = useState("");
    const [dataInputErr, setDataInputErr] = useState("");
    const [notesErr, setNotesErr] = useState("");

    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {

        if (dataInputVal) { // ensures validation isn't fired off on load
        Number(dataInputVal) ? setDataInputErr("") : setDataInputErr("Your data input must be numbers only, e.g. 88.8");
        }
        
        notesVal.length < 256 ? setNotesErr("") : setNotesErr("You cannot type more than 255 characters.");

        (Number(dataInputVal) === Number(confirmData) && notesVal.length < 256) ? setDisableButton(false) : setDisableButton(true);
        
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

                <Button mt="md" fullWidth disabled={disableButton} variant="outline" color={"red"} type="submit">Record!</Button>
            </form>
        </Modal>

        <Button mt="sm" variant="outline" color="grape" fullWidth onClick={() => setOpened(true)}>Create Record</Button>
    </>
    );
};