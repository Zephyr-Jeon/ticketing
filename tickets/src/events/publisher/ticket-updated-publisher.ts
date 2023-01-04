import { Publisher, Subjects, TicketUpdatedEvent } from '@zj_ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
