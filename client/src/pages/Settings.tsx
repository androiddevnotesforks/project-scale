import { Space, Text, Group } from "@mantine/core";
import DeleteUser from "../components/DeleteUser";
import UpdateUser from "../components/UpdateUser";
import ChangePassword from "../components/ChangePassword";

export default function Settings() {

    return (
        <>
        <Group position="center" style={{padding: "1em"}}>
        <Text>
            You can update your username, email.
        </Text>
        <Space />
        <UpdateUser />
        </Group>
        <Space />
        <Group position="center" style={{padding: "1em"}}>
        <Text>
            You can change your password.
        </Text>
        <Space />
        <ChangePassword />
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