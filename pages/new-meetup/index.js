import { useRouter } from 'next/router';
import Head from 'next/dist/shared/lib/head';
import React, { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter();

  async function handleAddEvent(enteredEvent) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredEvent),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  }
  return (
    <div>
      <Fragment>
        <Head>
          <title>Add Meetups</title>
          <meta
            name='description'
            content='Exciting Features to Manage you Meetups'
          />
        </Head>
        <NewMeetupForm onAddMeetup={handleAddEvent} />
      </Fragment>
    </div>
  );
};

export default NewMeetup;
