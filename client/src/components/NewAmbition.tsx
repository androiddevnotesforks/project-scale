import { useState } from "react";
import { Button, NativeSelect, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
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

    // const ({{loadingTwo = loading}, {dataTwo = data}}) = useQuery(CATEGORY_IDENTITIES, {
    //     fetchPolicy: "cache-and-network"
    //   });

    const [addAmbition, { error }] = useMutation(ADD_AMBITION);

    const [identity, setIdentity] = useState("Determined"); // default states need to be set
    const [ambition, setAmbition] = useState("Lose Weight"); // default states need to be set
    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");

    const form = useForm({
        initialValues: {
            startValue: startValue,
            endValue: endValue,
            identity: identity,
            ambition: ambition,
        },

        validate: {
            startValue: (value) => (!isNaN(Number(value)) ? null : "Your starting value must be numbers only, e.g. 88.8"),
            endValue: (value) => (!isNaN(Number(value)) ? null : "Your ending value must be numbers only, e.g. 88.8"),
        }
    });


    const handleAmbitionSubmit = async (event: any) => {
        event.preventDefault();
        console.log(form.values);
        
        try {
            const { data } = await addAmbition({
                variables: {
                    identity: form.values.identity,
                    category: form.values.ambition,
                    startValue: form.values.startValue,
                    endValue: form.values.endValue,
                },
            });
            } catch (error) {
                console.log(error);
                
            }
    };
    
    
    return (
    <>
        {loading ? (
            <Text>Loading...</Text>
        ) : (
        <form onSubmit={handleAmbitionSubmit}>
        
        <NativeSelect
            label="Choose your identity:"
            description="I am..."
            // data={["Determined", "Inspired"]}
            data={identitiesData.map((data: any) => {
                // console.log(data);
                return data.identityCategories
            })}
            required
            {...form.getInputProps('identity')}
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
            {...form.getInputProps('ambition')}
            onChange={(event) => setAmbition(event.target.value)}
            value={ambition}
        />

        <TextInput // start value
            required // requires entry
            label={ ambition === "Save Money" ? ("How much money haved you saved up right now? e.g. Enter $50.21 as 50.21") : ("What is your starting weight? e.g. Enter 88.8kg as 88.8")}
            placeholder="Example: 50.21"
            {...form.getInputProps('startValue')} // text input
            value={startValue}
            onChange={(event) => setStartValue(event.target.value)}
        />

        <TextInput // end value
            required // requires entry
            label={ ambition === "Save Money" ? ("How much money do you want to save? e.g. Enter $5000.21 as 5000.21") : ("How much do you want to weigh? e.g. Enter 68.8kg as 68.8")}
            placeholder="Example: 5000.21"
            {...form.getInputProps('endValue')} // uses text input on submit
            value={endValue}
            onChange={(event) => setEndValue(event.target.value)}
        />

        <Button onClick={() => // docs explaining how to get field values, if only they put it into the rest of the form docs... : https://mantine.dev/form/values/
            form.setValues({
                startValue: startValue,
                endValue: endValue,
                identity: identity,
                ambition: ambition,
            })
        } 
            color={"red"} type="submit">Start!</Button>
        </form>
        
        )}
    </>
    )
}