import { useEffect, useState } from "react";
import { Button, NativeSelect, TextInput, Loader, Textarea, Collapse } from "@mantine/core";
import { ADD_AMBITION } from "../utils/mutations";
import { CATEGORY_AMBITIONS, CATEGORY_IDENTITIES, USER } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Mountain } from "tabler-icons-react";

export default function NewAmbition() {
    const { loading, data } = useQuery(CATEGORY_AMBITIONS, { // query ambitions for form data
        fetchPolicy: "cache-and-network"
      });

    const ambitionsData = data?.categories || [];

    const loadingDataTwo = useQuery(CATEGORY_IDENTITIES, { // query identities for form data
            fetchPolicy: "cache-and-network"
          }); 

    const identitiesData = loadingDataTwo.data?.identities || [];

    const [addAmbition, { error }] = useMutation(ADD_AMBITION, {
        refetchQueries: [
            {query: USER}, // so that the page re-renders with the new user data
        ]
    });

    const [identity, setIdentity] = useState("Determined"); // default states need to be set
    const [ambition, setAmbition] = useState("Lose Weight"); // default states need to be set
    const [dailyPlan, setDailyPlan] = useState(""); // how they are going to get there
    const [endValue, setEndValue] = useState(""); // where they want to be

    const [dailyErr, setDailyErr] = useState("");
    const [endErr, setEndErr] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    const [openNewAmbition, setOpenNewAmbition] = useState(false)

    useEffect(() => {
        if (endValue) { // ensures validation isn't fired off on load
            Number(endValue) ? setEndErr("") : setEndErr("Your ending value must be numbers only, e.g. 88.8");
        }

        dailyPlan.length > 1000 ? setDailyErr("You cannot type more than 1000 characters.") : setDailyErr("");

        (Number(endValue) && dailyPlan.length <= 1000 && dailyPlan.length > 0) ? setDisableButton(false) : setDisableButton(true) // to enable/disable submit button

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
            // location.reload(); // no longer needing to use this when I can refetch apollo queries.
            setDailyPlan("");
            setEndValue("");
            setOpenNewAmbition((o) => (!o));
    };

    const ambitionLabel = (ambition === "Lose Weight") ? "How much do you want to weigh? e.g. Enter 68.8kg as 68.8" : (ambition === "Save Money") ? "How much money do you want to spend per week? e.g. Enter $75.25 as 75.25" : (ambition === "New Profession") ? "How much time do you want to spend each day researching a new profession? e.g. Enter 30 minutes as 30" : (ambition === "New Hobby") ? "How many minutes do you want to spend per day on a new hobby? e.g. Enter 30 minutes as 30" : "How much in units of measurement do you want to use to perform this task? e.g. Enter 20 units as 20";

    const ambitionPlaceholder = (ambition === "Lose Weight") ? "68.8" : (ambition === "Save Money") ? "75.25" : (ambition === "New Profession") ? "30" : (ambition === "New Hobby") ? "30" : "20";
    
    return (
    <>
        {loading ? (
            <Loader color="red" size="xl" />
        ) : (
        <>
        <Button leftIcon={<Mountain size={24} strokeWidth={2} color={'crimson'}/>} variant="outline" mt="xl" fullWidth uppercase onClick={() => setOpenNewAmbition((o) => (!o))} color={"red"}>Start a new ambition</Button>

        <Collapse in={openNewAmbition}>
        <form onSubmit={handleAmbitionSubmit}>
        
        <NativeSelect
            mt="sm"
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
            mt="sm"
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
            mt="sm"
            required // requires entry
            label={ambitionLabel}
            placeholder={ambitionPlaceholder}
            onChange={(event) => setEndValue(event.target.value)}
            value={endValue}
            error={endErr}
        />

        <Textarea // start value
            mt="sm"
            required // requires entry
            label="What do you to plan to do daily to reach your ambition? Your plans will change and adapt at any time so update them accordingly."
            placeholder="When I wake up, then I will do something. When it is 11:30am, then I will do something else."
            onChange={(event) => setDailyPlan(event.target.value)}
            value={dailyPlan}
            error={dailyErr}
        />

            <Button variant="outline" mt="sm" fullWidth radius="lg" disabled={disableButton} color="red" type="submit">Start!</Button>
        </form>
        </Collapse>
        </>
        )}
    </>
    )
}
