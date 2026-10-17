import raw from "../business.json";

// Legal and contact details from business.json. Empty strings become null so
// pages can leave out anything that has not been confirmed yet.

const value = (v: string) => (v.trim() ? v.trim() : null);

export const BUSINESS = {
  legalName: value(raw.legalName),
  legalForm: value(raw.legalForm),
  street: value(raw.street),
  postcode: value(raw.postcode),
  city: value(raw.city),
  country: value(raw.country),
  enterpriseNumber: value(raw.enterpriseNumber),
  vatNumber: value(raw.vatNumber),
  vatActive: raw.vatActive === true,
  publicEmail: value(raw.publicEmail),
  privacyEmail: value(raw.privacyEmail) ?? value(raw.publicEmail),
  phone: value(raw.phone),
  emailProvider: value(raw.emailProvider),
  enquiryRetention: value(raw.enquiryRetention),
};

/** "Street, Postcode City, Country", using only the parts that are filled in. */
export function businessAddress() {
  const { street, postcode, city, country } = BUSINESS;
  const locality = [postcode, city].filter(Boolean).join(" ");
  return [street, locality, country].filter(Boolean).join(", ") || null;
}
