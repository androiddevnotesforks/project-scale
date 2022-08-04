// import eventsReducer, { ADD_EVENT } from "../features/events"; // removed reducer as it was no longer needed
import ambitionsReducer, { ADD_AMBITION_ID } from "../features/ambitions";

const initialState = {
    ambitionId: "",
    dataInput: "",
    notes: "",
};

const alternateState = { // not needed now.
    ambitionId: "12345xf00",
    dataInput: "123.45",
    notes: "Something happened today.",
}

// test("ADD_EVENT", () => { // test remvoved due to removing eventsReducer
//     let newState = eventsReducer(initialState, ADD_EVENT({
//         dataInput: "88.8",
//         notes: "Something happened today."
//     }))
//     // console.log(newState);

//     expect(newState.dataInput).toBe("88.8");
//     expect(initialState.dataInput).toBe("");

//     expect(newState.notes).toBe("Something happened today.");
//     expect(initialState.notes).toBe("");
// });

test("ADD_AMBITION_ID", () => {
    let newState = ambitionsReducer(initialState, ADD_AMBITION_ID({
        ambitionId: "ThisIsIt",
    }))

    expect(newState.ambitionId).toBe("ThisIsIt");
    expect(initialState.ambitionId).toBe("");    
})

// test("CHANGE_EVENT_DATA", () => { test remvoved due to removing eventsReducer
//     let newState = eventsReducer(alternateState, ADD_EVENT({
//         dataInput: "999.99",
//         notes: "That's a lot..."
//     }))

//     expect(newState.dataInput).toBe("999.99");
//     expect(alternateState.dataInput).toBe("123.45");

//     expect(newState.notes).toBe("That's a lot...");
//     expect(alternateState.notes).toBe("Something happened today.");
// })
