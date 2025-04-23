// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  VOLUNTEER = 'VOLUNTEER',
}

// Hamper Types
export interface Hamper {
  id: string;
  name: string;
  description?: string;
  contents: HamperItem[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HamperItem {
  name: string;
  quantity: number;
  category?: string;
}

// Recipient Types
export interface Recipient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address: Address;
  notes?: string;
  photoUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

// Delivery Types
export interface Delivery {
  id: string;
  hamperId: string;
  recipientId: string;
  status: DeliveryStatus;
  assignedTo?: string;
  scheduledDate?: string;
  deliveryDate?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Authentication Types
export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface ConfirmSignUpRequest {
  username: string;
  code: string;
}

export interface ForgotPasswordRequest {
  username: string;
}

export interface ForgotPasswordSubmitRequest {
  username: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// Report Types
export interface DeliveryReport {
  totalDeliveries: number;
  deliveredCount: number;
  pendingCount: number;
  failedCount: number;
  deliveriesByDate: Record<string, number>;
}

export interface RecipientReport {
  totalRecipients: number;
  recipientsByCity: Record<string, number>;
}

export interface HamperReport {
  totalHampers: number;
  hampersByCategory: Record<string, number>;
}
