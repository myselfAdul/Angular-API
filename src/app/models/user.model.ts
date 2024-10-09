// user.model.ts
export interface User {
    id: number;
    name: string;
    username: string; 
    email: string;
    address: {
      city: string;
      street: string; 
      state: string;  
      zipcode: string; 
    };
  }
  