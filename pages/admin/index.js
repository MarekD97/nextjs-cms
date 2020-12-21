import React, { useEffect } from 'react';
import { Admin, maxLength, minLength, PasswordInput, required, SimpleForm, TextInput, Resource, List, Datagrid, TextField, EmailField, AdminUI  } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import dynamic from 'next/dynamic';
import Head from 'next/head'

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

// Resource components
import Dashboard from '../../components/dashboard';
import UserList from '../../components/userList';
import EntryList from '../../components/entryList';

import { createMuiTheme } from '@material-ui/core/styles';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#f2711c',
            contrastText: '#fff'
        }
    }
})

const AdminPage = props => {
    const label = {
        header: 'Panel administratora',
        username: 'Nazwa użytkownika',
        password: 'Hasło',
        entries: 'Wpisy',
        users: 'Użytkownicy'
    }

    const validate = {
        username: [required(), minLength(6), maxLength(30)],
        password: [required(), minLength(6)]
    }
    return (
        <div>
            <Head>
                <title>Panel Administratora</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Admin title={label.header} dataProvider={dataProvider} theme={theme} dashboard={Dashboard}>
                <Resource name="posts" list={EntryList} icon={PostIcon} options={{ label: label.entries }} />
                <Resource name="users" list={UserList} icon={UserIcon} options={{ label: label.users }} />
            </Admin>
        </div>
    );
};

export default dynamic(() => Promise.resolve(AdminPage), {
    ssr: false
});



