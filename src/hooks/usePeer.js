import React, { useEffect, useState } from "react";
import { Peer } from "peerjs";
import useStreamStore from "../store/useStreamStore";

const usePeer = () => {
  const { localStream, addIncomingStream } = useStreamStore((state) => ({
    localStream: state.localStream,
    addIncomingStream: state.addIncomingStream,
  }));

  const [myPeer, setMyPeer] = useState();
  const [myPeerID, setMyPeerID] = useState();

  const cleanUp = () => {
    if (myPeer !== null) {
      myPeer.disconnect();
      myPeer.destroy();
    }
    setMyPeer(null);
    setMyPeerID(null);
  };

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => {
      console.log("peer", newPeer);
      console.log("peer id", newPeer.id);
      setMyPeer(newPeer);
      setMyPeerID(newPeer.id);
    });

    // on recieving message
    newPeer.on("connection", (connection) => {
      console.log("we got connection");
      connection.on("data", (data) => {
        console.log("data recieved", data);
      });
    });

    newPeer.on("disconnected", () => {
      console.log("Peer disconnected");
      cleanUp();
    });

    newPeer.on("close", () => {
      console.log("Peer closed remotely");
      cleanUp();
    });

    newPeer.on("error", (error) => {
      console.log("peer error", error);
      cleanUp();
    });
  }, []);

  useEffect(() => {
    if (localStream && myPeer) {
      // on recieving video call
      myPeer.on("call", (call) => {
        console.log("call received");
        console.log("local stream while recieving", localStream);

        call.answer(localStream); // Answer the call with an A/V stream.

        console.log("incoming call ", call);

        const remotePeerId = call.peer;

        let id; // dirty fix for stream callback getting invoked twice
        // reference - https://github.com/peers/peerjs/issues/781#issuecomment-766094333
        call.on("stream", (newIncomingStream) => {
          if (id !== newIncomingStream.id) {
            id = newIncomingStream.id;
            console.log("call answered");
            console.log(
              "ADD INCOMING STREAM ABOUT TO BE TRIGGERED WHILE RECIEVING A CALL"
            );
            addIncomingStream({
              stream: newIncomingStream,
              peerId: remotePeerId,
            });
          }
        });
      });
    }
  }, [addIncomingStream, localStream, myPeer]);

  return [myPeer, myPeerID];
};

export default usePeer;
