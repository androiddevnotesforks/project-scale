import React from "react";
import { Card, Image, Text, Badge, Button, Group, Space, Grid, Loader } from '@mantine/core';
import { USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import AddEvent from "./AddEvent";

export default function ViewAmbitions() {
    const { loading, data } = useQuery(USER, {
        fetchPolicy: "cache-and-network"
    });

    const viewAmbitionsData = data?.user.ambitions || [];

    // console.log(viewAmbitionsData);
    // console.log(viewAmbitionsData["2"]);
    // viewAmbitionsData.map((data: any) => console.log(data));
    // console.log(viewAmbitionsData.length);
    // console.log(viewAmbitionsData.map((data: any) => { return data.category}));

    // category, daysCount, endValue, events, identity, public, startValue 
    
    

    
    
    return (
        <>
            {loading ? (
                <Loader color="red" size="xl" />
            ) : (
                <div>
                <Grid grow>
                {viewAmbitionsData.map((data: any) => {
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
                            {`starting point: ${data.startValue}`}
                            <Space />
                            {`end point: ${data.endValue}`}
                            {/* {`events: ${data.events}`} */}
                            <Space />
                            {`public: ${data.public}`}
                        </Text>
                     <AddEvent />
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