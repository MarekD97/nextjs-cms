import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = (props) => {
    return (
        <List {...props} title="Użytkownicy" exporter={null}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
                <EmailField source="email" />
                <TextField source="phone" />
            </Datagrid>
        </List>
    );
};

export default UserList;