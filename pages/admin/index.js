import Head from 'next/head';
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

import Layout from '../../components/layout';
import TableEntries from '../../components/tableEntries';
import TableComments from '../../components/tableComments';
import TableUsers from '../../components/tableUsers';

const AdminPanel = () => {
    const [activeItem, setActiveItem] = useState('entries');
    const menuItems = [
        {
            name: 'entries',
            label: 'Wpisy',
        },
        {
            name: 'comments',
            label: 'Komentarze',
        },
        {
            name: 'users',
            label: 'Użytkownicy',
        },
    ]
    return (
        <Layout>
            <Head>
                <title>Panel administratora</title>
            </Head>
            <Menu tabular>
                {menuItems.map((item) => (
                    <Menu.Item
                        key={item.name}
                        name={item.name}
                        active={activeItem === item.name}
                        onClick={(e, {name})=>setActiveItem(name)}
                    >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
            {activeItem === 'entries' && <TableEntries />}
            {activeItem === 'comments' && <TableComments />}
            {activeItem === 'users' && <TableUsers />}
        </Layout>
    );
};

export default AdminPanel;