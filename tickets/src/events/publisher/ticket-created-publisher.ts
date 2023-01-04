import { Publisher, Subjects, TicketCreatedEvent } from '@zj_ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
