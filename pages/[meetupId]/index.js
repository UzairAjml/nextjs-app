import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/dist/shared/lib/head';
import { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';

const Detail = (props) => {
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
    console.log(error);
  }
}

export async function getStaticProps(context) {
  console;
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
    console.log('inside catch');
  }
}
