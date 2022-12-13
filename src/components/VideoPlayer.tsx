import { Player } from '@livepeer/react';
 
export const VideoPlayer = () => {
  return (
    <Player
      title="Incoming Video"
      playbackId={process.env.REACT_APP_PLAYBACK_ID}
      showPipButton
    />
  );
};