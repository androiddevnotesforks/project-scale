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

    const [disableButton, setDisableButton] = useState(false);

    const form = useForm({ // useForm is a Mantine function
        initialValues: { // objects for the fields you are using
            dataInput: "",
            notes: "",
        },
        
        validate: {
            // dataInput: (value) => (!isNaN(Number(value)) ? null : "Your data input must consist of numbers only, e.g. 88.8"),
            dataInput: (value) => (isNaN(Number(value)) ? "Your data input must consist of numbers only, e.g. 88.8"
                                                        : value.length > 9 
                                                        ? "Cannot enter more than 8 numbers and one decimal point."
                                                        : null),
            notes: (value) => (value.length > 255 ? "Cannot enter more than 255 characters" : null )
        },
    });
    
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        setDisableButton(true) // to prevent submit spamming
        
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
                />

                <Textarea // notes
                    label="Notes"
                    description="(Optional) Write anything of significance that is relevant to your ambition."
                    placeholder="..."
                    {...form.getInputProps('notes')} // uses email input on submit
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