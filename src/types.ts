export interface User {
  id: number;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  email: string;
  isDriving: boolean;
}

export interface Place {
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}