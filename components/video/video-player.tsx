import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  videoWidth: number;
  videoHeight: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, videoWidth, videoHeight }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="custom-video-player">
      <video
        ref={videoRef}
        width={videoWidth}
        height={videoHeight}
        controls
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;