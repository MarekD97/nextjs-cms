import React from 'react';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = () => {
    const label = {
        header: 'Zaloguj się',
        username: 'Nazwa użytkownika',
        password: 'Hasło',
        login: 'Zaloguj',
        signup: 'Zarejestruj się',
        message: 'Nie posiadasz konta?'
    }
    return (
        <Grid
            textAlign="center"
            verticalAlign="middle"
            style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="orange">{label.header}</Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder={label.username} />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder={label.password}
                            type="password" />
                        <Button fluid size="large" color="orange">
                            {label.login}
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    <Header as="h4" color="orange">{label.message}</Header>
                    <a href="#">
                        {label.signup}
                    </a>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;