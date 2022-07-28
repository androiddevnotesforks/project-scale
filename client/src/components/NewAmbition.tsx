import { useState } from "react";
import { Button, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NewAmbition() {

    const [identity, setIdentity] = useState("Determined"); // default states need to be set
    const [ambition, setAmbition] = useState("Lose Weight"); // default states need to be set
    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");

    const form = useForm({
        initialValues: {
            startValue: startValue,
            endValue: endValue,
            identity: identity,
            ambition: ambition,
        },

        validate: {
            startValue: (value) => (!isNaN(Number(value)) ? null : "Your starting value must be numbers only, e.g. 88.8"),
            endValue: (value) => (!isNaN(Number(value)) ? null : "Your ending value must be numbers only, e.g. 88.8"),
        }
    });
    
    
    return (
    <>

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
        
        <NativeSelect
            label="Choose your identity:"
            description="I am..."
            data={["Determined", "Inspired"]}
            required
            {...form.getInputProps('identity')}
            onChange={(event) => setIdentity(event.target.value)}
            value={identity}
        />

        <NativeSelect
            label="Choose your ambition!"
            description="I am going to..."
            data={["Lose Weight", "Save Money"]}
            required
            {...form.getInputProps('ambition')}
            onChange={(event) => setAmbition(event.target.value)}
            value={ambition}
        />

        <TextInput // start value
            required // requires entry
            label={ ambition === "Save Money" ? ("How much money haved you saved up right now? e.g. Enter $50.21 as 50.21") : ("What is your starting weight? e.g. Enter 88.8kg as 88.8")}
            placeholder="Example: 50.21"
            {...form.getInputProps('startValue')} // text input
            value={startValue}
            onChange={(event) => setStartValue(event.target.value)}
        />

        <TextInput // end value
            required // requires entry
            label={ ambition === "Save Money" ? ("How much money do you want to save? e.g. Enter $5000.21 as 5000.21") : ("How much do you want to weigh? e.g. Enter 68.8kg as 68.8")}
            placeholder="Example: 5000.21"
            {...form.getInputProps('endValue')} // uses text input on submit
            value={endValue}
            onChange={(event) => setEndValue(event.target.value)}
        />

        <Button onClick={() => // docs explaining how to get field values, if only they put it into the rest of the form docs... : https://mantine.dev/form/values/
            form.setValues({
                startValue: startValue,
                endValue: endValue,
                identity: identity,
                ambition: ambition,
            })
        } 
            color={"red"} type="submit">Start!</Button>
        </form>
        
    
    </>
    )
}