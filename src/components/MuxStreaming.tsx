import React, { useState } from 'react';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';
import * as UpChunk from '@mux/upchunk';
import MuxPlayer from '@mux/mux-player-react';



interface MuxUploadResponse {
  id: string;
}

const MuxStreaming: React.FC = () => {
  const [file, setFile] = useState<any>(null);
  const [uploadResponse, setUploadResponse] = useState<MuxUploadResponse | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const handleUpload = async (): Promise<void> => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const response = await axios.get(
        'http://localhost:8000/movie/uploadVideo'
      );
      const upload = UpChunk.createUpload({
        endpoint: response.data.url,
        file: file,
        chunkSize: 5120,
      });
      upload.on('error', err => {
        console.error('💥 🙀', err.detail);
      });
      upload.on('progress', progress => {
        console.log('Uploaded', progress.detail, 'percent of this file.');
      });
      // subscribe to events
      upload.on('success', err => {
        console.log("Wrap it up, we're done here. 👋", err);
        // setUploadResponse(response.data as MuxUploadResponse);
        pollForPlaybackId(response.data.id);
        console.log("🚀 ~ file: MuxStreaming.tsx:28 ~ handleUpload ~ response:", response)
      });

    } catch (error) {
      console.error('Upload error:', error);
      // Handle upload errors gracefully (e.g., display error message)
    }
  };

  const pollForPlaybackId = async (uploadId: string): Promise<void> => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movie/getPlaybackId?uploadId=${uploadId}`);
        const playbackId = response.data.playback_id;

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

  return (
    <div className="streaming-container pt-16 h-screen text-white">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button className='bg-red-500 rounded p-3' onClick={handleUpload}>Upload Video</button>
      {uploadResponse && (
        <p>
          Video uploaded successfully! Playback ID: {uploadResponse.id}
        </p>
      )}
      {
        uploadResponse && uploadResponse.id && (
          <MuxPlayer
            playbackId={uploadResponse.id}
            streamType="on-demand"
            autoPlay
            style={{ width: '50%', height: 'auto' }}
          />
        )
      }
    </div>
  );
};

export default MuxStreaming;