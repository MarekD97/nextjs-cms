import { useRouter } from 'next/router';
import React from 'react';
import { Button, Header, Icon, Loader, Table } from 'semantic-ui-react';
import useSWR from 'swr';

const TableUsers = () => {
    const router = useRouter();
    const {data, error} = useSWR(`/api/users`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (error) return <Header textAlign='center'>Błąd podczas ładowania</Header>;
    return (
        <Table compact celled selectable striped color='orange'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nazwa użytkownika</Table.HeaderCell>
                    <Table.HeaderCell>ID użytkownika</Table.HeaderCell>
                    <Table.HeaderCell>Zarejestrowany</Table.HeaderCell>
                    <Table.HeaderCell>Ostatnie logowanie</Table.HeaderCell>
                    <Table.HeaderCell>Administrator</Table.HeaderCell>
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
                        {item.role === 'admin' &&
                            <Icon color='green' name='checkmark' size='large' />
                        }
                        </Table.Cell>
                    <Table.Cell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            negative
                            size='small'
                            onClick={() => router.push('/admin/updatePage')}
                        >
                            <Icon name='delete' /> Usuń
                        </Button>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                        >
                            <Icon name='edit' /> Edytuj
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