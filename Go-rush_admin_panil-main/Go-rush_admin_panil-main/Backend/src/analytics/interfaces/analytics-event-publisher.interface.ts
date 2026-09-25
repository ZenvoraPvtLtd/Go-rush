export interface IAnalyticsEventPublisher {
  publishEvent(
    eventType: string,
    aggregateType: string,
    aggregateId: string,
    payload: any,
    metadata?: any,
  ): Promise<void>;
}
