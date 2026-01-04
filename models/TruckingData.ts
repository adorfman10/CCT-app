export enum Route {
  BQ = "Brooklyn/Queens",
  EE = "East End",
  LI1 = "Long Island 1",
  LI2 = "Long Island 2",
  LI3 = "Long Island 3",
  LI4 = "Long Island 4",
  NJ1 = "New Jersey 1",
  NJ2 = "New Jersey 2",
  NJ3 = "New Jersey 3",
  NYC1 = "New York City 1",
  NYC2 = "New York City 2",
  PA = "Pennsylvania",
  SPECIAL = "Special",
  W1 = "Westchester 1",
  W2 = "Westchester 2",
  W3 = "Westchester 3",
}

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  development?: string;
  crossStreet?: string;
  specialInstructions?: string;
};

export enum Camp {
  EQ = "Equinunk",
  BR = "Blue Ridge",
}

export type Camper = {
  firstName: string;
  lastName: string;
  camp: Camp;
  numOfBags: number;
};

export type TruckingData = {
  jotformId: string;
  SubmissionDate: string;
  route: string;
  stopNumber: string;
  returnRoute: string | null;
  returnStopNumber: string | null;
  FamilyName: string;
  email: string;
  cellPhone: string;
  homePhone: string;
  address: Address;
  returnAddress?: Address;
  pickUpLocation: string;
  returnLocation: string;
  campers: Camper[];
};

export type RawData = {
  "Submission Date": string;
  ROUTE: string;
  "STOP NUMBER": string;
  "ROUTE-R": string;
  "STOP NUMBER-R": string;
  "Family Name": string;
  "Parent Email Address": string;
  "Cell Phone Number": string;
  "Home Phone Number": string;
  "Street Address": string;
  "Street Address Line 2": string;
  City: string;
  State: string;
  "Zip Code": string;
  "RETURN Street Address": string;
  "RETURN Street Address Line 2": string;
  "RETURN City": string;
  "RETURN State": string;
  "RETURN Zip Code": string;
  "Name of Development (if any)": string;
  "Please list Cross Streets, Landmarks": string;
  "Special Instructions (anything else we should know)": string;
  "How many campers and/or staff members do you have?": string;
  "First Name": string;
  "Last Name": string;
  "Camper/Staff 1 Equinunk or Blue Ridge": string;
  "Camper/CA/CIT/Staff 1:": string;
  "How many bags for Camper 1?": string;
  "How many bags for CA/CIT/Staff 1?": string;
  "Camper/Staff 2 Name (First Name)": string;
  "Camper/Staff 2 Name (Last Name)": string;
  "Camper/Staff 2 Equinunk or Blue Ridge": string;
  "Camper/CA/CIT/Staff 2": string;
  "How many bags for Camper 2?": string;
  "How many bags for CA/CIT/Staff 2?": string;
  "Camper/Staff 3 Name (First Name)": string;
  "Camper/Staff 3 Name (Last Name)": string;
  "Camper/Staff 3 Equinunk or Blue Ridge": string;
  "Camper/CA/CIT/Staff 3": string;
  "How many bags for Camper 3?": string;
  "How many bags for CA/CIT/Staff 3?": string;
  "Camper/Staff 4 Name (First Name)": string;
  "Camper/Staff 4 Name (Last Name)": string;
  "Camper/Staff 4 Equinunk or Blue Ridge": string;
  "Camper/CA/CIT/Staff 4": string;
  "How many bags for Camper 4?": string;
  "How many bags for CA/CIT/Staff 4?": string;
  "Total Amount Due ($)": string;
  "If no one is home, pick up bags from:": string;
  "If no one is home, return bags to:": string;
  "Total Amount Due: Products": string;
  "Total Amount Due: Payer Info": string;
  "Submission ID": string;
};
