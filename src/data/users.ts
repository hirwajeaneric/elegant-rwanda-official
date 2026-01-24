export type UserRole = "ADMIN" | "CONTENT_MANAGER" | "EDITOR";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

// Mock users data - in production, this would come from the database
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@elegantrwanda.com",
    name: "Admin User",
    role: "ADMIN",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "content@elegantrwanda.com",
    name: "Content Manager",
    role: "CONTENT_MANAGER",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    createdBy: "1",
  },
  {
    id: "3",
    email: "editor@elegantrwanda.com",
    name: "Editor User",
    role: "EDITOR",
    active: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    createdBy: "1",
  },
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

export const getAllUsers = (): User[] => {
  return mockUsers;
};

export const getUsersByRole = (role: UserRole): User[] => {
  return mockUsers.filter((user) => user.role === role);
};

export const getActiveUsers = (): User[] => {
  return mockUsers.filter((user) => user.active);
};
