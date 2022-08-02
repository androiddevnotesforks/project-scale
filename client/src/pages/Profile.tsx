import React, { useEffect, useState } from "react";
import { Tabs, Loader, Text, Button, Group, Space, Collapse } from "@mantine/core"
import { useInterval } from "@mantine/hooks";
import "../App.css"
import NewAmbition from "../components/NewAmbition";
import ViewAmbitions from "../components/ViewAmbitions";
import { USERNAME } from "../utils/queries";
import { useQuery } from "@apollo/client";



export default function Profile() {
    const { loading, data } = useQuery(USERNAME, {
        fetchPolicy: "cache-and-network"
    });

    const username = data?.user.username || "ERROR"; // retrieves only the username otherwise gives ERROR if data wasn't retrieved in time for the message.



    const message = `Welcome ${username}, this is where you'll begin your new ambitions!`;
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

    const [openNewAmbition, setOpenNewAmbition] = useState(false)
    const [viewAmbitions, setViewAmbitions] = useState(false)

    // on clicking to start a new ambition, you will be asked to select an identity...

    return (
       <>
        {loading ? (
            <Loader color="red" size="xl" />
            ) : (

                <div className="clamps">
            <Text style={{textAlign: "center"}} sx={textColour} size="lg">{text}</Text>
            <Space h="md" />
                
                
                <NewAmbition />

                <Button variant="outline" fullWidth mt="xl" uppercase onClick={() => setViewAmbitions((o) => (!o))} color={"teal"}>View your ambitions</Button>

            <Collapse in={viewAmbitions}>
                <ViewAmbitions />
            </Collapse>
            </div>
        )}
      </> 
    );
};
