import React, { useEffect, useState } from "react";
import { Text } from '@mantine/core';
import { useInterval } from "@mantine/hooks";

const Home = () => {

    const [text, setText] = useState("");
    const [textColour, setTextColour] = useState({})
    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 500);

    const test = ["this", "is", "the", "legend", "of", "zelda", "something"]

    useEffect(() => {
        if (seconds === test.length - 1) {
            interval.stop();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTextColour({ color: '#00ECE5', fontSize: 18, lineHeight: 1.4 });
        } else {
            interval.start();
        }

        // (seconds === test.length - 1) ? interval.stop() : interval.start();
        setText(text + " " + test[seconds])
        
    }, [seconds]);

    return (
        <div className="container">
            <Text sx={textColour} size="lg">{text}</Text>
        </div>
    );
};

export default Home;