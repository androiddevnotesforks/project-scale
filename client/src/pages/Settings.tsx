import { Space, Text, Group } from "@mantine/core";
import DeleteUser from "../components/DeleteUser";
import UpdateUser from "../components/UpdateUser";

export default function Settings() {

    return (
        <>
        <Group position="center" style={{padding: "1em"}}>
        <Text>
            You can update your username, email and password.
        </Text>
        <Space />
        <UpdateUser />
        </Group>
        <Space />
        <Group position="center" style={{padding: "1em"}}>
        <Text>
            Deleting account will permanently erase your user data.
        </Text>
        <DeleteUser />
        </Group>

        </>
    );
}