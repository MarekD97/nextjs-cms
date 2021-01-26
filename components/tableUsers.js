import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Header, Icon, Loader, Select, Table } from 'semantic-ui-react';
import useSWR from 'swr';

const TableUsers = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [adminCounter, setAdminCounter] = useState(1);
    const {data, dataError, mutate: dataMutate} = useSWR(`/api/users`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (dataError) return <Header textAlign='center'>Błąd podczas ładowania</Header>;
    function handleRoleChange(userId, role) {
        try {
            fetch('/api/users', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    role
                }),
            }).then((r) => r.json()).then((data) => {
                if (data && data.error) {
                    setError(data.message);
                } else {
                    router.push('/admin');
                }
            });
            dataMutate();
        } catch(err) {
            setError(err);
        }
    }
    useEffect(() => {
        if (data) setAdminCounter(data.filter(el => el.role === 'admin').length);
    }, [data])
    return (
        <Table compact celled selectable striped color='orange'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nazwa użytkownika</Table.HeaderCell>
                    <Table.HeaderCell>ID użytkownika</Table.HeaderCell>
                    <Table.HeaderCell>Zarejestrowany</Table.HeaderCell>
                    <Table.HeaderCell>Ostatnie logowanie</Table.HeaderCell>
                    <Table.HeaderCell>Uprawnienia</Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {!data && 
            <Table.Row>
                <Table.Cell colSpan={6}>
                    <Loader content='Ładowanie danych...' inline='centered' active />
                </Table.Cell>
            </Table.Row>
            }
            {data && data.map(item => (
                <Table.Row key={item._id}>
                    <Table.Cell>{item.username}</Table.Cell>
                    <Table.Cell>{item.userId}</Table.Cell>
                    <Table.Cell>{new Date(item.createdAt).toLocaleString("pl-PL", "short")}</Table.Cell>
                    <Table.Cell>{new Date(item.lastLogin).toLocaleString("pl-PL", "short")}</Table.Cell>
                    <Table.Cell>
                        <Select 
                            defaultValue={item.role}
                            options={[
                            {key: 'a', value: 'admin', text: 'Administrator'},
                            {key: 'u', value: 'user', text: 'Zwykły użytkownik'},
                        ]} 
                        onChange={(e, {value}) => {
                            handleRoleChange(item.userId, value);
                        }}
                        disabled={ adminCounter <= 1 && item.role === 'admin' ? true : false}
                        />
                        {error}
                        </Table.Cell>
                    <Table.Cell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            negative
                            size='small'
                            onClick={() => router.push(`/admin/users/delete?user=${item.userId}`)}
                        >
                            <Icon name='delete' /> Usuń użytkownika
                        </Button>
                    </Table.Cell>
                </Table.Row>
                ))
            }
            </Table.Body>
        </Table>
    );
};

export default TableUsers;