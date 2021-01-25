import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { Button, Header, Icon, Loader, Table } from 'semantic-ui-react';

const TableComments = () => {
    const router = useRouter();
    const {data, error} = useSWR(`/api/comments`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (error) return <Header textAlign='center'>Błąd podczas ładowania</Header>;
    return (
        <Table compact celled selectable striped color='orange'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Autor</Table.HeaderCell>
                    <Table.HeaderCell>Stworzony</Table.HeaderCell>
                    <Table.HeaderCell>Zaktualizowany</Table.HeaderCell>
                    <Table.HeaderCell>Treść</Table.HeaderCell>
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
                    <Table.Cell>{item.author.username}</Table.Cell>
                    <Table.Cell>{new Date(item.createdAt).toLocaleString("pl-PL", "short")}</Table.Cell>
                    <Table.Cell>{new Date(item.updatedAt).toLocaleString("pl-PL", "short")}</Table.Cell>
                    <Table.Cell>{item.text}</Table.Cell>
                    <Table.Cell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            negative
                            size='small'
                            onClick={() => router.push(`/admin/comments/delete?id=${item._id}`)}
                        >
                            <Icon name='delete' /> Usuń
                        </Button>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={() => router.push(`/admin/comments/edit?id=${item._id}`)}
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

export default TableComments;