import React, { useState } from 'react';
import { Button, Comment, Form, Header, Loader, Message, Segment } from 'semantic-ui-react'
import useSWR from 'swr';

const CommentsComponent = ({entryId}) => {
    const {data: auth, revalidate} = useSWR('/api/auth/status', async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    
    const {data: comments, mutate: refresh, error: commentsError} = useSWR(`/api/comments?entryId=${entryId}`, async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    let loggedIn = false;
    if (auth.username) {
        loggedIn = true;
    }

    const [text, setText] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: auth.userId,
                entryId,
                createdAt: new Date(),
                updatedAt: new Date(),
                text,
            }),
        }).then((r) => r.json()).then((data) => {
            if (data & data.error) {
                console.log(data.message)
            }
            if(data) {
                refresh();
            }
        });
    }
    return (
        <Segment>
            <Comment.Group style={{ margin: '0 auto'}}>
                <Header as='h3' dividing>
                Komentarze
                </Header>
                {commentsError && <p>Wystapił błąd</p>}
                {!comments && !commentsError &&
                <Comment>
                    <Comment.Content>
                        <Loader active/>
                    </Comment.Content>
                </Comment>
                }
                {comments && comments.length === 0 &&
                <Comment>
                    <Comment.Content>
                        Brak komentarzy
                    </Comment.Content>
                </Comment>
                }
                {comments &&
                comments.map((comment) => (
                <Comment key={comment._id}>
                <Comment.Content>
                    <Comment.Author as='span'>{comment.author.username}</Comment.Author>
                    <Comment.Metadata>
                    <div>{new Date(comment.updatedAt).toLocaleString("pl-PL", "short")}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                </Comment.Content>
                </Comment>
                ))}
                
                {!loggedIn && 
                    <Message>
                        <p>Musisz być zalogowany, aby móc dodawać komentarze.</p>
                    </Message>
                }
                {loggedIn &&
                    <Form reply onSubmit={handleSubmit}>
                        <Form.TextArea onChange={(e) => setText(e.target.value)} />
                        <Button 
                            content='Dodaj komentarz' 
                            labelPosition='left' 
                            icon='edit' 
                            primary
                        />
                    </Form>
                }
            </Comment.Group>
        </Segment>
    );
};

export default CommentsComponent;