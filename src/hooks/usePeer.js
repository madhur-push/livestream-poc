import React, { useEffect, useState } from "react";
import { Peer } from "peerjs";

const usePeer = () => {
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
    }
      const peer = myPeer ? myPeer : new Peer();

      peer.on('open', () => {
          console.log(peer);
          console.log(peer.id);
          setPeer(peer);
          setMyPeerID(peer.id);
      })

      peer.on("connection", (connection) => {
        console.log("we got connection");
        connection.on("data", (data) => {
          // Will print 'hi!'
          console.log("got data", data);
        });
      });

      peer.on('disconnected', () => {
          console.log("Peer disconnected");
          cleanUp()
      });

      peer.on('close', () => {
          console.log("Peer closed remotely");
          cleanUp()
      });

      peer.on('error', (error) => {
          console.log("peer error", error);
          cleanUp()
      });
    }, [myPeer])

    return [myPeer, myPeerID];
}

export default usePeer;