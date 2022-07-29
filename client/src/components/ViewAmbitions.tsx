import React from "react";
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function ViewAmbitions() {
    const { loading, data } = useQuery(USER, {
        fetchPolicy: "cache-and-network"
    });

    const viewAmbitionsData = data?.user || [];

    console.log(viewAmbitionsData);
    console.log(viewAmbitionsData.username);
    console.log(viewAmbitionsData.ambitions);
    
    
    return (
        <>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <Card>

                    <Group>
                        <Text>
                            {/* ambition title goes here */}
                            {/* {viewAmbitionsData.map((data: any) => {
                               console.log(data);
                                
                            })} */}
                            {/* {console.log(viewAmbitionsData)} */}
                        </Text>
                    </Group>

                    <Text>
                        {/* something else goes here... */}
                        hmmmmmm
                    </Text>
                    <Button>
                        Smash to event
                    </Button>
                </Card>
            )}
        </>
    )
}