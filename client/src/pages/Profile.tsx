import React, { useEffect, useState } from "react";
import { Tabs, Loader, Text, Button, Group, Space } from "@mantine/core"
import { useInterval } from "@mantine/hooks";
import "../App.css"

const Profile = () => {

    const message = "This is where you'll begin your new ambitions!";
    const splitMessage = message.split("");

    const [text, setText] = useState("");
    const [textColour, setTextColour] = useState({})

    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 140);


    useEffect(() => {
        if (seconds === splitMessage.length) {
            setTextColour({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
            interval.stop();
        } else {
            interval.start();
            setText(text + splitMessage[seconds])
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds])

    // on clicking to start a new ambition, you will be asked to select an identity...

    return (
        <div className="clamps">
            <Text style={{textAlign: "center"}} sx={textColour} size="lg">{text}</Text>
            <Space h="md" />

            <Group position="center" spacing="xl">
            <Button color={"red"}>Start an ambition</Button>
            <Button color={"teal"}>View your ambitions</Button>
            </Group>
        </div>
    );
};

export default Profile;