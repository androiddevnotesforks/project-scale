import { isSameDate } from "@mantine/dates";

const oneArray = ['August 5, 2022'];
const twoArray = ['August 4, 2022', 'August 5, 2022'];
const none = null;
const threeArray = ['August 4, 2022', 'August 5, 2022', 'August 6, 2022'];

test("Same_Date_Logic, oneArray, index 0", () => {
    var recentEvent = oneArray.at(0);

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(true)
})

test("Same_Date_Logic, oneArray, index -1", () => {
    var recentEvent = oneArray.at(-1);

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(true)
})

test("Same_Date_Logic, twoArray, index 0", () => {
    var recentEvent = twoArray.at(0);

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(false)
})

test("Same_Date_Logic, twoArray, index -1", () => {
    var recentEvent = twoArray.at(-1);

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(true)
})

test("Same_Date_Logic, twoArray, index -2", () => {
    var recentEvent = twoArray.at(-2);
    // console.log(twoArray.at(-2));

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(false)
})

test("Same_Date_Logic, twoArray, index -3", () => {
    var recentEvent = twoArray.at(-3);
    // console.log(twoArray.at(-3)); // object returns undefined if it is out of range

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(false)
})

test("Tommorow Logic, threeArray", () => {
    var recentEvent = threeArray.at(-1);
    console.log(threeArray.at(-1)); // object returns undefined if it is out of range
    const tomorrow = new Date();
    console.log(tomorrow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(false);
    expect((isSameDate(tomorrow, new Date(recentEvent)))).toBe(true);
    expect((isSameDate(new Date(), new Date(recentEvent))) || (isSameDate(tomorrow, new Date(recentEvent)))).toBe(true);
    expect((isSameDate(new Date(), new Date(recentEvent))) && (isSameDate(tomorrow, new Date(recentEvent)))).toBe(false);

})

test("Yesterday Logic, threeArray", () => {
    var recentEvent = threeArray.at(-1);
    console.log(threeArray.at(-1)); // object returns undefined if it is out of range
    const yesterday = new Date();
    console.log(yesterday);
    yesterday.setDate(yesterday.getDate() - 1);
    console.log(yesterday);

    expect((isSameDate(new Date(), new Date(recentEvent)))).toBe(false);
    expect((isSameDate(yesterday, new Date(recentEvent)))).toBe(false);
    expect((isSameDate(new Date(), new Date(recentEvent))) || (isSameDate(yesterday, new Date(recentEvent)))).toBe(false);
    expect((isSameDate(new Date(), new Date(recentEvent))) && (isSameDate(yesterday, new Date(recentEvent)))).toBe(false);

})