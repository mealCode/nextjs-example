import { getFilteredEvents } from '../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';

const FilteredEvents = (props) => {
  const { hasError, events, year, month } = props;

  if (hasError) {
    return (
      <>
        <ErrorAlert>Invalid filter</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!events || !events.length) {
    return (
      <>
        <ErrorAlert>No events found.</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`All events for ${year}/${month}`} />
      </Head>
      <ResultsTitle date={new Date(+year, +month - 1)} />
      <EventList events={events} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const [year, month] = params.slug;

  const filteredEvents = await getFilteredEvents({
    year: +year,
    month: +month,
  });

  if (!filteredEvents || !filteredEvents.length) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true
    };
  }

  return {
    props: {
      events: filteredEvents,
      year,
      month,
    },
  };
}

export default FilteredEvents;
