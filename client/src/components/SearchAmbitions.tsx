import { useState, useEffect } from "react";
import { Text, Loader, Space, Pagination } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { SEARCH_PUBLIC_AMBITIONS } from "../utils/queries";
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
    // const viewEvents = data?.searchPublicAmbitions['0']["events"] || [];
    
    console.log(viewAmbitions["0"]);
    console.log(viewAmbitions.length);
    
    // console.log(viewEvents);
    const [activePage, setPage] = useState(1);
    console.log(activePage);
    
    // useEffect(() => {

    // }, [activePage])
    

    return (
        <>
            {loading ? (
            <Loader color="red" size="xl" />
            ) : (
            <div className="chart">

        <Line 
                datasetIdKey="eventsChart"
                data={{
                    labels: viewAmbitions[activePage-1].events.map((data: any, index: any) => { // source for knowing index can be used as a parameter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                        // console.log(index);
                        
                        return index + 1
                    }),//array x-axis
                    datasets: [
                        {
                            data: viewAmbitions[activePage-1].events.map((data: any, index: any, array: any) => {
                                // console.log(data.dataInput);
                                // console.log(data.array);
                                // console.log(array);
                                // console.log(data.events);
                                
                                
                                
                                
                                return data.dataInput
                            }),
                            label: "Lose Weight",
                            borderColor: "crimson",

                        },
                    ], // hmmm
                }}
                options={{
                    scales: {
                        y: {
                            title: {
                              display: true,
                              text: "Weight (kg)",
                            },
                          },
                          x: {
                              title: {
                                  display: true,
                                  text: "Days recorded",
                                },
                            },
                        }
                    }}
                 />
                <Pagination page={activePage} onChange={setPage} total={viewAmbitions.length} color="teal" size="lg" radius="md" withControls={false} />
            </div>
            )}
                </>
                );
            }