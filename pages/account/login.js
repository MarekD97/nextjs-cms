import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const Login = () => {
    const label = {
        header: 'Zaloguj się',
        username: 'Nazwa użytkownika',
        password: 'Hasło',
        login: 'Zaloguj',
        signup: 'Zarejestruj się',
        message: 'Nie posiadasz konta?'
    }
    const [loginError, setLoginError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((r) => r.json()).then((data) => {
            if (data && data.error) {
                setLoginError(data.message);
            }
            if (data && data.token) {
                // set cookie
                cookie.set('token', data.token, {expires: 2});
                Router.push('/');
            }
        });
    }
    return (
        <Grid
            textAlign="center"
            verticalAlign="middle"
            style={{ height: '100vh', backgroundImage: 'url("/25101.jpg")', backgroundSize: 'cover' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="orange">{label.header}</Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        {loginError && <p style={{color: 'red'}}>{loginError}</p>}
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={label.username} />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={label.password}
                            type="password" />
                        <Button fluid size="large" color="orange">
                            {label.login}
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    <Header as="h4" color="orange">{label.message}</Header>
                    <Link href="/account/signup">
                        {label.signup}
                    </Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;