import React, { useEffect, useState } from "react";
import { Text } from '@mantine/core';
import { useInterval } from "@mantine/hooks";
import "../App.css" // have to import the css to get it to work

const Home = () => {

    const test = ["Do", "you", "hear", "it?", "...", "...", "..."]
    const testTwo = ["Can", "you", "hear", "their", "voices?", "...", "...", "..."]

    const [text, setText] = useState("");
    const [textTwo, setTextTwo] = useState("")
    const [textColour, setTextColour] = useState({})
    const [textColourTwo, setTextColourTwo] = useState({})
    const [seconds, setSeconds] = useState(0);
    // const [secondsTwo, setSecondsTwo] = useState((testTwo.length - 1));
    // const [secondsTwo, setSecondsTwo] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 500);
    // const intervalTwo = useInterval(() => setSecondsTwo((t) => t + 1), 500);


    useEffect(() => {
        // if (seconds === test.length - 1) {
        if (seconds >= test.length) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTextColour({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
            // setSeconds(0);
            // setText("");
            // intervalTwo.start();
        } else if (seconds <= test.length + 1) {
            interval.start();
            setText(text + " " + test[seconds])
        }
        console.log(seconds === test.length - 1)
        if (seconds === test.length + testTwo.length + 1) {
            interval.stop();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTextColourTwo({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
        } else if (seconds >= test.length + 1) {
            interval.start();
            setTextTwo(textTwo + " " + testTwo[seconds-testTwo.length])
        }
        console.log(seconds);
        // console.log(secondsTwo);
    }, [seconds]);

    // useEffect(() => {
    //     if (secondsTwo === testTwo.length - 1) {
    //         intervalTwo.stop();
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         setTextColour({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
    //         // setSeconds(0);
    //         // setText("");
    //         // intervalTwo.start();
    //     } else if (seconds === test.length - 1) {
    //         intervalTwo.start();
    //         setTextTwo(textTwo + " " + testTwo[secondsTwo])
    //         console.log(secondsTwo);
    //         console.log(seconds);
            
    //     }
    //     console.log(seconds === test.length - 1)
        

    // }, [secondsTwo])

    return (
        <div className="clamps">
            <Text sx={textColour} size="lg">{text}</Text>
            <Text sx={textColourTwo} size="lg">{textTwo}</Text>
        </div>
    );
};

export default Home;