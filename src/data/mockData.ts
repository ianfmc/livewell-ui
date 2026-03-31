export type ContractCard = {
  instrument: string;
  strike: string;
  expiry: string;
  status: string;
};

export const mockData: ContractCard[] = [
  {
    instrument: "EUR/USD",
    strike: "1.0850",
    expiry: "10:00 AM",
    status: "Open",
  },
  {
    instrument: "GBP/USD",
    strike: "1.2650",
    expiry: "11:00 AM",
    status: "Open",
  },
  {
    instrument: "USD/JPY",
    strike: "150.00",
    expiry: "09:30 AM",
    status: "Review",
  },
];