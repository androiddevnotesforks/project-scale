import eventsReducer, { ADD_EVENT } from "../features/events";
import ambitionsReducer, { ADD_AMBITION_ID } from "../features/ambitions";

const initialState = {
    ambitionId: "",
    dataInput: "",
    notes: "",
};

const alternateState = {
    ambitionId: "12345xf00",
    dataInput: "123.45",
    notes: "Something happened today.",
}

test("ADD_EVENT", () => {
    let newState = eventsReducer(initialState, ADD_EVENT({
        dataInput: "88.8",
        notes: "Something happened today."
    }))
    // console.log(newState);

    expect(newState.dataInput).toBe("88.8");
    expect(initialState.dataInput).toBe("");

    expect(newState.notes).toBe("Something happened today.");
    expect(initialState.notes).toBe("");
});

test("ADD_AMBITION_ID", () => {
    let newState = ambitionsReducer(initialState, ADD_AMBITION_ID({
        ambitionId: "ThisIsIt",
    }))

    expect(newState.ambitionId).toBe("ThisIsIt");
    expect(initialState.ambitionId).toBe("");    
})

test("CHANGE_EVENT_DATA", () => {
    let newState = eventsReducer(alternateState, ADD_EVENT({
        dataInput: "999.99",
        notes: "That's a lot..."
    }))

    expect(newState.dataInput).toBe("999.99");
    expect(alternateState.dataInput).toBe("123.45");

    expect(newState.notes).toBe("That's a lot...");
    expect(alternateState.notes).toBe("Something happened today.");
})

// reusing testing from infernal-redux-toolkit-store
// test('UPDATE_PRODUCTS', () => {
//   let newState = productsReducer(initialState, UPDATE_PRODUCTS({ products: [{}, {}] }));

//   expect(newState.products.length).toBe(2);
//   expect(initialState.products.length).toBe(0);
// });

// test('ADD_TO_CART', () => {
//   let newState = cartReducer(initialState, ADD_TO_CART( { products: { purchaseQuantity: 1 }}) );

//   expect(newState.cart.length).toBe(3);
//   expect(initialState.cart.length).toBe(2);
// });

// test('UPDATE_CART_QUANTITY', () => {

//   let newState = cartReducer(initialState, UPDATE_CART_QUANTITY({ _id: "1", purchaseQuantity: 3 }))

//   expect(newState.cartOpen).toBe(true);
//   expect(newState.cart[0].purchaseQuantity).toBe(3);
//   expect(newState.cart[1].purchaseQuantity).toBe(2);
//   expect(initialState.cartOpen).toBe(false);
// });

// test('REMOVE_FROM_CART', () => {

//   let newState1 = cartReducer(initialState, REMOVE_FROM_CART({ _id: "1" }))

//   expect(newState1.cartOpen).toBe(true);
//   expect(newState1.cart.length).toBe(1);
//   expect(newState1.cart[0]._id).toBe('2');

//   let newState2 = cartReducer(newState1, REMOVE_FROM_CART({ _id: "2" }))

//   expect(newState2.cartOpen).toBe(false);
//   expect(newState2.cart.length).toBe(0);

//   expect(initialState.cart.length).toBe(2);
// });

// test('ADD_MULTIPLE_TO_CART', () => {

//   let newState = cartReducer(initialState, ADD_MULTIPLE_TO_CART({ products: [{}, {}] }));
//   console.log(newState.cart);
//   expect(newState.cart.length).toBe(4);
//   expect(initialState.cart.length).toBe(2);
// });

// test('UPDATE_CATEGORIES', () => {
//   let newState = categoryReducer(initialState, UPDATE_CATEGORIES({ categories: [{}, {}]}));

//   expect(newState.categories.length).toBe(2);
//   expect(initialState.categories.length).toBe(1);
// });

// test('UPDATE_CURRENT_CATEGORY', () => {

//   let newState = categoryReducer(initialState, UPDATE_CURRENT_CATEGORY(
//     { currentCategory: "2"},
//   ));

//   expect(newState.currentCategory).toBe('2');
//   expect(initialState.currentCategory).toBe('1');
// });

// test('CLEAR_CART', () => {
//   let newState = cartReducer(initialState, CLEAR_CART())

//   expect(newState.cartOpen).toBe(false);
//   expect(newState.cart.length).toBe(0);
//   expect(initialState.cart.length).toBe(2);
// });

// test('TOGGLE_CART', () => {

//   let newState = cartReducer(initialState, TOGGLE_CART())

//   expect(newState.cartOpen).toBe(true);
//   expect(initialState.cartOpen).toBe(false);

//   let newState2 = cartReducer(newState, TOGGLE_CART())

//   expect(newState2.cartOpen).toBe(false);
// });