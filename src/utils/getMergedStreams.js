import { VideoStreamMerger } from "video-stream-merger";

const getMergedStreams = (localStream, incomingStreams) => {
  const merger = new VideoStreamMerger({
    width: 800,
    height: 600,
  });

  // Add the local stream. Position it on the bottom left and resize it to 100x100.
  merger.addStream(localStream, {
    x: 0,
    y: merger.height - 100,
    width: 100,
    height: 100,
    mute: false,
    index: 1,
  });

  // Add the incoming streams one by one
  incomingStreams.forEach(({peerId, stream}, i) => {
    merger.addStream(stream, {
      x: i*160,
      y: 50,
      width: 150,
      height: 150,
      mute: false,
      index: 0,
    });
  });

  merger.start();

  return merger.result;
};

export default getMergedStreams;
