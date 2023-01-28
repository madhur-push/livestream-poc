import React, { useEffect, useState } from "react";
import { Peer } from "peerjs";
import useStreamStore from "../store/useStreamStore";

const usePeer = () => {
  const { localStream, addIncomingStream } = useStreamStore((state) => ({
    localStream: state.localStream,
    addIncomingStream: state.addIncomingStream,
  }));

  const [myPeer, setPeer] = useState();
  const [myPeerID, setMyPeerID] = useState();

  useEffect(() => {
    const cleanUp = () => {
      if (myPeer) {
        myPeer.disconnect();
        myPeer.destroy();
      }
      setPeer(null);
      setMyPeerID(null);
    };
    const peer = myPeer ? myPeer : new Peer();

    peer.on("open", (id) => {
      console.log("peer", peer);
      console.log("peer id", peer.id);
      setPeer(peer);
      setMyPeerID(peer.id);
    });

    // on recieving message
    peer.on("connection", (connection) => {
      console.log("we got connection");
      connection.on("data", (data) => {
        console.log("data recieved", data);
      });
    });

    peer.on("disconnected", () => {
      console.log("Peer disconnected");
      cleanUp();
    });

    peer.on("close", () => {
      console.log("Peer closed remotely");
      cleanUp();
    });

    peer.on("error", (error) => {
      console.log("peer error", error);
      cleanUp();
    });
  }, [myPeer]);

  useEffect(() => {
    if (localStream) {
      const peer = myPeer ? myPeer : new Peer();

      // on recieving video call
      peer.on("call", (call) => {
        console.log("call received");
        console.log("local stream while recieving", localStream);

        call.answer(localStream); // Answer the call with an A/V stream.

        console.log("incoming call ", call);

        const remotePeerId = call.peer;

        call.on("stream", (newIncomingStream) => {
          console.log("call answered");
          addIncomingStream({ stream: newIncomingStream, peerId: remotePeerId });
        });
      });
    }
  }, [addIncomingStream, localStream, myPeer]);

  return [myPeer, myPeerID];
};

export default usePeer;
