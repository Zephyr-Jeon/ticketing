import { PaymentCreatedEvent, Publisher, Subjects } from '@zj_ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
