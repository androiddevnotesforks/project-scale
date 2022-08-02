import { useState, useEffect } from "react";
import { Text, Loader, Space } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { SEARCH_PUBLIC_AMBITIONS } from "../utils/queries";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import { Chart, registerables } from 'chart.js'; // required to actually get chart.js with react-chartjs-2 to work
Chart.register(...registerables); // to get the package working, source: https://www.chartjs.org/docs/next/getting-started/integration.html

export default function SearchAmbitions() {

    const { loading, data } = useQuery(SEARCH_PUBLIC_AMBITIONS, {
        variables : {
            public: false, // should return only ambitions that are public which saves on data retrieval
        },
        fetchPolicy: "cache-and-network"
    });

    const viewAmbitions = data?.searchPublicAmbitions || [];
    
    console.log(viewAmbitions);
    

    return (
        <>
            {loading ? (
            <Loader color="red" size="xl" />
            ) : (
        <Text >
            under construction...
        </Text>
            )}
        </>
    );
}