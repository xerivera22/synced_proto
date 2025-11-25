export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  students: string;
  features: string[];
  popular?: boolean;
}

export interface User {
  email: string;
  role: "admin" | "student" | "teacher" | "parent";
  loggedIn: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  schoolName: string;
  schoolAddress: string;
  schoolType: string;
  numberOfStudents: string;
  position: string;
  idDocument?: File;
  agreeToTerms: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface CheckoutFormData {
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
  email?: string;
  paypalEmail?: string;
  gcashNumber?: string;
  bankName?: string;
  accountNumber?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Role {
  icon: string;
  title: string;
  description: string;
  route: string;
}
