import React, {useEffect, useState} from 'react';
import Layout from '../../../components/layout';
import { Button, Card, Checkbox, Dimmer, Form, Grid, Loader, Menu, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DropBoard from '../../../components/dropBoard';
import Head from 'next/head';
import ModulesList from '../../../components/modulesList';
import useSWR from 'swr';

const EditEntry = () => {
    const router = useRouter();
    const {data, loadError} = useSWR(`/api/entries/${router.query.slug}`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (loadError) return <Header textAlign='center'>Błąd podczas ładowania</Header>;

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [active, setActive] = useState(true);
    const [enableComments, setEnableComments] = useState(false);
    const [modules, setModules] = useState('');
    
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/entries/${router.query.slug}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                slug,
                active,
                updatedAt: new Date(),
                enableComments,
                modules,
            }),
        }).then((r) => r.json()).then((data) => {
            if (data && data.error) {
                setError(data.message);
            }
            if(data) {
                router.push('/admin');
            }
        });
    }

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setActive(data.active);
            setEnableComments(data.enableComments);
            setModules(data.modules);
        }
    }, [data]);

    const [activeItem, setActiveItem] = useState('primary');
    const menuItems = [
        {
            name: 'primary',
            label: 'Podstawowe',
        },
        {
            name: 'modules',
            label: 'Moduły',
        },
    ]

    return (
        <Layout>
            <Head>
                <title>{title ? title : 'Stwórz nowy wpis'}</title>
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
                {console.log(data)}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button positive onClick={(e) => handleSubmit(e)}>Zapisz</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button negative onClick={() => router.push('/admin')}>Anuluj</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            {!data && 
                <Dimmer active inverted>
                    <Loader inverted>Ładowanie danych...</Loader>
                </Dimmer>
            }
            {activeItem === 'primary' &&
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Podstawowe dane o stronie</label>
                    </Form.Field>
                    {error && <p>{error}</p>}
                    <Form.Input 
                        label='Tytuł strony'
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Tytuł strony'
                        width={6}
                        />
                    <Form.Input 
                        label='Adres do strony (slug)'
                        name='slug'
                        onChange={(e) => setSlug(e.target.value)}
                        value={slug}
                        placeholder='Tytuł strony'
                        width={6}
                        />
                    <Form.Checkbox
                        label="Opublikowany" 
                        name="active"
                        checked={active}
                        toggle 
                        onChange={() => setActive(!active)}
                        />
                    <Form.Checkbox 
                        label="Możliwość dodawania komentarzy" 
                        name="enableComments"
                        checked={enableComments}
                        toggle 
                        onChange={() => setEnableComments(!enableComments)}
                        />
                </Form>
            </Segment>
            }
            {activeItem === 'modules' &&
            <Grid
                verticalAlign="top"
                columns={2}
            >
                    <DndProvider backend={HTML5Backend}>
                        <Grid.Column width={4}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Lista modułów</Card.Header>
                                </Card.Content>
                                <ModulesList />
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Card fluid>
                                <DropBoard content={modules} setContent={setModules} />
                            </Card>
                        </Grid.Column>
                    </DndProvider>
            </Grid>
            }
        </Layout>
    )
};

export default EditEntry;