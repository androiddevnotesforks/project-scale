import React, { useState, useEffect } from "react";
import { Calendar, isSameDate, DatePicker } from "@mantine/dates";
import { Text, Indicator, Loader, Space } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { SEARCH_EVENTS } from "../utils/queries";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import { Chart, registerables } from 'chart.js'; // required to actually get chart.js with react-chartjs-2 to work
Chart.register(...registerables); // to get the package working, source: https://www.chartjs.org/docs/next/getting-started/integration.html

export default function EventCalendar() {
    
    const state: any = useSelector(state => state)
    
    const [value, setValue] = useState<Date | null>(null); // if useState is not written like this then onChange doesn't work due to how the NPM package works, source: https://mantine.dev/dates/date-picker/
    
    const { loading, data } = useQuery(SEARCH_EVENTS, {
        variables : {
            ambitionId: state.ambitions.ambitionId
        },
        fetchPolicy: "cache-and-network"
    });

    const viewRecords = data?.searchEvents.events || [];
    const viewAmbition = data?.searchEvents || [];

    // const test = new Date(viewRecords["0"]["createdAt"]);
 
    useEffect(() => {
        // const test = isSameDate(value || new Date(), new Date(viewRecords["0"]["createdAt"])) ? viewRecords["0"]["createdAt"] : console.log("no")
        if (!loading) {
            selectEvent()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    function selectEvent() {
        
        // setValue(new Date())
        // console.log(value);
        // isSameDate(value || new Date(), new Date(viewRecords["0"]["createdAt"])) ? console.log("sth")
        //  : console.log("no")


        // if (isSameDate(value || new Date(), new Date({...viewRecords.createdAt}))) {
        //     return `Date: ${{...viewRecords.createdAt}}, 
        //     Data Input: ${{...viewRecords.dataInput}}, 
        //     Notes: ${{...viewRecords.notes}}.`
        // } else {
        //     return 0
        // }

      return  viewRecords.map((date: any) => {
            if (isSameDate(value || new Date(), new Date(date.createdAt))) {
                return `Date: ${date.createdAt}, Data Input: ${date.dataInput}, Notes: ${date.notes}`
            } else {
                return null
            }
        })
        
    }

    // console.log({...viewRecords});
    console.log(viewRecords.map((date:any) => {
        if (isSameDate(value || new Date(), new Date(date.createdAt))) {
            return `Date: ${date.createdAt}, Data Input: ${date.dataInput}, Notes: ${date.notes}`
        } else {
            return 0
        }
    }));
    
    // Chart data...

    

    // console.log(value);
    
    // console.log(state.ambitions.ambitionId);
    // console.log(data);
    
    // console.log(viewRecords["0"]["createdAt"]);
    // console.log(viewAmbition);
    
    // console.log(isSameDate(new Date(), new Date('Sunday, July 31, 2022')) + " did it work???");

    
    // eslint-disable-next-line no-self-compare
    // if (new Date(2020,0,5) === new Date(2020,0,5)) {
    //     console.log("true... this time");
    // } else {
    //     console.log("nope");
        
    // }

    // need to make an onClick function, when you click on a date, it takes value which is clicked on and compares it to the events held, if there is a match then it will render the event data...
    

    // console.log(value);
    
    return (
        <>
        {loading ? (
            <Loader color="red" size="xl" />
            ) : (
        <div>
            <Calendar 
                value={value} 
                onChange={setValue}
                renderDay={(date) => {
                    const day = date.getDate();
                    // console.log(day);
                    // console.log(date);
                    
                    
                    return (
                        <Indicator size={10} color="teal" offset={8} disabled={day !== 31}>
                            <div>{day}</div>
                        </Indicator>
                    )
                }} 
            />
            <Space />
            <Text >
                {selectEvent()}
            </Text>
            <Space />
            <Line 
                datasetIdKey="eventsChart"
                data={{
                    labels: viewRecords.map((data: any, index: any) => { // source for knowing index can be used as a parameter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                    
                        return index + 1
                    }),//array x-axis
                    datasets: [
                        {
                            data: viewRecords.map((data: any) => {
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
        </div>
        )}

        </>
    );
}