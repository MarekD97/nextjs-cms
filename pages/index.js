import Head from 'next/head';
import Menu from '../components/menu';
import { Container, Header } from 'semantic-ui-react';

export default function Home() {
  const label = {
    headTitle: 'Project CMS'
  }
  return (
    <Container fluid>
      <Head>
        <title>{label.headTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Header as="h1">Strona główna</Header>
    </Container>
  )
}
