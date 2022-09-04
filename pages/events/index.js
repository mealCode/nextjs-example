import { useRouter } from 'next/router';

import { getAllEvents } from '../helpers/api-util';
import EventsList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import Head from 'next/head';

const Events = (props) => {
  const { events } = props;

  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <h1>All Events</h1>
      <Head>
        <title>All Events</title>
        <meta name="description" content="All Next events" />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventsList events={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 3600,
  };
}

export default Events;
