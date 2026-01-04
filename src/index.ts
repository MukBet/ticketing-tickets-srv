import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }

  try {
    await natsWrapper.connect('ticketing', 'abcdef', 'http://nats-srv:4222'); // `ticketing` because that's the cluster id we set in nats-depl.yaml, the same for `nats-srv:4222` because that's the service name we set in nats-srv.yaml

    natsWrapper.client.on('close', () => {
      console.log(' NATS conection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Auth service listening on port 3000!');
  });
};

start();