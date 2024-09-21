export interface User {
    userID: number | undefined | null;  // Corresponds to long userID
    firstName: string | undefined | null; // Corresponds to String firstName
    lastName: string | undefined | null;  // Corresponds to String lastName
    phoneNumber: string | undefined | null; // Corresponds to String phoneNumber
    email: string | undefined | null;       // Corresponds to String email
    password: string | undefined | null;    // Corresponds to String password
}