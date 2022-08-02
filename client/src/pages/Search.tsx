import { useState, useEffect } from "react";
import { Tabs, Loader, Text, Button } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import SearchAmbitions from "../components/SearchAmbitions";
import "../App.css";

export default function Search() {
  // so what you want to do is... query the ambitions... any that have public as true will then be displayed using chart.js... need to consider using pagination so that you can look at a few at a time or something...

    const message = "Do you hear their voices? ... ... ...";
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
  
    return (
        <div className="clamps">
            <Text style={{textAlign: "center"}} sx={textColour} size="lg">{text}</Text>
            {/* <Button color={"red"}>Search for others' ambitions</Button> */}
            <SearchAmbitions />
        </div>
    );
};
