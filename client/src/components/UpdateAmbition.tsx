// putting a button into viewAmbitions...
// will open up a modal to view settings for an ambition...
// there will be a switch to change ambition status to public
// there will be the option to update ambition... it needs to set the state using the same form as making a new ambition minus the ambition...
// and then there will be a button to delete ambition which requires typing in the name of the ambition to enable the button to delete

import { useEffect, useState } from "react";
import { Button, NativeSelect, TextInput, Loader, Textarea, Modal, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
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
    // console.log(state.ambitions.identity);
    // console.log(state.ambitions.endValue);
    // console.log(state.ambitions.dailyPlan);

    
    const [identity, setIdentity] = useState(state.ambitions.identity); // default states need to be set
    const [dailyPlan, setDailyPlan] = useState(state.ambitions.dailyPlan); // how they are going to get there
    const [endValue, setEndValue] = useState(state.ambitions.endValue); // where they want to be

    // console.log(identity);
    // console.log(dailyPlan);
    // console.log(endValue);
    
    useEffect(() => {
        console.log(identity)
        
    }, [identity, dailyPlan, endValue])
    

    const [dailyErr, setDailyErr] = useState("");
    const [endErr, setEndErr] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    const [errorCheckOne, setErrorCheckOne] = useState(false);
    const [errorCheckTwo, setErrorCheckTwo] = useState(false);

    const [opened, setOpened] = useState(false);


    const form = useForm({
        initialValues: {
            dailyPlan: dailyPlan,
            endValue: endValue,
            identity: identity,
        },

    });

    function handleChangeEnd(event: any) {
        setEndValue(event.target.value);

        Number(endValue) ? setEndErr("") : setEndErr("Your ending value must be numbers only, e.g. 88.8");
        Number(endValue) ? setErrorCheckOne(true) : setErrorCheckOne(false);

        errorCheckOne && errorCheckTwo ? setDisableButton(false) : setDisableButton(true);
    };

    function handleChangeDaily(event: any) {
        setDailyPlan(event.target.value);   

        dailyPlan.length > 1000 ? setDailyErr("You cannot type more than 1000 characters.") : setDailyErr("");
        dailyPlan.length > 1000 ? setErrorCheckTwo(false) : setErrorCheckTwo(true);


        errorCheckOne && errorCheckTwo ? setDisableButton(false) : setDisableButton(true);
    };

    const handleAmbitionSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const { data } = await updateAmbition({
                variables: {
                    _id: state.ambitions.ambitionId,
                    identity: identity,
                    dailyPlan: dailyPlan,
                    endValue: endValue,
                },
            });
            } catch (error) {
                console.log(error);
            }

            // eslint-disable-next-line no-restricted-globals
            // location.reload();
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
                // {...form.getInputProps('identity')}
                value={identity}
                onChange={(event) => setIdentity(event.target.value)}
            />
    
            <TextInput // end value
                required // requires entry
                label="Are you changing the end value?"
                placeholder="Example: 5000.21"
                // {...form.getInputProps('endValue')} // uses text input on submit
                value={endValue}
                onChange={handleChangeEnd}
                error={endErr}
                />
    
            <Textarea // start value
                required // requires entry
                label="Has your daily plan changed?"
                placeholder="When I wake up, then I will do something. When it is 11:30am, then I will do something else."
                // {...form.getInputProps('dailyPlan')} // text input
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
