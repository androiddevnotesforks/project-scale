import React, { useState } from "react";
import { Calendar } from "@mantine/dates";
import { Text } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { SEARCH_EVENTS } from "../utils/queries";
import { useSelector } from "react-redux";


export default function EventCalendar() {

    const state: any = useSelector(state => state)

    const { loading, data } = useQuery(SEARCH_EVENTS, {
        variables : {
            ambitionId: state.ambitions.ambitionId
        },
        fetchPolicy: "cache-and-network"
    });

    const viewRecords = data?.searchEvents.events || [];
    const viewAmbition = data?.searchEvents || [];

    console.log(state.ambitions.ambitionId);
    
    console.log(viewRecords);
    console.log(viewAmbition);
    
    

    const [value, setValue] = useState<Date | null>(null); // if useState is not written like this then onChange doesn't work due to how the NPM package works, source: https://mantine.dev/dates/date-picker/

    return (
        <div>
            <Calendar value={value} onChange={setValue} />
        </div>

    );
}