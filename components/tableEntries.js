import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Checkbox, Header, Icon, Loader, Table } from 'semantic-ui-react';
import useSWR from 'swr';

const TableEntries = () => {
    const router = useRouter();
    const {data, error} = useSWR(`/api/entries`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (error) return <Header textAlign='center'>Błąd podczas ładowania</Header>;
    const [errorUpdate, setErrorUpdate] = useState();
    function updateActive(active, slug) {
        fetch(`/api/entries/${slug}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                active: active
            }),
        }).then((r) => r.json()).then((data) => {
            if (data && data.error) {
                setErrorUpdate(data.message);
            }
        });
    }

    return (
        <Table compact celled selectable striped color='orange'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Opublikowany</Table.HeaderCell>
                    <Table.HeaderCell>Tytuł</Table.HeaderCell>
                    <Table.HeaderCell>Slug</Table.HeaderCell>
                    <Table.HeaderCell>Utworzony</Table.HeaderCell>
                    <Table.HeaderCell>Zaktualizowany</Table.HeaderCell>
                    <Table.HeaderCell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={() => router.push('/admin/entries/create')}
                        >
                            <Icon name='plus' /> Utwórz wpis
                        </Button>
                    </Table.HeaderCell>
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
                    <Table.Cell collapsing>
                        <Checkbox defaultChecked={item.active} toggle onChange={() => updateActive(!item.active, item.slug)} />
                    </Table.Cell>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.slug}</Table.Cell>
                    <Table.Cell>{new Date(item.createdAt).toLocaleString("pl-PL", "short")}</Table.Cell>
                    <Table.Cell>{new Date(item.updatedAt).toLocaleString("pl-PL", "short")}</Table.Cell>
                    <Table.Cell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            negative
                            size='small'
                            onClick={() => router.push(`/admin/entries/delete?slug=${item.slug}`)}
                        >
                            <Icon name='delete' /> Usuń
                        </Button>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={() => router.push(`/admin/entries/edit?slug=${item.slug}`)}
                        >
                            <Icon name='edit' /> Edytuj
                        </Button>
                    </Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default TableEntries;