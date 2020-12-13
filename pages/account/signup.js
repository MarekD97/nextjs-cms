import React from 'react';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = () => {
    const label = {
        header: 'Załóż konto',
        username: 'Nazwa użytkownika',
        password: 'Hasło',
        confirmPassword: 'Powtórz hasło',
        login: 'Zaloguj się',
        signup: 'Zarejestruj się',
        message: 'Posiadasz już konto?'
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
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder={label.confirmPassword}
                            type="password" />
                        <Button fluid size="large" color="orange">
                            {label.signup}
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    <Header as="h4" color="orange">{label.message}</Header>
                    <a href="#">
                        {label.login}
                    </a>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;