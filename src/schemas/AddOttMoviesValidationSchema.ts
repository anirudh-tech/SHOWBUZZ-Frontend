import * as yup from 'yup'

export  const AddOttMoviesValidationSchema = yup.object().shape({
    title: yup.string().min(2).max(30).required("Title is required!"),
    director: yup.string().min(1).max(50).required("Director name is required!"),
    genre: yup.string().required("Genre is required!"),
    video: yup
    .mixed()
    .required('Upload a video to continue'),
    banner: yup
    .mixed()
    .required('Banner is required'),
    cast: yup.string().required('Cast is required!'),
})