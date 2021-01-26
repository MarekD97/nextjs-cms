import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { Button, Card, Checkbox, Dimmer, Form, Grid, Loader, Menu, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

const EditComment = () => {
    const router = useRouter();
    const {data, loadError} = useSWR(`/api/comments/${router.query.id}`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (loadError) return <Header textAlign='center'>Błąd podczas ładowania</Header>;

    const [text, setText] = useState('');
    
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/comments/${router.query.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                updatedAt: new Date(),
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
            setText(data.text);
        }
    }, [data]);
    return (
        <Layout>
            <Head>
                <title>Edytuj komentarz</title>
            </Head>
            <Menu tabular>
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
            <Segment>
                <Form>
                    <Form.Field>
                        {data && <label>Komentarz napisany przez {data.author.username}</label>}
                    </Form.Field>
                    {error && <p>{error}</p>}
                    <Form.Input 
                        label='Treść komentarza'
                        name='text'
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder='Treść komentarza'
                        width={6}
                        />
                </Form>
            </Segment>
        </Layout>
    );
};

export default EditComment;