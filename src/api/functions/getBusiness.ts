import { getBusinesses } from './getBusinesses';

export function getBusiness(args: {
  businessUid?: string;
  businessId?: number;
}) {
  const { businessUid, businessId } = args;
  const businesses = getBusinesses();
  return businesses.find(
    (business) => business.uid === businessUid || business.id === businessId,
  );
}
