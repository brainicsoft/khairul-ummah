// lifetimeDonor.model.ts
export interface ILifetimeDonor {
  name: string;
  email?: string;
  phone: string;

  amount: number;  
  address?: string;      
  profession?: string;  
  message?: string;     
  termsAccepted: boolean;
  slug?: string;

  // update your content here 
}

  