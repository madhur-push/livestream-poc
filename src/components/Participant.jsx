import { useRef, useState } from "react";
import usePeer from "../hooks/usePeer";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import VideoPlayer from "./VideoPlayer";
import { useEffect } from "react";
import useStreamStore from "../store/useStreamStore";

const Participant = ({ isHost = false }) => {
  const { localStream, addLocalStream, incomingStreams, addIncomingStream } = useStreamStore((state) => ({
    localStream: state.localStream,
    addLocalStream: state.addLocalStream,
    incomingStreams: state.incomingStreams,
    addIncomingStream: state.addIncomingStream,
  }));

  const peerIdInputRef = useRef();
  const [myPeer, myPeerId] = usePeer();

  const connectParticipantHandler = async () => {
    try {
      const connectPeerId = peerIdInputRef.current.value;
      console.log("connectPeerId", connectPeerId);
      console.log("local stream while calling", localStream);

      // connecting with remote peer to send a message
      var connection = myPeer.connect(connectPeerId);
      connection.on("open", () => {
        connection.send('Sender -> '+myPeerId);
      });


      // calling remote peer with local stream
      const call = myPeer.call(connectPeerId, localStream);
      call.on("stream", (newIncomingStream) => {
        console.log("V/A connection with", connectPeerId, "successful");
        addIncomingStream({stream: newIncomingStream, peerId: connectPeerId});
      });

      //  handling error
      call.on("error", (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error("Failed to get local stream", err);
    }
  };

  useEffect(() => {
    // retrieving my stream and setting the localStream present in global state
    const getMyStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("local stream retrieved in react component", localStream);
        addLocalStream(localStream);
      } catch (err) {
        console.error("error:", err);
      }
    };
    getMyStream();
  }, [addLocalStream]);

  return (
    <Flex direction="column" align="center">
      <Heading marginY="2%">{isHost ? "Host" : "Participant"}</Heading>
      <Text marginY="1%">peer Id - {myPeerId}</Text>

      <Flex marginY="2%" direction="column" width="20%">
        <Input
          placeholder="enter a peer id to connect with"
          ref={peerIdInputRef}
        />
        <Button onClick={connectParticipantHandler} marginY="1rem">
          Call
        </Button>
      </Flex>

      <Text marginY="1%">My Stream</Text>
      {localStream ? (
        <VideoPlayer videoStream={localStream} />
      ) : (
        "Loading local stream..."
      )}

      <Flex wrap="wrap">
        {incomingStreams.length !== 0
          ? incomingStreams.map(({stream: incomingStream, peerId: id}) => (
              <VideoPlayer key={id} videoStream={incomingStream} />
            ))
          : "No connected participants as of now."}
      </Flex>
    </Flex>
  );
};

export default Participant;
