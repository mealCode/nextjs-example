import Head from 'next/head';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from './helpers/api-util';

const Home = (props) => {
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find a lot of great next events" />
      </Head>
      <NewsletterRegistration />
      <EventList events={props.featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 3600,
  };
}

export default Home;
