import { useFormik } from 'formik';
import ImageUpload from '../General/ImageUpload';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader'
import toast, { Toaster } from 'react-hot-toast';
import VideoUpload from '../General/VideoUpload';
import { AddOttMoviesValidationSchema } from '../../schemas/AddOttMoviesValidationSchema';
import { addOttMovie } from '../../redux/actions/adminActions';

const initialValues = {
  title: '',
  director: '',
  genre: '',
  video: '',
  banner: '',
  cast: '',
}

const AdminAddOttMoviesForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()




  const imageUpload = async (image: any) => {
    console.log(image, '-=-==-=-=-===-=-=--=');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'trpocbuj');
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/daob5eure/image/upload', {
        method: 'post',
        body: formData,
      })
      const urlData = await res.json()
      console.log(urlData, 'urlData here')
      if (urlData.format === "jpg" || urlData.format === "png") {
        return urlData.url
      } else {
        return false;
      }
    } catch (err) {
      console.error(err)
    }
  }
  const { values, errors, touched, handleBlur, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: AddOttMoviesValidationSchema,
    onSubmit: async (values, action) => {
      console.log("🚀 ~ file: AdminAddOttMoviesForm.tsx:55 ~ onSubmit: ~ values:", values)
      
      setIsLoading(true)
      const banner = await imageUpload(values.banner);
      if (banner) {
        const movieData: any = {
          title: values.title,
          director: values.director,
          genre: values.genre,
          banner: banner,
          cast: values.cast,
          video: values.video
        };
        console.log(movieData, 'movieData');
        const response = await dispatch(addOttMovie(movieData))
        console.log(response, '----')
        setIsLoading(false)
        action.resetForm();
        navigate('/admin/stream-movies')
      } else {
        toast.error('Enter Valid Image')
        setIsLoading(false)
      }
    }
  })
  return (
    < div className=''>
      <Toaster />
      {
        isLoading ? (
          <div className='absolute inset-0 bg-black/60 w-full h-full flex justify-center'>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-center'>
                <BeatLoader
                  color="#36d7b7"
                  loading
                  margin={0}
                  size={15}
                />
              </div>
            </div>
          </div>
        ) : (
          <form className='mt-4' onSubmit={handleSubmit}>
            <div className='mb-4 flex justify-evenly'>
              <div className='w-1/3'>
                <label htmlFor='title' className='block text-sm font-medium text-white'>
                  Title:
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='mt-1 p-2 w-full border rounded-md'
                  placeholder='Enter the title of  the movie'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (<p className='text-red-700'>{errors.title}</p>) : null}
              </div>
              <div className='w-1/3'>
                <label htmlFor='director' className='block text-sm font-medium text-white'>
                  Director:
                </label>
                <input
                  type='text'
                  id='director'
                  name='director'
                  className='mt-1 p-2 w-full border rounded-md'
                  placeholder='Enter the directors name'
                  value={values.director}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.director && touched.director ? (<p className='text-red-700'>{errors.director}</p>) : null}
              </div>
            </div>
            <div className='mb-4 flex justify-evenly'>
              <div className='w-1/3'>
                <label htmlFor='genre' className='block text-sm font-medium text-white'>
                  Genre:
                </label>
                <input
                  type='text'
                  id='genre'
                  name='genre'
                  className='mt-1 p-2 w-full border rounded-md'
                  placeholder='Enter the genres'
                  value={values.genre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.genre && touched.genre ? (<p className='text-red-700'>{errors.genre}</p>) : null}
              </div>
              <div className='w-1/3'>
                <label htmlFor='cast' className='block text-sm font-medium text-white'>
                  Cast:
                </label>
                <input
                  type='text'
                  id='cast'
                  name='cast'
                  className='mt-1 p-2 w-full border rounded-md'
                  placeholder='Enter the Cast of Movie'
                  value={values.cast}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cast && touched.cast ? (<p className='text-red-700'>{errors.cast}</p>) : null}
              </div>
            </div>
            <div className='mb-4 flex justify-evenly'>
              <div className='w-1/3'>
                <VideoUpload id='video' title='Click to upload Video' handleBlur={handleBlur} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </div>
              <div className='w-1/3'>
                <ImageUpload id='banner' title='Click to insert Banner' handleBlur={handleBlur} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </div>
            </div>
            <div className='text-center'>
              <button className='bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-900' type="submit">Submit</button>
            </div>
          </form>
        )
      }

    </div>
  )
}

export default AdminAddOttMoviesForm