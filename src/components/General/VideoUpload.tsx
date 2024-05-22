import React, { useState } from 'react';
import axios from 'axios';
import * as UpChunk from '@mux/upchunk';
import MuxPlayer from '@mux/mux-player-react';
import { BsCardImage } from 'react-icons/bs';

import Box from '@mui/material/Box';
import Modal from '../Modal/Modal';
import ProgressBar from '../ProgressBar/ProgressBar';


interface Props {
    id: string;
    title: string;
    setFieldValue: any;
    handleBlur: any;
    errors: any;
    touched: any;
}
interface MuxUploadResponse {
    id: string;
}
const VideoUpload = ({ id, title, setFieldValue, handleBlur, errors, touched }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [file, setFile] = useState<any>(null);
    const [uploadResponse, setUploadResponse] = useState<MuxUploadResponse | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsModalOpen(true);
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        try {
            const response = await axios.get(
                'http://localhost:8000/movie/uploadVideo'
            );
            const upload = UpChunk.createUpload({
                endpoint: response.data.url,
                file: selectedFile,
                chunkSize: 5120,
            });
            upload.on('error', err => {
                setIsModalOpen(false);
                console.error('💥 🙀', err.detail);
            });
            upload.on('progress', progress => {
                setUploadProgress(progress.detail);
                console.log('Uploaded', progress.detail, 'percent of this file.');
            });
            upload.on('success', err => {
                setIsModalOpen(false);
                console.log("Wrap it up, we're done here. 👋", err);
                pollForPlaybackId(response.data.id);
            });

        } catch (error) {
            console.error('Upload error:', error);
        }
    };
    const pollForPlaybackId = async (uploadId: string): Promise<void> => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:8000/movie/getPlaybackId?uploadId=${uploadId}`);
                const playbackId = response.data.playback_id;
                setFieldValue(id, playbackId);

                if (playbackId) {
                    console.log("🚀 ~ file: MuxStreaming.tsx:68 ~ interval ~ playbackId:", playbackId)
                    setUploadResponse({ id: playbackId });
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error fetching playback ID:', error);
            }
        }, 5000); // Poll every 5 seconds
    };

    const handleClose = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            {
                isModalOpen && (
                    <Modal open={isModalOpen} handleClose={handleClose} >
                        <h1>Please wait till the video gets uploaded...</h1>
                        <Box sx={{ width: '100%' }}>
                            <ProgressBar value={uploadProgress} />
                        </Box>
                    </Modal>
                )
            }

            <label htmlFor={id} className='block text-sm font-medium text-white'>
                <div className='border-dashed border-2 text-center py-8  border-gray-600 px-4 rounded-lg'>
                    {uploadResponse && uploadResponse.id ? (
                        <MuxPlayer
                            playbackId={uploadResponse.id}
                            streamType="on-demand"
                            autoPlay
                            style={{ width: '50%', height: 'auto' }}
                        />
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
                onChange={handleVideoChange}
                onBlur={handleBlur}
            />
            {errors.banner && touched.banner ? (<p className='text-red-700'>{errors.banner}</p>) : null}
        </>
    )
}

export default VideoUpload