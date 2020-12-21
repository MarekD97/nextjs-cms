import React from 'react';
import { Title } from 'react-admin';

import { Grid, Card, Button } from 'semantic-ui-react';

const Dashboard = () => {
    const label = {
        header: 'Panel Administratora',
        description: 'Witaj użytkowniku w panelu administratora. Tutaj możesz zarządzać stroną.',
        createPage: 'Stwórz stronę',
    }

    return (
        <Grid 
            textAlign="center"
            verticalAlign="middle"
            columns={2}
            devided>
            <Title title={label.header} />
            <Grid.Column width={10}>
                <Card>
                    <Card.Content>
                        <Card.Header>{label.header}</Card.Header>
                        <Card.Description>{label.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button color="orange">{label.createPage}</Button>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column width={6}>
                <Card>
                    <Card.Content>
                        <Card.Header>{label.header}</Card.Header>
                        <Card.Description>{label.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button color="orange">{label.createPage}</Button>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    );
};

export default Dashboard;