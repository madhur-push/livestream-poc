import { useEffect, useRef } from "react";

const VideoPlayer = ({ videoStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
        let video = videoRef.current;
        video.srcObject = videoStream;
        video.play();
    }
  }, [videoRef, videoStream]);

  return <video ref={videoRef} width="300" controls />;
};

export default VideoPlayer;
