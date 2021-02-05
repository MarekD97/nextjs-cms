import Link from 'next/link';
import React from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';

const Signout = () => {
    return (
        <Grid
            textAlign="center"
            verticalAlign="middle"
            style={{ height: '100vh', backgroundImage: 'url("/25101.jpg")', backgroundSize: 'cover' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="orange">Wylogowano pomyślnie</Header>
                <Message>
                    <Link href="/">
                        Przejdź na stronę główną
                    </Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Signout;