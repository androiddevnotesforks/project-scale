import { useEffect, useState } from "react";
import { Text, Space, Loader } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import "../App.css";
import EventCalendar from "../components/EventCalendar";
import { USERNAME } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Records() {
    const { loading, data } = useQuery(USERNAME, {
        fetchPolicy: "cache-and-network"
    });

    const username = data?.user.username || "ERROR"; // retrieves only the username otherwise gives ERROR if data wasn't retrieved in time for the message or if logged out.

    const message = `${username}, view the records of your ambition!`;
    const splitMessage = message.split("");

    const [text, setText] = useState("");
    const [textColour, setTextColour] = useState({})

    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 120);


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
        <>
            {loading ? (
                <Loader color="red" size="xl" />
            ) : (
            <div className="clamps">
            <Text style={{textAlign: "center"}} sx={textColour} size="lg">{text}</Text>
            <Space h="md" />

            <EventCalendar />

        </div>
            )}
        </>
    )
}