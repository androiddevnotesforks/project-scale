import React, { useEffect, useState } from "react";
import { Text } from '@mantine/core';
import { useInterval } from "@mantine/hooks";
import "../App.css" // have to import the css to get it to work

const Home = () => {

    const one = "Do you hear it? ... ... ...";
    const splitOne = one.split("");
    // const test = ["Do", "you", "hear", "it?", "...", "...", "..."]
    const two = "Can you hear their voices? ... ... ...";
    const splitTwo = two.split("");
    // const splitTwo = ["Can", "you", "hear", "their", "voices?", "...", "...", "..."]
    const three = "I want to be fit!";
    const splitThree = three.split("");

    const four = "I want a better job!";
    const splitFour = four.split("");

    const five = "I want a better life!      ";
    const splitFive = five.split("");

    const six = "They yearn for change but they expect it instantly without changing who they are.   ";
    const splitSix = six.split("");

    const seven = "Ambitions take time...   ";
    const splitSeven = seven.split("");

    const eight = "Small changes accumulate large effects...   ";
    const splitEight = eight.split("");

    const nine = "Will you embark upon a new ambition?...           ";
    const splitNine = nine.split("");

    const [text, setText] = useState("");
    const [textTwo, setTextTwo] = useState("");
    const [textThree, setTextThree] = useState("");
    const [textFour, setTextFour] = useState("");
    const [textFive, setTextFive] = useState("");
    const [textSix, setTextSix] = useState("");
    const [textSeven, setTextSeven] = useState("");
    const [textEight, setTextEight] = useState("");
    const [textNine, setTextNine] = useState("");

    const [textColour, setTextColour] = useState({})
    const [textColourTwo, setTextColourTwo] = useState({})
    const [textColourSix, setTextColourSix] = useState({})
    const [textColourSeven, setTextColourSeven] = useState({})
    const [textColourEight, setTextColourEight] = useState({})
    const [textColourNine, setTextColourNine] = useState({})

    const [pageTwo, setPageTwo] = useState(false)
    const [pageThree, setPageThree] = useState(false)

    const [seconds, setSeconds] = useState(0);
    // const [secondsTwo, setSecondsTwo] = useState((splitTwo.length - 1));
    // const [secondsTwo, setSecondsTwo] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 120);
    // const intervalTwo = useInterval(() => setSecondsTwo((t) => t + 1), 500);


    useEffect(() => {
        // if (seconds === splitOne.length - 1) {
        if (seconds >= splitOne.length) { // LINE ONE
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTextColour({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
            // setSeconds(0);
            // setText("");
            // intervalTwo.start();
        } else if (seconds <= splitOne.length + 1) {
            interval.start();
            setText(text + splitOne[seconds])
        }

        if (seconds === splitOne.length + splitTwo.length + 1) { // LINE TWO
            // interval.stop();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTextColourTwo({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
        } else if (seconds >= splitOne.length + 1 && seconds <= splitOne.length + splitTwo.length + 1) {
            interval.start();
            setTextTwo(textTwo + splitTwo[seconds-splitOne.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + 1) { // LINE THREE
            // interval.stop();

        } else if (seconds >= splitOne.length + splitTwo.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + 1) {
            interval.start();
            setTextThree(textThree + splitThree[seconds-splitOne.length-splitTwo.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + 1) { // LINE FOUR
            // interval.stop();

        } else if (seconds >= splitOne.length + splitTwo.length + splitThree.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + 1) {
            interval.start();
            setTextFour(textFour + splitFour[seconds-splitOne.length-splitTwo.length-splitThree.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + 1) { // LINE FIVE
            // interval.stop();
            setPageTwo(true)

        } else if (seconds >= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + 1) {
            interval.start();
            setTextFive(textFive + splitFive[seconds-splitOne.length-splitTwo.length-splitThree.length-splitFour.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + 1) { // TEXTSIX LINE ONE PAGE TWO!
            // interval.stop();

            setTextColourSix({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });

        } else if (seconds >= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + 1) {
            interval.start();
            setTextSix(textSix + splitSix[seconds-splitOne.length-splitTwo.length-splitThree.length-splitFour.length-splitFive.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + 1) { // TEXTSEVEN LINE TWO PAGE TWO!
            // interval.stop();
            
            setTextColourSeven({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });

        } else if (seconds >= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + 1) {
            interval.start();
            setTextSeven(textSeven + splitSeven[seconds-splitOne.length-splitTwo.length-splitThree.length-splitFour.length-splitFive.length-splitSix.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + splitEight.length + 1) { // TEXTEIGHT LINE THREE PAGE TWO!
            // interval.stop();
            
            setTextColourEight({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });

        } else if (seconds >= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + splitEight.length + 1) {
            interval.start();
            setTextEight(textEight + splitEight[seconds-splitOne.length-splitTwo.length-splitThree.length-splitFour.length-splitFive.length-splitSix.length-splitSeven.length - 1])
        }

        if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + splitEight.length + splitNine.length + 1) { // TEXTNINE LINE FOUR PAGE TWO!
            interval.stop();
            setPageThree(true);

        } else if (seconds >= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + splitEight.length + 1 && seconds <= splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + splitEight.length + splitNine.length + 1) {
            interval.start();
            setTextNine(textNine + splitNine[seconds-splitOne.length-splitTwo.length-splitThree.length-splitFour.length-splitFive.length-splitSix.length-splitSeven.length-splitEight.length - 1])
            if (seconds === splitOne.length + splitTwo.length + splitThree.length + splitFour.length + splitFive.length + splitSix.length + splitSeven.length + splitEight.length + splitNine.length -3) {
                setTextColourNine({ color: 'crimson', fontSize: 18, lineHeight: 1.4 });
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    return (
        (!pageTwo) ? (

        
        <div className="clamps">
            <Text style={{textAlign: "center"}} sx={textColour} size="lg">{text}</Text>
            <Text style={{textAlign: "center"}} sx={textColourTwo} size="lg">{textTwo}</Text>

            <Text mt="md" style={{textAlign: "center"}} size="lg">{textThree}</Text>
            <Text mt="md" style={{textAlign: "center"}} size="lg">{textFour}</Text>
            <Text mt="md" style={{textAlign: "center"}} size="lg">{textFive}</Text>
        </div>

        ) : (pageTwo && !pageThree) ? (
        <div className="clamps">
            <Text style={{textAlign: "center"}} sx={textColourSix} size="lg">{textSix}</Text>
            <Text mt="md" style={{textAlign: "center"}} sx={textColourSeven} size="lg">{textSeven}</Text>
            <Text style={{textAlign: "center"}} sx={textColourEight} size="lg">{textEight}</Text>
            <Text mt="md" style={{textAlign: "center"}} sx={textColourNine} size="lg">{textNine}</Text>
        </div>
        ) : (
            <div className="clamps">
            <Text mt="md" style={{textAlign: "center"}} sx={{ color: 'crimson', fontSize: 40, lineHeight: 1.4 }} size="lg">S.C.A.L.E. Up!</Text>
        </div>
        )
    );
};

export default Home;