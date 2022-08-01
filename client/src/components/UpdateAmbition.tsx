import { useEffect, useState } from "react";
import { Button, NativeSelect, TextInput, Loader, Textarea, Modal, Group } from "@mantine/core";
import { CATEGORY_IDENTITIES } from "../utils/queries";
import { UPDATE_AMBITION } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

export default function UpdateAmbition() {
    
    const { loading, data } = useQuery(CATEGORY_IDENTITIES, {
        fetchPolicy: "cache-and-network"
    });

    const identitiesData = data?.identities || [];

    const [updateAmbition, { error }] = useMutation(UPDATE_AMBITION);

    const state: any = useSelector(state => state);
    console.log(state.ambitions.identity);
    console.log(state.ambitions.endValue);
    console.log(state.ambitions.dailyPlan);

    
    const [identity, setIdentity] = useState(state.ambitions.identity); // default states need to be set
    const [dailyPlan, setDailyPlan] = useState(state.ambitions.dailyPlan); // how they are going to get there
    const [endValue, setEndValue] = useState(state.ambitions.endValue); // where they want to be

    const [dailyErr, setDailyErr] = useState("");
    const [endErr, setEndErr] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    const [errorCheckOne, setErrorCheckOne] = useState(false);
    const [errorCheckTwo, setErrorCheckTwo] = useState(false);

    const [opened, setOpened] = useState(false);
    
    useEffect(() => {
        setIdentity(state.ambitions.identity)
        setDailyPlan(state.ambitions.dailyPlan)
        setEndValue(state.ambitions.endValue)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])
    
    useEffect(() => {
        Number(endValue) ? setEndErr("") : setEndErr("Your ending value must be numbers only, e.g. 88.8");
        dailyPlan.length > 1000 ? setDailyErr("You cannot type more than 1000 characters.") : setDailyErr("");
        dailyPlan.length === 0 ? setDailyErr("You need a daily plan if you are going to achieve something.") : setDailyErr("");

    }, [endValue, dailyPlan])

    function handleChangeEnd(event: any) {
        setEndValue(event.target.value);

        Number(endValue) ? setErrorCheckOne(true) : setErrorCheckOne(false);

        errorCheckOne && errorCheckTwo ? setDisableButton(false) : setDisableButton(true);
    };

    function handleChangeDaily(event: any) {
        setDailyPlan(event.target.value);   

        dailyPlan.length > 1000 ? setErrorCheckTwo(false) : setErrorCheckTwo(true);

        errorCheckOne && errorCheckTwo ? setDisableButton(false) : setDisableButton(true);
    };

    const handleAmbitionSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await updateAmbition({
                variables: {
                    ambitionId: state.ambitions.ambitionId,
                    identity: identity,
                    dailyPlan: dailyPlan,
                    endValue: endValue,
                },
            });
            } catch (error) {
                console.log(error);
            }

            setOpened(false);      
    };

    return (
        <>
            {loading ? (
                <Loader color="red" size="xl" />
            ) : (

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Update Ambition?"
                >     

            <form onSubmit={handleAmbitionSubmit}>
            
            <NativeSelect
                label="Has your ego changed?"
                description="I am..."
                data={identitiesData.map((data: any) => {
                    return data.identityCategories
                })}
                required
                value={identity}
                onChange={(event) => setIdentity(event.target.value)}
            />
    
            <TextInput // end value
                required // requires entry
                label="Are you changing the end value?"
                placeholder="Example: 5000.21"
                value={endValue}
                onChange={handleChangeEnd}
                error={endErr}
                />
    
            <Textarea // start value
                required // requires entry
                label="Has your daily plan changed?"
                placeholder="When I wake up, then I will do something. When it is 11:30am, then I will do something else."
                value={dailyPlan}
                onChange={handleChangeDaily}
                error={dailyErr}
                />
    

                <Button radius="lg" disabled={disableButton} color={"red"} type="submit">Change!</Button>
            </form>
            </Modal>
            
            )}

                <Group position="center" style={{padding: "1em"}}>
                    <Button radius="lg" variant="gradient" gradient={{ from: 'lime', to: 'orange' }} onClick={() => setOpened(true)}>Update Ambition</Button>
                </Group>
            </>
        );
}
