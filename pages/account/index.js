import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Header, Icon, Loader, Table } from 'semantic-ui-react';
import useSWR from 'swr';
import Layout from '../../components/layout';

const AccountPage = () => {
    const router = useRouter();
    const {data: auth, revalidate} = useSWR('/api/auth/status', async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (!auth) return <Loader active inline='centered' />;
    let loggedIn = false;
    if (auth.username) {
        loggedIn = true;
    }
    if (!loggedIn) router.push('/account/login');
    return (
        <Layout>
            <Head>
                <title>Informacje o użytkowniku</title>
            </Head>
            <Header as='h2' icon textAlign='center'>
                <Icon name='user' circular />
                <Header.Content>Informacje o użytkowniku</Header.Content>
            </Header>
            {loggedIn &&
            <Table definition>
                <Table.Body>
                <Table.Row>
                    <Table.Cell width={4}>Adres e-mail</Table.Cell>
                    <Table.Cell>{auth.email}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Nazwa użytkownika</Table.Cell>
                    <Table.Cell>{auth.username}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Zarejestrowany od</Table.Cell>
                    <Table.Cell>{new Date(auth.createdAt).toLocaleString("pl-PL", "short")}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Ostatnie logowanie</Table.Cell>
                    <Table.Cell>{new Date(auth.lastLogin).toLocaleString("pl-PL", "short")}</Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
            }
        </Layout>
    );
};

export default AccountPage;