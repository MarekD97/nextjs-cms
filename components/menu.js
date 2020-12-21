import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Menu } from 'semantic-ui-react';

const MenuComponent = () => {
    const routerLink = {
        home: '/',
        admin: '/admin',
        login: '/account/login',
        signup: '/account/signup'
    }
    const label = {
        home: 'Strona domowa',
        admin: 'Panel administratora',
        login: 'Zaloguj się',
        signup: 'Załóż konto'
    }
    const itemName = {
        home: 'home',
        admin: 'admin',
        login: 'login',
        signup: 'signup'
    }
    const [activeItem, setActiveItem] = useState();
    return (
        <Menu size="small">
            <Menu.Item
                as={ Link }
                href={routerLink.home}
                name={itemName.home}
                active={activeItem === itemName.home}
                onClick={(e, {name}) => setActiveItem(name)}
            ><Button>{label.home}</Button></Menu.Item>
            <Menu.Item
                as={ Link }
                href={routerLink.admin}
                name={itemName.admin}
                active={activeItem === itemName.admin}
                onClick={(e, {name}) => setActiveItem(name)}
            ><Button>{label.admin}</Button></Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item
                    as={ Link }
                    href={routerLink.login}
                    name={itemName.login}
                    active={activeItem === itemName.login}
                    onClick={(e, {name}) => setActiveItem(name)}
                ><Button>{label.login}</Button>
                </Menu.Item>
                <Menu.Item
                    as={ Link }
                    href={routerLink.signup}
                    name={itemName.signup}
                    active={activeItem === itemName.signup}
                    onClick={(e, {name}) => setActiveItem(name)}
                ><Button color="orange">{label.signup}</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default MenuComponent;