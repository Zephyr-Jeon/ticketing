import { Subjects, Publisher, OrderCancelledEvent } from '@zj_ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
