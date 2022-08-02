import { Space, Text, Stack } from "@mantine/core";
import DeleteUser from "../components/DeleteUser";
import UpdateUser from "../components/UpdateUser";
import ChangePassword from "../components/ChangePassword";

export default function Settings() {

    return (
        <>
        <Stack align="center" justify="space-around">

            <Text>
            You can update your username and email.
            </Text>
            <UpdateUser />
            <Space />
        
            <Text>
            You can change your password.
            </Text>
            <ChangePassword />
            <Space />
        
            <Text>
            Deleting account will permanently erase your user data.
            </Text>
            <DeleteUser />
        </Stack>
        </>
    );
}