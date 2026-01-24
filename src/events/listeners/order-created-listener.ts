import { Listener, OrderCreatedEvent, Subjects } from '@motway_ticketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);
    msg.ack();
  }
}
