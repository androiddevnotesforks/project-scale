import React, { useState } from "react";
import { Card, Image, Text, Badge, Button, Group, Space, Grid, Loader, Collapse } from '@mantine/core';
import { USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { ADD_AMBITION_ID } from "../features/ambitions";
import { useDispatch, useSelector } from "react-redux";
import AddEvent from "./AddEvent";
import { Link } from "react-router-dom";
import { isSameDate } from "@mantine/dates";
import UpdateAmbition from "./UpdateAmbition";
import DeleteAmbition from "./DeleteAmbition";

export default function ViewAmbitions() {
    const { loading, data } = useQuery(USER, {
        fetchPolicy: "cache-and-network"
    });

    const viewAmbitionsData = data?.user.ambitions || [];

    // const eventsData = data?.user.ambitions.events || [];

    // console.log(viewAmbitionsData);
    
    // console.log(eventsData);
    

    // const recentEvent = data?.["user"]["ambitions"]["0"]["events"].at(-1).createdAt || []; // .at method gets the last createdAt date in the array, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
    // const recentEvent = data?.["user"]["ambitions"]["0"]["events"] || []; // .at method gets the last createdAt date in the array, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
    // const recentEvent2 = data?.["user"]["ambitions"]["1"]["events"] || []; // .at method gets the last createdAt date in the array, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at


    // console.log(recentEvent);
    // console.log(recentEvent2);

    // console.log(Object.hasOwn(recentEvent, 0) + "1");
    // console.log(Object.hasOwn(recentEvent2, 0) + "2");
    
    
    // console.log(recentEvent);
    

    // console.log(viewAmbitionsData);
    // console.log(viewAmbitionsData["2"]);
    // viewAmbitionsData.map((data: any) => console.log(data));
    // console.log(viewAmbitionsData.length);
    // console.log(viewAmbitionsData.map((data: any) => { return data.category}));

    // category, daysCount, endValue, events, identity, public, dailyPlan 
    
    const dispatch = useDispatch();

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
                        recentEvent = (data.events.at(-1).createdAt)
                    } else {
                        recentEvent = null   
                    }
                    
                    return (
                        <Grid.Col key={data._id} span={4}>
                        <Card key={data._id} shadow="sm" p="sm" radius="md" withBorder style={{margin: "1em"}}>
                            {/* <Card.Section> */}
                             {/* <Image
                               src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                               height={160}
                               alt="Norway"
                            /> */}
                            {/* </Card.Section> */}
                        <Group position="apart" mt="xs" mb="xs">
                            <Text>
                                {`Ambition: ${data.category}`}
                            </Text>
                            <Badge color="red">
                                {`I am... ${data.identity}`}
                            </Badge>
                        </Group>
    
                        <Text>
                            {/* something else goes here... */}
                            {`starting point: ${data.dailyPlan}`}
                            <Space />
                            {`end point: ${data.endValue}`}
                            {/* {`events: ${data.events}`} */}
                            <Space />
                            {`public: ${data.public}`}
                        </Text>
                        <div onClick={() => dispatch(ADD_AMBITION_ID({
                            ambitionId: data._id,
                            identity: data.identity,
                            endValue: data.endValue,
                            dailyPlan: data.dailyPlan,
                        }))}>
                            {(isSameDate(new Date(), new Date(recentEvent))) ? (
                                null ) : (
                                    <AddEvent />
                            )}
                            {(!recentEvent) ? (
                                null
                            ) : (
                            <Link to="/records">
                                <Button variant="outline" color="lime" fullWidth mt="sm" >View Records</Button>
                            </Link>
                            )}
                            <UpdateAmbition />
                            {/* <Space /> */}
                            {/* <Group position="center" spacing="xl">
                                <Button onClick={() => setOpenAmbitionSettings((o) => (!o))} color={"gray"}>Settings</Button>
                            </Group>
                            <Collapse in={openAmbitionSettings}> */}
                                {/* <AmbitionSettings /> */}
                            {/* </Collapse> */}
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