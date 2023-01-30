import { create } from "zustand";

const useStreamStore = create((set) => ({
  // local stream from browser
  localStream: null,

  // remote streams
  incomingStreams: [],

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
    
  // removeAllIncomingStreams: () =>
  // set(() => ({
  //   incomingStreams: []
  // })),
}));

export default useStreamStore;
