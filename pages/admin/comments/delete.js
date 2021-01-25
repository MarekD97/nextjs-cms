import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import Layout from '../../../components/layout';

const DeleteEntry = () => {
    const router = useRouter();

    function handleSumbit(e) {
        e.preventDefault();
        fetch(`/api/comments/${router.query.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((r) => r.json()).then((data) => {
            if (data) {
                router.push('/admin');
            }
        });
    }

    return (
        <Layout>
            <Head>
                <title>Czy napewno usunąć?</title>
            </Head>
            <Form>
                <Form.Field>
                    <label>Czy napewno chcesz usunąć dany komentarz?</label>
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <Button onClick={(e) => handleSumbit(e)} negative>Usuń na zawsze</Button>
                    </Form.Field>
                    <Form.Field>
                        <Button onClick={() => router.push('/admin')}>Anuluj</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        </Layout>
    );
};

export default DeleteEntry;