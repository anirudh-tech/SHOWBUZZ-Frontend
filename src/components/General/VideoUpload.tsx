import React, { useState } from 'react';


interface Props {
    id:string;
    title: string;
    setFieldValue: any;
    handleBlur: any;
    errors: any;
    touched: any;
}
const VideoUpload = ({id,title,setFieldValue,handleBlur, errors, touched}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [videoUrl, setVideoUrl] = useState<any>(null);

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];

        if (file) {
            setFieldValue(id, file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
        }
    };
    return (
        <>
            <label htmlFor={id} className='block text-sm font-medium text-white'>
                <div className='border-dashed border-2 text-center py-8  border-gray-600 px-4 rounded-lg'>
                    <h1 className='font-roboto mt-3'>{title}</h1>
                </div>
            </label>
            <input
                type='file'
                id={id}
                name={id}
                className='mt-1 p-2 w-full border rounded-md hidden'
                onChange={handleVideoChange}
                onBlur={handleBlur}
            />
            {errors.banner && touched.banner ? (<p className='text-red-700'>{errors.banner}</p>) : null}
        </>
    )
}

export default VideoUpload