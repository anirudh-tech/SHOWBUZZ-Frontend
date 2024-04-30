import * as yup from 'yup'

export const EditMoviesValidationSchema = yup.object().shape({
    title: yup.string().min(2).max(30).required("Title is required!"),
    director: yup.string().min(1).max(50).required("Director name is required!"),
    genre: yup.string().required("Genre is required!"),
    formats: yup.array().of(yup.string().oneOf(['3D', '2D'])).min(1, 'At least one format is required!'),
    languagesAvailable: yup.string().required('Language is required!'),
    image: yup
    .mixed()
    .required('Image is required'),
    banner: yup
    .mixed()
    .required('Image is required'),
    cast: yup.string().required('Language is required!'),
})