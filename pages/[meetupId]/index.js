import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import classes from '../[meetupId]/meetupId.module.css';
import Head from 'next/dist/shared/lib/head';
import { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import { useRouter } from 'next/router';

const Detail = (props) => {
  const router = useRouter();

  async function handleDelete() {
    const body = {
      meetupId: props.meetupData.id,
    };
    const response = await fetch('/api/remove-meetup', {
      method: 'POST',
      body: JSON.stringify(body),

      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(props.meetupData.id);
    const data = await response.json();
    console.log(data);
    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
      <div className={classes.actions}>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Fragment>
  );
};

export default Detail;

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://Uzair:chemistry047@cluster0.th2md.mongodb.net/next-project?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
      fallback: 'blocking',
      paths: meetups.map((meetup) => ({
        params: {
          meetupId: meetup._id.toString(),
        },
      })),
    };
  } catch (error) {
    console.log(error, 'inside catch of static paths function');
  }
}

export async function getStaticProps(context) {
  try {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
      'mongodb+srv://Uzair:chemistry047@cluster0.th2md.mongodb.net/next-project?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    });

    client.close();

    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          image: selectedMeetup.image,
          address: selectedMeetup.address,
          description: selectedMeetup.description,
        },
      },
    };
  } catch (error) {
    console.log(error, 'inside catch of dynamic route');

    return { props: {} };
  }
}
