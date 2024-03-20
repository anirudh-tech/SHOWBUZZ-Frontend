import useFetchData from '../../hooks/FetchData';
import TableComponent from '../../components/Table/TableComponent';
import { IMovie } from '../../interface/ITheatreMovie';
import { RiEyeLine } from 'react-icons/ri';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const TheatreSelectMovies = () => {
  const [open, setOpen] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const { data: movies } = useFetchData('/movie/listTheatreMovies');
  const tableHead = ['Id', 'Movie name', 'Date Of Release', 'View'];
  const HandleClick = async (id: any) => {

    // const { data: movieInfo } = useFetchData(`/movie/findMovie/${id}`);
    // console.log('id====>',id,movieInfo);
    setSelectedMovieId(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const filteredMovies = movies.map((movie: IMovie) => ({
    id: movie._id,
    name: movie.title,
    dateOfRelease: movie.dateOfRelease,
    view: <RiEyeLine className='cursor-pointer' onClick={() => HandleClick(movie._id)} />
  }))
  return (
    <>
      {
        open ? (
          <>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
          </>
        ) : (
          <TableComponent data={filteredMovies} tableHead={tableHead} />
        )
      }
    </>
  )
}

export default TheatreSelectMovies