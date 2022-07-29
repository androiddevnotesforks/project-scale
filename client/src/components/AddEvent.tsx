import React, { useState } from "react";
import { Tabs, Loader, Text, Button, Modal, Group, TextInput, Textarea } from "@mantine/core"
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';


export default function AddEvent() {

    const [opened, setOpened] = useState(false);
    // const [date, setDate] = useState<Date | null>(new Date()); // if useState is not written like this then onChange doesn't work due to how the NPM package works, source: https://mantine.dev/dates/date-picker/

    // console.log(date);

    const form = useForm({ // useForm is a Mantine function
        initialValues: { // objects for the fields you are using
            createdAt: "",
            dataInput: "",
            notes: "",
        },
        
        validate: {
            dataInput: (value) => (!isNaN(Number(value)) ? null : "Your data input must consist of numbers only, e.g. 88.8"),
        }
      });
  
    return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Add an event"
        >
            <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
                {/* <form onSubmit={handleLoginSubmit}> */}

                {/* <DatePicker placeholder="Pick date" label="Event date" required 
                {...form.getInputProps('createdAt')}
                value={date} 
                onChange={setDate} /> */}

                <TextInput // datainput
                    required // requires entry
                    label="Input data"
                    placeholder="..."
                    {...form.getInputProps('dataInput')} // uses email input on submit
                />

                <Textarea // notes
                    label="Notes"
                    description="Write anything of significance that is relevant to your ambition."
                    placeholder="..."
                    {...form.getInputProps('notes')} // uses email input on submit
                />

                <Group position="apart" spacing="xl" mt="md">
                  <Button color={"red"} type="submit">Record!</Button>
                </Group>
            </form>
        </Modal>

        <Button radius="lg" variant="gradient" gradient={{ from: 'crimson', to: 'teal' }} fullWidth onClick={() => setOpened(true)}>Create Record</Button>
    </>
    );
};