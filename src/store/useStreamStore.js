import { create } from "zustand";

const useStreamStore = create((set) => ({
  // local stream from browser
  localStream: null,

  // remote streams
  incomingStreams: [],

  // livestream playback Id from livepeer
  liveStreamPlaybackId:null,

  addLocalStream: (localStream) => {
    set(() => ({
      localStream,
    }));
  },
  removeLocalStream: () => {
    set(() => ({
      localStream: null,
    }));
  },

  addIncomingStream: ({
    peerId: incomingPeerId,
    stream: newIncomingStream,
  }) => {
    console.log(
      "addImcomingStream triggered ",
      incomingPeerId,
      newIncomingStream
    );
    set((state) => ({
      incomingStreams: [
        ...state.incomingStreams,
        { peerId: incomingPeerId, stream: newIncomingStream },
      ],
    }));
  },
  removeIncomingStream: (removePeerId) =>
    set((state) => ({
      incomingStreams: state.incomingStreams.filter(
        (incomingStream) => incomingStream.peerId !== removePeerId
      ),
    })),
    
  addLiveStreamPlaybackId: (newPlaybackId) => 
  set(
    () => ({
      liveStreamPlaybackId: newPlaybackId
    })
  )
}));

export default useStreamStore;
