import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IMovie } from "../../interface/ITheatreMovie";
import { addTheatreMovie } from "../../redux/actions/adminActions";
import toast, { Toaster } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import EditImage from "../../components/General/EditImage";
import { EditMoviesValidationSchema } from "../../schemas/EditMoviesValidationSchema";

interface Props {
  movie: IMovie
}

const AdminEditMovies = ({movie}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageChanged, setImageChanged] = useState(false)
  const [bannerChanged, setBannerChanged] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const initialValues = {
    title: movie.title,
    director: movie.director,
    genre: movie.genre,
    format: movie.format,
    languagesAvailable: movie.languagesAvailable,
    image: movie.image,
    banner: movie.banner,
    cast: movie.cast,
  }
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
      console.log(urlData,'urlData here')
      if(urlData.format === "jpg" ||  urlData.format === "png"){
        return urlData.url
      }else {
        return false;
      }
    } catch (err) {
      console.error(err)
    }
  }
  const { values, errors, touched, handleBlur, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: EditMoviesValidationSchema,
    onSubmit: async (values, action) => {
      console.log(values.image)
      
      setIsLoading(true)
      let image = values.image;
      let banner = values.banner;
      if(imageChanged){
        image = await imageUpload(values.image);
      }
      if(bannerChanged){
        banner = await imageUpload(values.banner);
      }
      if(image && banner) {
        const movieData: IMovie = {
          title: values.title,
          director: values.director,
          genre: values.genre,
          format: values.format,
          languagesAvailable: values.languagesAvailable,
          image: image,
          banner: banner,
          cast: values.cast,
          type: "theatre",
          dateOfRelease: new Date()
        };
        console.log(movieData,'movieData');
        const response = await dispatch((movieData))
        console.log(response, '----')
        setIsLoading(false)
        action.resetForm();
        navigate('/admin/theatre-movies')
      } else {
        toast.error('Enter Valid Image')
        setIsLoading(false)
      }
    }
  })
  return (
    <>
    <Toaster/>
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
          <div className='mb-4 gap-2 flex justify-evenly'>
            <div className='w-3/4'>
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
            <div className='w-3/4'>
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
          <div className='mb-4 flex gap-2 justify-evenly'>
            <div className='w-3/4'>
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
            <div className='w-3/4'>
              <label htmlFor='format' className='block text-sm font-medium text-white'>
                Format:
              </label>
              <select
                id='format'
                name='format'
                className='mt-1 p-2 w-full border rounded-md'
                value={values.format}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Format</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
              {errors.format && touched.format ? (<p className='text-red-700'>{errors.format}</p>) : null}
            </div>
          </div>


          <div className='mb-4 flex gap-2 justify-evenly'>
            <div className='w-3/4'>
              <label htmlFor='languages' className='block text-sm font-medium text-white'>
                Languages Available:
              </label>
              <input
                type='text'
                id='languagesAvailable'
                name='languagesAvailable'
                className='mt-1 p-2 w-full border rounded-md'
                placeholder='Enter the languages Available'
                value={values.languagesAvailable}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.languagesAvailable && touched.languagesAvailable ? (<p className='text-red-700'>{errors.languagesAvailable}</p>) : null}
            </div>
            <div className='w-3/4'>
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


          <div className='mb-4 flex gap-2 justify-evenly'>
            <div className='w-3/4'>
              <EditImage  id='image' title='Click to insert Image' changed={setImageChanged} image={movie.image} handleBlur={handleBlur} setFieldValue={setFieldValue} errors={errors} touched={touched} />
            </div>
            <div className='w-3/4'>
              <EditImage id='banner' title='Click to insert Banner' changed={setBannerChanged} image={movie.banner} handleBlur={handleBlur} setFieldValue={setFieldValue} errors={errors} touched={touched} />
            </div>
          </div>
          <div className='text-center'>
            <button className='bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-900' type="submit">Submit</button>
          </div>
        </form>
      )
      }
    </>
  )
}

export default AdminEditMovies