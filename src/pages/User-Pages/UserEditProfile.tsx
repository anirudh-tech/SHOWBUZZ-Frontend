import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IUserSelector } from '../../interface/IUserSlice';
import dummyUser from '../../assets/dummyUser.png'
import { AppDispatch } from '../../redux/store';
import { listUser, updateUser } from '../../redux/actions/userActions';

const UserEditProfile = () => {
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const data = useSelector((state: IUserSelector) => state.user?.userDetails);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState(data?.username)
  const dispatch = useDispatch<AppDispatch>();
  console.log("🚀 ~ file: UserEditProfile.tsx:19 ~ UserEditProfile ~ data:", data)

  useEffect(() => {
    dispatch(listUser(id))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])


  console.log("🚀 ~ file: UserEditProfile.tsx:14 ~ UserEditProfile ~ response:", data)
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.currentTarget.files?.[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'trpocbuj');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/daob5eure/image/upload', {
        method: 'post',
        body: formData,
      })
      const urlData = await res.json()
      console.log(urlData, 'urlData here')
      if (urlData.format === "jpg" || urlData.format === "png") {
        setImageUrl(urlData.url);
        const values = {
          imageUrl: urlData.url,
          id
        }
        await dispatch(updateUser(values))
      } else {
        return false;
      }
    } catch (err) {
      console.error(err)
    }
  };


  const onblur = () => {
    setMessage("")
  }

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      const values = {
        username,
        id
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await dispatch(updateUser(values)).then((response: any) => {
        setMessage("")
      })
    }
  };


  return (
    <div className='pt-20'>
      <h1 className='text-white text-3xl text-center '>USER PROFILE</h1>
      <div className=' flex justify-center pt-10'>
        <div className='md:flex-row flex flex-col justify-center items-center w-full  md:w-1/2'>
          <div className=' p-4 w-1/2 '>
            <label htmlFor={id} className=''>
              <div className='text-center'>
                {imageUrl ? (
                  <div className='p-10 flex  flex-col gap-6 '>
                    <img src={imageUrl} className='mx-auto w-full h-full rounded-full  ' />
                    <h1 className=' cursor-pointer text-white py-1.5 hover:bg-white hover:text-black rounded-md border-2 border-gray-400'>Change Image</h1>
                  </div>
                ) : (
                  <div className='p-10 flex flex-col gap-6'>
                    <img src={dummyUser} className='mx-auto' />
                    <h1 className='cursor-pointer text-white py-1.5 hover:bg-white hover:text-black rounded-md border-2 border-gray-400'>Upload New Image</h1>
                  </div>
                )}
              </div>
            </label>
            <input
              type='file'
              id={id}
              name={id}
              className='mt-1 p-2 w-full border rounded-md hidden'
              onChange={handleImageChange}
            />
          </div>
          <div className=' p-4 w-1/2 flex flex-col items-center gap-5 justify-center'>
            <label htmlFor='username' className='block text-sm font-medium text-white'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              defaultValue={data?.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setMessage("Hit 'Enter' after updating")}
              onBlur={() => onblur()}
              onKeyDown={handleKeyDown}
              className='mt-1 p-2 w-full border rounded-md'
            />
            {message && <p className='text-green-700'>{message}</p>}
            <label htmlFor='email' className='block text-sm font-medium text-white'>
              Email
            </label>
            <input
              disabled
              type='email'
              id='email'
              name='email'
              value={data?.email}
              className='mt-1 p-2 w-full border rounded-md'

            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEditProfile