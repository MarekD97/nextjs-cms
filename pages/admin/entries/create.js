import React, {useState} from 'react';
import Layout from '../../../components/layout';
import { Button, Card, Checkbox, Form, Grid, Menu, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DropBoard from '../../../components/dropBoard';
import Head from 'next/head';
import ModulesList from '../../../components/modulesList';

const CreateEntry = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [active, setActive] = useState(true);
    const [enableComments, setEnableComments] = useState(false);
    const [modules, setModules] = useState('');
    
    const [error, setError] = useState('');
    const router = useRouter();

    function validateSlug(slug) {
        const re = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
        return re.test(String(slug));
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            if (title === '')
                throw('Tytuł wpisu nie może być pusty.');
            if (!validateSlug(slug))
                throw('Nieprawidłowy slug strony.');
            if ( modules === undefined || modules.length === 0)
                throw('Strona musi składać się z conajmniej jednego modułu.');
            fetch('/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    slug,
                    active,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    enableComments,
                    modules,
                }),
            }).then((r) => r.json()).then((data) => {
                if (data && data.error) {
                    setError(data.message);
                } else {
                    router.push('/admin');
                }
            });
        } catch(err) {
            setError(err);
        }
        
    }

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
            <Menu tabular stackable>
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
                <Menu.Menu position='right'>
                    <Menu.Item>
                        { error && <p style={{color: 'red'}}>{error}</p>}
                    </Menu.Item>
                    <Menu.Item>
                        <Button positive onClick={(e) => handleSubmit(e)}>Zapisz</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button negative onClick={() => router.push('/admin')}>Anuluj</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            {activeItem === 'primary' &&
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Podstawowe dane o stronie</label>
                    </Form.Field>
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
                        defaultChecked={active}
                        toggle 
                        onChange={() => setActive(!active)}
                        />
                    <Form.Checkbox 
                        label="Możliwość dodawania komentarzy" 
                        name="enableComments"
                        defaultChecked={enableComments}
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

export default CreateEntry;