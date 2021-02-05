import Head from 'next/head';
import React from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';
import Link from 'next/link';

const NoAccessComponent = () => {
    return (
        <Grid
            textAlign="center"
            verticalAlign="middle"
            style={{ height: '100vh', backgroundImage: 'url("/25101.jpg")', backgroundSize: 'cover' }}>
            <Head>
                <title>Brak dostępu</title>
            </Head>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange">Brak dostępu do tej sekcji!</Header>
            <Message>
                <Link href='/account/login'>
                    Zaloguj się
                </Link> jako administrator
            </Message>
        </Grid.Column>
    </Grid>
    );
};

export default NoAccessComponent;