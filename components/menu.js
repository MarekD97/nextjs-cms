import React, { useState } from 'react';
import { Button, Menu, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const MenuComponent = ({isLogged, username, role, logoutClick}) => {
    const router = useRouter();
    const routerLink = {
        home: '/',
        admin: '/admin',
        login: '/account/login',
        signup: '/account/signup',
        logout: '/account/logout',
        account: '/account'
    }
    const label = {
        home: 'Strona domowa',
        admin: 'Panel administratora',
        login: 'Zaloguj',
        signup: 'Załóż konto',
        logout: 'Wyloguj'
    }
    const itemName = {
        home: 'home',
        admin: 'admin',
        login: 'login',
        signup: 'signup',
        logout: 'logout',
        account: 'account'
    }
    
    const [activeItem, setActiveItem] = useState();
    return (
        <Menu color='grey' stackable>
            <Menu.Item
                name={itemName.home}
                active={activeItem === itemName.home}
                onClick={(e, {name}) => {
                    setActiveItem(name);
                    router.push(routerLink.home);
                }}
            >
                    <Icon name='home' />
            </Menu.Item>
            {isLogged && role === 'admin' &&
            <Menu.Item
                name={itemName.admin}
                active={activeItem === itemName.admin}
                onClick={(e, {name}) => {
                    setActiveItem(name);
                    router.push(routerLink.admin);
                }}
            >
                <span>
                    <Icon name='list' />
                    {label.admin}
                </span>
            </Menu.Item>
            }
            {!isLogged &&
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={() => {
                            router.push(routerLink.login);
                        }}>
                            <Icon name='sign-in' />
                            {label.login}
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button 
                            color="orange"
                            onClick={()=> router.push(routerLink.signup)}
                        >
                            {label.signup}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>}
            {isLogged &&
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={() => {
                            router.push(routerLink.account);
                        }}>
                            <Icon name='user' />
                            {username}
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button color="orange" onClick={logoutClick}>
                            <Icon name='sign-out' />
                            {label.logout}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>}
        </Menu>
    );
};

export default MenuComponent;