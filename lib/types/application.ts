/**
 * Application data types
 */

export interface ApplicationData {
  email: string;
  firstName: string;
  lastName: string;
  residenceAddress: string;
  cityAndState: string;
  zipCode: string;
  birthDate: string;
  birthCity: string;
  birthState: string;
  birthCountry: string;
  licenseNumber: string;
  licenseState: string;
  expirationDate: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  weight: string;
  sex: string;
  carrierType: string;
  carrierName: string;
  mailingAddress: string;
  mailingCityAndState: string;
  mailingZipCode: string;
  idpPeriod: string;
  applicationId?: number;
}

export interface ApplicationSummary {
  applicationId?: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface PaymentIntentRequest {
  application_id: number;
  amount: number;
  idp_period: string;
  email: string;
  customer_name: string;
}

export interface PaymentIntentResponse {
  success: boolean;
  client_secret?: string;
  payment_intent_id?: string;
  message?: string;
}

export interface PaymentStatusUpdateRequest {
  application_id: number;
  payment_intent_id: string;
  status: 'paid' | 'failed';
}

export interface PaymentStatusUpdateResponse {
  success: boolean;
  message: string;
  application?: ApplicationData;
}
