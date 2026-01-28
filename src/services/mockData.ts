import type { User, UserStatus } from '../types/user.types';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar'];
const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const genders = ['Male', 'Female'] as const;
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'] as const;
const educationLevels = ['B.Sc', 'M.Sc', 'PhD', 'HND', 'OND'];
const employmentStatuses = ['Employed', 'Unemployed', 'Self-employed'];
const sectors = ['FinTech', 'Agriculture', 'Healthcare', 'Education', 'Technology', 'Retail'];
const residenceTypes = ["Parent's Apartment", 'Own Apartment', 'Rented Apartment'];

const firstNames = [
  'Grace', 'Adedeji', 'Debby', 'Tosin', 'John', 'Mary', 'Peter', 'Sarah', 
  'Michael', 'Jennifer', 'David', 'Linda', 'James', 'Patricia', 'Robert',
  'Elizabeth', 'William', 'Susan', 'Richard', 'Jessica', 'Charles', 'Karen',
  'Joseph', 'Nancy', 'Thomas', 'Betty', 'Christopher', 'Margaret', 'Daniel',
  'Sandra', 'Matthew', 'Ashley', 'Anthony', 'Kimberly', 'Mark', 'Emily',
  'Donald', 'Donna', 'Steven', 'Michelle', 'Paul', 'Carol', 'Andrew', 'Amanda',
  'Joshua', 'Melissa', 'Kenneth', 'Deborah', 'Kevin', 'Stephanie'
];

const lastNames = [
  'Effiom', 'Wallace', 'Ogana', 'Dokunmu', 'Smith', 'Johnson', 'Williams', 
  'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark',
  'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott',
  'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker',
  'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter'
];

const banks = [
  'Providus Bank', 'GTBank', 'Access Bank', 'First Bank', 'Zenith Bank',
  'UBA', 'Wema Bank', 'Sterling Bank', 'Fidelity Bank', 'Union Bank'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhoneNumber(): string {
  return `080${Math.floor(10000000 + Math.random() * 90000000)}`;
}

function generateBVN(): string {
  return `${Math.floor(10000000000 + Math.random() * 90000000000)}`;
}

function generateAccountNumber(): string {
  return `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function generateIncome(): string {
  const amounts = [
    '₦200,000.00 - ₦400,000.00',
    '₦100,000.00 - ₦200,000.00',
    '₦400,000.00 - ₦600,000.00',
    '₦50,000.00 - ₦100,000.00',
    '₦600,000.00 - ₦800,000.00'
  ];
  return getRandomItem(amounts);
}

function generateBalance(): string {
  const balance = Math.floor(Math.random() * 10000000);
  return `₦${balance.toLocaleString()}.00`;
}

function generateUser(index: number): User {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}${index}`;
  const email = `${username}@${getRandomItem(['lendsqr', 'irorun', 'lendstar'])}.com`;
  
  return {
    id: `user_${index + 1}`,
    organization: getRandomItem(organizations),
    username,
    email,
    phoneNumber: generatePhoneNumber(),
    dateJoined: generateRandomDate(new Date(2019, 0, 1), new Date()),
    status: getRandomItem(statuses),
    
    fullName,
    bvn: generateBVN(),
    gender: getRandomItem([...genders]),
    maritalStatus: getRandomItem([...maritalStatuses]),
    children: Math.random() > 0.5 ? 'None' : `${Math.floor(Math.random() * 4) + 1}`,
    typeOfResidence: getRandomItem(residenceTypes),
    
    levelOfEducation: getRandomItem(educationLevels),
    employmentStatus: getRandomItem(employmentStatuses),
    sectorOfEmployment: getRandomItem(sectors),
    durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
    officeEmail: email,
    monthlyIncome: generateIncome(),
    loanRepayment: `${Math.floor(Math.random() * 100000)}`,
    
    twitter: `@${username}`,
    facebook: fullName,
    instagram: `@${username}`,
    
    guarantor: {
      fullName: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
      phoneNumber: generatePhoneNumber(),
      email: `guarantor_${username}@email.com`,
      relationship: getRandomItem(['Sister', 'Brother', 'Father', 'Mother', 'Friend', 'Colleague'])
    },
    
    tier: Math.floor(Math.random() * 3) + 1,
    bankName: getRandomItem(banks),
    accountNumber: generateAccountNumber(),
    accountBalance: generateBalance()
  };
}

// Function to generate 500 users
export const mockUsers: User[] = Array.from({ length: 500 }, (_, i) => generateUser(i));

// Function to calculate stats
export const mockStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.status === 'Active').length,
  usersWithLoans: Math.floor(mockUsers.length * 0.25),
  usersWithSavings: Math.floor(mockUsers.length * 0.4)
};