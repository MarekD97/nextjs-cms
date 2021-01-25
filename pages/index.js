import Head from 'next/head';
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';

import Menu from '../components/menu';

import { Breadcrumb, Button, Container, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import Layout from '../components/layout';

export default function Home() {
  const label = {
    headTitle: 'Project CMS'
  }
  const {data: auth, revalidate} = useSWR('/api/auth/status', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  const {data: pageData} = useSWR('/api/entries?active=true', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!auth) return <Loader active inline='centered' />;
  let loggedIn = false;
  if (auth.username) {
    loggedIn = true;
  }
  return (
    <Layout>
      <Head>
        <title>{label.headTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header as='h2' icon textAlign='center'>
        <Icon name='sitemap' circular />
        <Header.Content>Projekt CMS</Header.Content>
      </Header>
      {loggedIn && <Header as='h3' textAlign='center'>Zalogowany jako: {auth.username}</Header> }
      {!pageData && <Loader active inline='centered' />}
      {pageData &&
        <Grid columns={3} divided>
          {pageData.map((item, index) => (
            <Grid.Column key={index}>
              <Segment>
                <Header as='h3'>
                  {item.title}
                </Header>
                <p>Data dodania: {new Date(item.updatedAt).toLocaleString("pl-PL", "short")}</p>
                <Link href={item.slug}>
                  <Button>
                    Przejdź do strony
                  </Button>
                </Link>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      }
    </Layout>
  )
}
