import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('entered');
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        'mongodb+srv://Uzair:chemistry047@cluster0.th2md.mongodb.net/next-project?retryWrites=true&w=majority'
      );
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: 'meetup inserted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
