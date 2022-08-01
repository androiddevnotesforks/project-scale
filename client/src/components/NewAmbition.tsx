import { useEffect, useState } from "react";
import { Button, NativeSelect, TextInput, Loader, Textarea } from "@mantine/core";
import { ADD_AMBITION } from "../utils/mutations";
import { CATEGORY_AMBITIONS, CATEGORY_IDENTITIES } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

export default function NewAmbition() {
    const { loading, data } = useQuery(CATEGORY_AMBITIONS, {
        fetchPolicy: "cache-and-network"
      });

    const ambitionsData = data?.categories || [];

    const loadingDataTwo = useQuery(CATEGORY_IDENTITIES, {
            fetchPolicy: "cache-and-network"
          }); 

    const identitiesData = loadingDataTwo.data?.identities || [];

    const [addAmbition, { error }] = useMutation(ADD_AMBITION);

    const [identity, setIdentity] = useState("Determined"); // default states need to be set
    const [ambition, setAmbition] = useState("Lose Weight"); // default states need to be set
    const [dailyPlan, setDailyPlan] = useState(""); // how they are going to get there
    const [endValue, setEndValue] = useState(""); // where they want to be

    const [dailyErr, setDailyErr] = useState("");
    const [endErr, setEndErr] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        Number(endValue) ? setEndErr("") : setEndErr("Your ending value must be numbers only, e.g. 88.8");
        dailyPlan.length > 1000 ? setDailyErr("You cannot type more than 1000 characters.") : setDailyErr("");

        (Number(endValue) && dailyPlan) ? setDisableButton(false) : setDisableButton(true)

    }, [endValue, dailyPlan])


    const handleAmbitionSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await addAmbition({
                variables: {
                    identity: identity,
                    category: ambition,
                    dailyPlan: dailyPlan,
                    endValue: endValue,
                },
            });
            } catch (error) {
                console.log(error);
            }

            // eslint-disable-next-line no-restricted-globals
            location.reload();
    };
    
    return (
    <>
        {loading ? (
            <Loader color="red" size="xl" />
        ) : (
        <form onSubmit={handleAmbitionSubmit}>
        
        <NativeSelect
            label="What is your ego?"
            description="I am..."
            // data={["Determined", "Inspired"]}
            data={identitiesData.map((data: any) => {
                // console.log(data);
                return data.identityCategories
            })}
            required
            onChange={(event) => setIdentity(event.target.value)}
            value={identity}
        />

        <NativeSelect
            label="Choose your ambition!"
            description="I am going to..."
            // data={["Lose Weight", "Save Money"]}
            data={ambitionsData.map((data: any) => {
                // console.log(data);
                return data.ambitionCategories
            })}
            required
            onChange={(event) => setAmbition(event.target.value)}
            value={ambition}
        />

        <TextInput // end value
            required // requires entry
            label={ ambition === "Save Money" ? ("How much money do you want to save? e.g. Enter $5000.21 as 5000.21") : ("How much do you want to weigh? e.g. Enter 68.8kg as 68.8")}
            placeholder="Example: 5000.21"
            onChange={(event) => setEndValue(event.target.value)}
            value={endValue}
            error={endErr}
        />

        <Textarea // start value
            required // requires entry
            label="What do you to plan to do daily to reach your ambition? Your plans will change and adapt at any time so update them accordingly."
            placeholder="When I wake up, then I will do something. When it is 11:30am, then I will do something else."
            onChange={(event) => setDailyPlan(event.target.value)}
            value={dailyPlan}
            error={dailyErr}
        />

            <Button radius="lg" disabled={disableButton} color={"red"} type="submit">Start!</Button>
        </form>
        
        )}
    </>
    )
}