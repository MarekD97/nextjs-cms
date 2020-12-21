import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { List, Datagrid, TextField } from 'react-admin';

const EntyList = (props) => {
    const imageUrl = 'https://www.namepros.com/attachments/empty-png.89209/';
    return (
        <List {...props} title="Wpisy">
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="body" />
            </Datagrid>
        </List>
    );
};

export default EntyList;