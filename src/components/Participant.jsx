import { useRef } from "react";
import usePeer from "../hooks/usePeer";
import { Button, Divider, Flex, Heading, Input, Text } from "@chakra-ui/react";
import VideoPlayer from "./VideoPlayer";
import { useEffect } from "react";
import useStreamStore from "../store/useStreamStore";
import getMergedStreams from "../utils/getMergedStreams";

const Participant = ({ isHost = false }) => {
  const {
    localStream,
    liveStreamPlaybackId,
    addLocalStream,
    incomingStreams,
    addIncomingStream,
  } = useStreamStore((state) => ({
    localStream: state.localStream,
    liveStreamPlaybackId: state.liveStreamPlaybackId,
    addLocalStream: state.addLocalStream,
    incomingStreams: state.incomingStreams,
    addIncomingStream: state.addIncomingStream,
  }));

  // const [liveStream, setLiveStream] = useState(null);

  const peerIdInputRef = useRef();
  const [myPeer, myPeerId] = usePeer();

  const connectParticipantHandler = () => {
    try {
      const connectPeerId = peerIdInputRef.current.value;
      console.log("connectPeerId", connectPeerId);
      console.log("local stream while calling", localStream);

      // connecting with remote peer to send a message
      var connection = myPeer.connect(connectPeerId);
      connection.on("open", () => {
        connection.send("Sender -> " + myPeerId);
      });

      // calling remote peer with local stream
      const call = myPeer.call(connectPeerId, localStream);
      let id; // dirty fix for stream callback getting invoked twice
      // reference - https://github.com/peers/peerjs/issues/781#issuecomment-766094333
      call.on("stream", (newIncomingStream) => {
        if (id !== newIncomingStream.id) {
          id = newIncomingStream.id;
          console.log("V/A connection with", connectPeerId, "successful");
          console.log("new incoming stream id", id);
          console.log(
            "ADD INCOMING STREAM ABOUT TO BE TRIGGERED WHILE CALLING"
          );
          addIncomingStream({
            stream: newIncomingStream,
            peerId: connectPeerId,
          });
        }
      });

      //  handling error
      call.on("error", (err) => {
        console.log(err);
      });
    } catch (err) {
      console.error("Failed to get local stream", err);
    }
  };

  const startLiveStream = async () => {
    // stitch the streams
    // setLiveStream(getMergedStreams(localStream, incomingStreams));
    const mergedStreams = getMergedStreams(localStream, incomingStreams);

    // upload to live peer
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
    <Flex direction="column" align="center" paddingBottom={2}>
      <Heading marginY="2%">{isHost ? "Host" : "Participant"}</Heading>
      <Text marginY="1%">peer Id - {myPeerId}</Text>

      <Flex marginY="1%" direction="column" width="20%">
        <Input
          placeholder="enter a peer id to connect with"
          ref={peerIdInputRef}
        />
        <Button onClick={connectParticipantHandler} marginY="1rem">
          Call
        </Button>
      </Flex>

      <Divider />

      <Text marginTop={1} marginBottom={2}>
        Remote Stream(s)
      </Text>
      <Flex wrap="wrap" border="2px solid grey" padding={2} marginBottom={4}>
        {incomingStreams.length !== 0
          ? incomingStreams.map(({ stream: incomingStream, peerId: id }) => (
              <VideoPlayer key={id} videoStream={incomingStream} />
            ))
          : "No connected participants as of now."}
      </Flex>

      <Divider />

      {isHost && (
        <Flex direction="column" align="center" my={5}>
          <Button mb={3} onClick={startLiveStream}>
            Start Live Stream
          </Button>
          <Text marginY="1%">Playback Id</Text>
          <Text>{liveStreamPlaybackId ? liveStreamPlaybackId : ""}</Text>
          {/* <Text marginY="1%">Live Stream Output</Text>
          {liveStream ? (
            <VideoPlayer videoStream={liveStream} />
          ) : (
            "Live stream not started yet"
          )} */}
        </Flex>
      )}

      <Divider />

      <Text marginY="1%">Local Stream</Text>
      {localStream ? (
        <VideoPlayer videoStream={localStream} />
      ) : (
        "Loading local stream..."
      )}
    </Flex>
  );
};

export default Participant;
