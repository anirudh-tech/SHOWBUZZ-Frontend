export interface IMovie {
  _id?: string;
  title: string;
  director: string;
  genre: string;
  format: string;
  languagesAvailable: string;
  image: string;
  banner: string
  cast: string;
  type: string;
  dateOfRelease: Date;
}

export interface ITheatre {
  _id: string;
  username: string;
  email: string;
  password: string;
  selectedMovies: string[];
  availableSeats: string;
  totalAmountPaid: number;
  createdAt: Date;
}