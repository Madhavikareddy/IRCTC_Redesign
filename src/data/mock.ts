import { TrainResult } from "@/context/BookingContext";

export const popularStations = [
  { code: "NDLS", name: "New Delhi" },
  { code: "MAS", name: "Chennai Central" },
  { code: "CSTM", name: "Mumbai CSMT" },
  { code: "HWH", name: "Howrah Junction" },
  { code: "BLR", name: "Bangalore City" },
  { code: "PNBE", name: "Patna Junction" },
  { code: "LKO", name: "Lucknow" },
  { code: "JP", name: "Jaipur" },
  { code: "ADI", name: "Ahmedabad" },
  { code: "SC", name: "Secunderabad" },
  { code: "BPL", name: "Bhopal" },
  { code: "CNB", name: "Kanpur Central" },
  { code: "AGC", name: "Agra Cantt" },
  { code: "GHY", name: "Guwahati" },
  { code: "TVC", name: "Thiruvananthapuram" },
];

export const classOptions = [
  { code: "SL", name: "Sleeper" },
  { code: "3A", name: "AC 3 Tier" },
  { code: "2A", name: "AC 2 Tier" },
  { code: "1A", name: "AC First Class" },
  { code: "CC", name: "AC Chair Car" },
  { code: "2S", name: "Second Sitting" },
];

export const quotaOptions = [
  { code: "general", name: "General" },
  { code: "ladies", name: "Ladies" },
  { code: "tatkal", name: "Tatkal" },
  { code: "premium-tatkal", name: "Premium Tatkal" },
  { code: "lower-berth", name: "Lower Berth (Senior Citizen)" },
  { code: "divyaang", name: "Person with Disability" },
];

export const mockTrains: TrainResult[] = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12301",
    departureTime: "16:55",
    arrivalTime: "10:25",
    duration: "17h 30m",
    departureStation: "NDLS",
    arrivalStation: "HWH",
    classes: [
      { code: "1A", name: "AC First Class", fare: 4215, availability: "available", availableSeats: 12 },
      { code: "2A", name: "AC 2 Tier", fare: 2470, availability: "available", availableSeats: 34 },
      { code: "3A", name: "AC 3 Tier", fare: 1780, availability: "waitlist", waitlistNumber: 8 },
    ],
  },
  {
    id: "2",
    name: "Duronto Express",
    number: "12273",
    departureTime: "20:05",
    arrivalTime: "10:50",
    duration: "14h 45m",
    departureStation: "NDLS",
    arrivalStation: "HWH",
    classes: [
      { code: "2A", name: "AC 2 Tier", fare: 2595, availability: "available", availableSeats: 6 },
      { code: "3A", name: "AC 3 Tier", fare: 1850, availability: "available", availableSeats: 22 },
      { code: "SL", name: "Sleeper", fare: 715, availability: "rac" },
    ],
  },
  {
    id: "3",
    name: "Poorva Express",
    number: "12303",
    departureTime: "16:30",
    arrivalTime: "14:10",
    duration: "21h 40m",
    departureStation: "NDLS",
    arrivalStation: "HWH",
    classes: [
      { code: "2A", name: "AC 2 Tier", fare: 2190, availability: "available", availableSeats: 48 },
      { code: "3A", name: "AC 3 Tier", fare: 1545, availability: "available", availableSeats: 118 },
      { code: "SL", name: "Sleeper", fare: 580, availability: "available", availableSeats: 204 },
    ],
  },
  {
    id: "4",
    name: "Sealdah Rajdhani",
    number: "12313",
    departureTime: "16:25",
    arrivalTime: "10:05",
    duration: "17h 40m",
    departureStation: "NDLS",
    arrivalStation: "HWH",
    classes: [
      { code: "1A", name: "AC First Class", fare: 4375, availability: "unavailable" },
      { code: "2A", name: "AC 2 Tier", fare: 2545, availability: "waitlist", waitlistNumber: 24 },
      { code: "3A", name: "AC 3 Tier", fare: 1825, availability: "waitlist", waitlistNumber: 42 },
    ],
  },
  {
    id: "5",
    name: "Kalka Mail",
    number: "12311",
    departureTime: "07:40",
    arrivalTime: "10:30",
    duration: "26h 50m",
    departureStation: "NDLS",
    arrivalStation: "HWH",
    classes: [
      { code: "2A", name: "AC 2 Tier", fare: 1980, availability: "available", availableSeats: 15 },
      { code: "3A", name: "AC 3 Tier", fare: 1390, availability: "available", availableSeats: 67 },
      { code: "SL", name: "Sleeper", fare: 510, availability: "available", availableSeats: 312 },
    ],
  },
];
