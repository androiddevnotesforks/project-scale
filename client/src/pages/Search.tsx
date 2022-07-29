import React, { useState } from "react";
import { Tabs, Loader, Text, Button } from "@mantine/core"
import { DatePicker } from '@mantine/dates';

const Search = () => {
  const [value, setValue] = useState<Date | null>(null); // if useState is not written like this then onChange doesn't work due to how the NPM package works, source: https://mantine.dev/dates/date-picker/

  console.log(value);
  
    return (
        <div>
            <Text className="clamps" size="lg"> your Search is here...</Text>
            {/* <Button color={"red"}>Search for others' ambitions</Button> */}
            <DatePicker placeholder="Pick date" label="Event date" required value={value} onChange={setValue} />
        </div>
    );
};

export default Search;