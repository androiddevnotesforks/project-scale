import { useState} from "react";
import { Text, Loader, Grid, Group, Pagination } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { SEARCH_PUBLIC_AMBITIONS } from "../utils/queries";
import { Line } from "react-chartjs-2";

import { Chart, registerables } from 'chart.js'; // required to actually get chart.js with react-chartjs-2 to work
Chart.register(...registerables); // to get the package working, source: https://www.chartjs.org/docs/next/getting-started/integration.html

export default function SearchAmbitions() {

    const { loading, data } = useQuery(SEARCH_PUBLIC_AMBITIONS, {
        variables : {
            public: true, // should return only ambitions that are public which saves on data retrieval
        },
        fetchPolicy: "cache-and-network"
    });

    const viewAmbitions = data?.searchPublicAmbitions || [];
        

    const [activePage, setPage] = useState(1);
    
    function yAxisLabels() {

        const units = (viewAmbitions[activePage-1].category === "Lose Weight") 
                ? "Weight (kg)" 
                : (viewAmbitions[activePage-1].category === "Save Money") 
                ? "Dollars Spent ($)"
                : ((viewAmbitions[activePage-1].category === "New Profession") || (viewAmbitions[activePage-1].category === "New Hobby"))
                ? "Minutes Spent"
                : "Units"

        return units 
    }
    

    return (
        <>
            {loading ? (
            <Loader color="red" size="xl" />
            ) : (!loading && Object.hasOwn(viewAmbitions, 0)) ? 
            
            (
                <div className="chart">
                    <Grid>
            <Grid.Col 
            md={12}
            lg={10}
            >
           
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
                                
                                return data.dataInput
                            }),
                            label: viewAmbitions[activePage-1].category,
                            borderColor: "crimson",

                        },
                    ], // hmmm
                }}
                options={{
                    scales: {
                        y: {
                            title: {
                              display: true,
                              text: yAxisLabels(),
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
                 </Grid.Col>
                 <Grid.Col
                    md={0} 
                    lg={2}
                      >

                </Grid.Col>
                 </Grid>
                 <Group mt="md" position="center">
                <Pagination page={activePage} onChange={setPage} total={viewAmbitions.length} color="teal" size="lg" radius="md" withControls={false} />
                 </Group>
            </div>
            ) : (
                <div>
                    <Text>
                        (You cannot hear their voices ... ... ...)
                    </Text>
                </div>
            )}
                </>
                );
            }