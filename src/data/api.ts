// Mock API: simulates network latency so loading and error states are visible.
// Replace these functions with real fetch calls when a backend is available.

export type User = {
  name: string;
  email: string;
};

export type Activity = {
  id: string;
  title: string;
  amount: number;
  date: string;
};

export type DashboardData = {
  monthlyRevenue: number;
  monthlyRevenueChange: number;
  activeUsers: number;
  activeUsersChange: number;
  averageTicket: number;
  averageTicketChange: number;
  satisfaction: number;
  satisfactionChange: number;
  revenueByMonth: {label: string; value: number}[];
  activity: Activity[];
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function signInRequest(email: string, password: string): Promise<User> {
  await wait(900);
  if (email.trim().toLowerCase() !== 'admin@demo.com' || password !== '123456') {
    throw new Error('INVALID_CREDENTIALS');
  }
  return {name: 'Admin', email: 'admin@demo.com'};
}

const randomBetween = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

export async function fetchDashboard(): Promise<DashboardData> {
  await wait(800);
  return {
    monthlyRevenue: randomBetween(42000, 58000),
    monthlyRevenueChange: randomBetween(3, 21),
    activeUsers: randomBetween(2700, 3400),
    activeUsersChange: randomBetween(-4, 15),
    averageTicket: randomBetween(7400, 9800) / 100,
    averageTicketChange: randomBetween(-6, 9),
    satisfaction: randomBetween(88, 97),
    satisfactionChange: randomBetween(-2, 5),
    revenueByMonth: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(label => ({
      label,
      value: randomBetween(31000, 57000),
    })),
    activity: [
      {id: '1', title: 'Pro plan · Marina Costa', amount: 129.0, date: '11:42'},
      {id: '2', title: 'Invoice INV-2087 paid', amount: 2480.0, date: '10:15'},
      {id: '3', title: 'Basic plan · Lucas Rocha', amount: 39.9, date: '09:30'},
      {id: '4', title: 'Refund · Order 7731', amount: -74.5, date: '08:05'},
      {id: '5', title: 'Team plan · Atlas Studio', amount: 599.0, date: 'Yesterday'},
    ],
  };
}
