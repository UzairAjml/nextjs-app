import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Your Meetups</title>
        <meta
          name='description'
          content='Browse huge list of upcoming Meetups'
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

export async function getStaticProps() {
  console.log('abc');
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://Uzair:chemistry047@cluster0.th2md.mongodb.net/next-project?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    console.log('mongo connected');

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        })),
      },
    };
  } catch (error) {
    console.log(error.message, 'inside catch');
  }
}
