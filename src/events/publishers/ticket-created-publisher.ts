import { Publisher, Subjects, TicketCreatedEvent } from '@motway_ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
