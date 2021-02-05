import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const Signup = () => {
    const label = {
        header: 'Załóż konto',
        email: 'Adres e-mail',
        username: 'Nazwa użytkownika',
        password: 'Hasło',
        confirmPassword: 'Powtórz hasło',
        login: 'Zaloguj się',
        signup: 'Zarejestruj się',
        message: 'Posiadasz już konto?'
    }

    const [signupError, setSignupError] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!validateEmail(email))
                throw('Nieprawidłowy adres e-mail.');
            if (username == '')
                throw('Podaj nazwę użytkownika.');
            if (password != passwordConfirm)
                throw('Hasła nie pasują.');
            if (password.length < 6)
                throw('Hasło powinno składać się z przynajmniej 6 znaków.');
            fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                }),
            }).then((r) => r.json()).then((data) => {
                if (data && data.error) {
                    setSignupError(data.message);
                }
                if (data && data.token) {
                    // set cookie
                    cookie.set('token', data.token, {expires: 2});
                    Router.push('/');
                }
            });
            
        } catch(err) {
            setSignupError(err);
        }
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
                        { signupError && <p style={{color: 'red'}}>{signupError}</p>}
                        <Form.Input
                            fluid
                            icon="mail"
                            iconPosition="left"
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={label.email} />
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
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            name="passwordConfirm"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder={label.confirmPassword}
                            type="password" />
                        <Button fluid size="large" color="orange">
                            {label.signup}
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    <Header as="h4" color="orange">{label.message}</Header>
                    <Link href="/account/login">
                        {label.login}
                    </Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Signup;