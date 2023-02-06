import { useState, useRef } from "react";
import { Player } from "@livepeer/react";

const Playback = () => {
  const [playbackId, setPlaybackId] = useState("");
  const inputEl = useRef(null);

  const initiatePlaybackHandler = () => {
    const newPlaybackId = inputEl?.current?.value;
    if (newPlaybackId) {
      setPlaybackId(newPlaybackId);
    }
  };

  return (
    <div className="Stream">
      <input
        className="Stream-input"
        ref={inputEl}
        type="text"
        placeholder="Playback ID"
      />
      <div className="Stream-video" style={{ color: "white" }}>
        {playbackId ? (
          <Player
            title="Incoming Video"
            playbackId={playbackId}
            showPipButton
          />
        ) : (
          <>Please enter a playback Id.</>
        )}
      </div>
      <button className="Stream-button" onClick={initiatePlaybackHandler}>
        Start Playback
      </button>
    </div>
  );
};

export default Playback;
