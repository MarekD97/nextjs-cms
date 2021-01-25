import Head from 'next/head';
import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const NoAccessComponent = () => {
    return (
        <Container textAlign='center'>
            <Head>
                <title>Brak dostępu</title>
            </Head>
            <Segment>
                <Header as='h1'>Brak dostępu do tej sekcji!</Header>
                <p><Link href='/account/login'>Zaloguj się</Link> jako administrator</p>
            </Segment>
        </Container>
    );
};

export default NoAccessComponent;