import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import Menu from './menu';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import NoAccess from './noAccess';

const Layout = ({children}) => {
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
    if (router.pathname.includes('/admin') && (!loggedIn || auth.role !== 'admin')) return <NoAccess />;
    return (
        <Container fluid>
            <Menu 
                isLogged={loggedIn} 
                username={auth.username}
                role={auth.role} 
                logoutClick={() => {
                    cookie.remove('token');
                    revalidate();
                }}/>
            {children}
        </Container>
    );
};

export default Layout;