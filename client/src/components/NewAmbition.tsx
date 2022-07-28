import { useState } from "react";
import { Modal, Button, Group, NativeSelect, TextInput, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NewAmbition() {

    const [identity, setIdentity] = useState('');
    const [ambition, setAmbition] = useState("");

    const form = useForm({
        initialValues: {

        }
    })
    

    return (
    <>
        <NativeSelect
            value={identity}
            onChange={(event) => setIdentity(event.currentTarget.value)}
            label="Choose your identity:"
            description="I am..."
            data={["Determined", "Inspired"]}
            required
        />

        <NativeSelect
            value={ambition}
            onChange={(event) => setAmbition(event.currentTarget.value)}
            label="Choose your ambition!"
            description="I am going to..."
            data={["Lose Weight", "Save Money"]}
            required
        />
    
    </>
    )
}