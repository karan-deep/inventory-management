export interface Inventory {
  stockNumber: number;
  year: number;
  make: number;
  model: string;
  trim: string;
  status: number;
  VIN: string;
  stockDate: Date;
}

export interface Token {
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
}
