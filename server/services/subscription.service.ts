import restaurantsService from './restaurants.service';
import { addSubscriptionLogRecord } from './subscriptionLog.service';

export async function addSubscription(restaurant_id: number, period: number) {
  const dateEnd = new Date(Date.now() + 1000 * 60 * 60 * 24 * period);

  const result = restaurantsService.updateSubscriptionDatesAndStatus(restaurant_id, 1, new Date(), dateEnd);

  addSubscriptionLogRecord(restaurant_id, true)

  return result;
}