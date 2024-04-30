export interface IMovie {
  _id?: string;
  title: string;
  director: string;
  genre: string;
  format: string[];
  languagesAvailable: string;
  image: string;
  banner: string
  cast: string;
  type: string;
  status?: string;
  dateOfRelease: Date;
}

export interface IProps {
  selectedDateTimes: IDate[];
  selectedLanguages?: string[];
  selectedFormats?: string[];
  movieId?: IMovie;
  theatreId?: string;
}

export interface IScreen {
  _id: string,
  screenName: string;
  seatCost: number;
  availableSeats: string ,
  selectedMovies: IProps[]
}

export interface ITheatre {
  _id: string;
  username: string;
  email: string;
  password: string;
  screens: IScreen[];
  availableSeats: string;
  totalAmountPaid: number;
  createdAt: Date;
  status: string;
}

export interface IDate{
  date:string;
  selectedTimes: ITime[];
}

export interface ITime{
  hour: number;
  min: number;
}
