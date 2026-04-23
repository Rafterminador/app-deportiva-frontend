export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    dateOfBirth: string;
    shippingAddress: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    user: User;
}
