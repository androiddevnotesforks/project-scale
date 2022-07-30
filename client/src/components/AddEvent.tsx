import React, { useState } from "react";
import { Tabs, Loader, Text, Button, Modal, Group, TextInput, Textarea } from "@mantine/core"
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useSelector } from "react-redux";
import { ADD_EVENT as ADD_EVENT_MUTATION } from "../utils/mutations";
import { useMutation } from "@apollo/client";


export default function AddEvent() {
    
    const [addEvent, { error }] = useMutation(ADD_EVENT_MUTATION);

    const state: any = useSelector(state => state)

    const [opened, setOpened] = useState(false);
    // const [date, setDate] = useState<Date | null>(new Date()); // if useState is not written like this then onChange doesn't work due to how the NPM package works, source: https://mantine.dev/dates/date-picker/

    const [dataInputVal, setDataInputVal] = useState("");
    const [notesVal, setNotesVal] = useState("");
    const [dataInputErr, setDataInputErr] = useState("");
    const [notesErr, setNotesErr] = useState("");
    const [errorCheckOne, setErrorCheckOne] = useState(false);
    const [errorCheckTwo, setErrorCheckTwo] = useState(false);

    const [disableButton, setDisableButton] = useState(true);

    const form = useForm({ // useForm is a Mantine function
        initialValues: { // objects for the fields you are using
            dataInput: "",
            notes: "",
        },
        
        // validate: {
        //     // dataInput: (value) => (!isNaN(Number(value)) ? null : "Your data input must consist of numbers only, e.g. 88.8"),
        //     // dataInput: (value) => (isNaN(Number(value)) ? "Your data input must consist of numbers only, e.g. 88.8"
        //     //                                             : value.length > 9 
        //     //                                             ? "Cannot enter more than 8 numbers and one decimal point."
        //     //                                             : null),
        //     // notes: (value) => (value.length > 255 ? "Cannot enter more than 255 characters" : null )
        // },
    });

    function handleChangeData(event: any) {
        setDataInputVal(event.target.value);

        Number(dataInputVal) ? setDataInputErr("") : setDataInputErr("Your data input must be numbers only, e.g. 88.8");
        Number(dataInputVal) ? setErrorCheckOne(true) : setErrorCheckOne(false);

        errorCheckOne && errorCheckTwo ? setDisableButton(false) : setDisableButton(true);
    }

    function handleChangeNotes(event: any) {
        setNotesVal(event.target.value);

        notesVal.length > 255 ? setNotesErr("You cannot type more than 255 characters.") : setNotesErr("");
        notesVal.length > 255 ? setErrorCheckTwo(false) : setErrorCheckTwo(true);

        errorCheckOne && errorCheckTwo ? setDisableButton(false) : setDisableButton(true);
    }
    
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        
        // doing the dispatch below overcomplicated the process and caused issues, it was only necessary to dispatch the ambitions ID and that's it for this whole process
        // dispatch(ADD_EVENT({ dataInput: form.values.dataInput, notes: form.values.notes, }))
        
        try {
            const { data } = await addEvent({
                variables: {
                    ambitionId: state.ambitions.ambitionId, // gets the Ambition ID that was dispatched when clicking to open up the events modal
                    dataInput: Number(form.values.dataInput), // needs number not string due to model type
                    notes: form.values.notes, 
                },
            });
            } catch (error) {
                console.log(error);              
            }

            setOpened(false) // to close after submit completes
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
                    {...form.getInputProps('dataInput')} // uses email input on submit
                    value={dataInputVal}
                    onChange={handleChangeData}
                    error={dataInputErr}
                />

                <Textarea // notes
                    label="Notes"
                    description="(Optional) Write anything of significance that is relevant to your ambition."
                    placeholder="..."
                    {...form.getInputProps('notes')} // uses email input on submit
                    value={notesVal}
                    onChange={handleChangeNotes}
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