import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

import { getEventById } from '../helpers/api-util';
import { getFeaturedEvents } from '../helpers/api-util';
import Head from 'next/head';

const EventDetail = (props) => {
  const { event } = props;

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticProps(context) {
  const { eventId } = context.params;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 1800,
  };
}

export async function getStaticPaths(context) {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetail;
