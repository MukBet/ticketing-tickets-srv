import { Publisher, Subjects, TicketUpdatedEvent } from '@motway_ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
