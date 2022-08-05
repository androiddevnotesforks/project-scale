import { Card, Text, Badge, Button, Grid, Loader, Stack, Accordion } from '@mantine/core';
import { USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { ADD_AMBITION_ID } from "../features/ambitions";
import { useDispatch } from "react-redux";
import AddEvent from "./AddEvent";
import { Link } from "react-router-dom";
import { isSameDate } from "@mantine/dates";
import UpdateAmbition from "./UpdateAmbition";
import DeleteAmbition from "./DeleteAmbition";
import { ChartDots } from "tabler-icons-react";

export default function ViewAmbitions() {
    const { loading, data } = useQuery(USER, {
        fetchPolicy: "cache-and-network"
    });

    const viewAmbitionsData = data?.user.ambitions || [];

    const dispatch = useDispatch();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // needed to fix timezone bug thanks to heroku server location, source: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // needed to fix timezone bug thanks to heroku server location

    return (
        <>
            {loading ? (
                <Loader color="red" size="xl" />
            ) : (
                <div>
                <Grid grow>
                {viewAmbitionsData.map((data: any) => {
                    
                    var recentEvent; // need to make undefined variable to get if statements inside the return statement to work
                        
                        
                    if (Object.hasOwn(data.events, 0)) { // checks if an object contains an array, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
                        recentEvent = (data.events.at(-1).createdAt) // .at method gets the last createdAt date in the array, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
                    } else {
                        recentEvent = null   
                    }

                    const aimMeasurement = (data.category === "Lose Weight") ? "kg" : (data.category === "Save Money") ? "dollars per week" : (data.category === "New Profession" || data.category === "New Hobby") ? "minutes per day" : "units"

                    const egoColour = (data.identity === "Determined") ? "red" : (data.identity === "Inspired") ? "yellow" : (data.identity === "Bored") ? "blue" : (data.identity === "???") ? "violet" : "green"
                    
                    return (
                        <Grid.Col key={data._id} span={4}>
                        <Card key={data._id} shadow="sm" p="sm" radius="md" withBorder style={{margin: "1em"}}>
                        <Stack>
                            <Badge color={egoColour} >
                                {`I am... ${data.identity}`}
                            </Badge>
                            <Text style={{textAlign: "center"}}>
                                {`Ambition: ${data.category}`}
                            </Text>
                            <Text style={{textAlign: "center"}}>
                                {`Aim: ${data.endValue} ${aimMeasurement}`}
                            </Text>
                            <Accordion variant="contained">
                                <Accordion.Item value="dailyPlan">
                                    <Accordion.Control>Daily Plan:</Accordion.Control>
                                        <Accordion.Panel>
                                            {`${data.dailyPlan}`}
                                        </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                            <Text style={{textAlign: "center"}}>
                                {`Is this ambition public? ${(data.public) ? "Yes." : "No."}`}
                            </Text>
                        </Stack>
                        <div onClick={() => dispatch(ADD_AMBITION_ID({
                            ambitionId: data._id,
                            category: data.category,
                            identity: data.identity,
                            endValue: data.endValue,
                            dailyPlan: data.dailyPlan,
                            public: data.public,
                        }))}>
                            {((isSameDate(new Date(), new Date(recentEvent))) || ((!isSameDate(new Date(), new Date(recentEvent))) && (isSameDate(tomorrow, new Date(recentEvent)))) || ((!isSameDate(new Date(), new Date(recentEvent))) && (isSameDate(yesterday, new Date(recentEvent))))) 
                                ? ( null ) 
                                : (
                                    <AddEvent />
                            )}
                            {(!recentEvent) ? (
                                null
                            ) : (
                            <Link to="/records">
                                <Button leftIcon={<ChartDots size={24} strokeWidth={2} color={'lime'}/>} variant="outline" color="lime" fullWidth mt="sm" >View Records</Button>
                            </Link>
                            )}
                            <UpdateAmbition />
                            <DeleteAmbition />
                        </div>
                    </Card>
                    </Grid.Col>
                    )
                })}
                </Grid>
                </div>
            )}
        </>
    )
}