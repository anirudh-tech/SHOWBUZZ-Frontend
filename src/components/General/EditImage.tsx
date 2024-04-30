import React, { useEffect, useState } from 'react';
import { BsCardImage } from 'react-icons/bs'


interface Props {
    id:string;
    title: string;
    setFieldValue: any;
    handleBlur: any;
    errors: any;
    touched: any;
    image: string;
    changed: any
}
const EditImage = ({id,title,setFieldValue, changed, handleBlur, errors,image, touched}: Props) => {
    const [imageUrl, setImageUrl] = useState<any>(null);

    useEffect(() => {
      if(image) {
        setImageUrl(image)
      }
    },[image])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        changed(true)
        if (file) {
            setFieldValue(id, file);

            // Create a URL for the selected image
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };
    return (
        <>
            <label htmlFor={id} className='block text-sm font-medium text-white'>
                <div className='border-dashed border-2 text-center py-8  border-gray-600 px-4 rounded-lg'>
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className='mx-auto h-20' />
                    ) : (
                        <BsCardImage className='text-6xl mx-auto' />
                    )}
                    
                    <h1 className='font-roboto mt-3'>{title}</h1>
                </div>
            </label>
            <input
                type='file'
                id={id}
                name={id}
                className='mt-1 p-2 w-full border rounded-md hidden'
                onChange={handleImageChange}
                onBlur={handleBlur}
            />
            {errors.banner && touched.banner ? (<p className='text-red-700'>{errors.banner}</p>) : null}
        </>
    )
}

export default EditImage