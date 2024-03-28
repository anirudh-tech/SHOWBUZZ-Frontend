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

export interface IProps {
  screenName: string;
  selectedDateTimes?: IDate[];
  selectedLanguages?: string[];
  selectedFormats?: string[];
  movieId?: string ;
  theatreId?: string;
}

export interface ITheatre {
  _id: string;
  username: string;
  email: string;
  password: string;
  screens: IProps[];
  availableSeats: string;
  totalAmountPaid: number;
  createdAt: Date;
}

export interface IDate{
  date:string;
  selectedTimes: ITime[];
}

export interface ITime{
  hour: number;
  min: number;
}
