import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Player } from "@livepeer/react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { useRef, useState } from "react";

console.log("LIVEPEER_STUDIO_KEY", process.env.REACT_APP_LIVEPEER_STUDIO_KEY);
// creating a connection to livepeer
const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.REACT_APP_LIVEPEER_STUDIO_KEY }),
});

const Viewer = () => {
  const [playbackId, setPlaybackId] = useState("");
  const inputEl = useRef(null);

  const initiatePlaybackHandler = () => {
    const newPlaybackId = inputEl?.current?.value;
    if (newPlaybackId) {
      setPlaybackId(newPlaybackId);
    }
  };
  return (
    <LivepeerConfig client={client}>
      <Flex direction="column" align="center" paddingBottom={2}>
        <Heading marginY="2%">Viewer</Heading>
        <Input
          width="20%"
          ref={inputEl}
          type="text"
          placeholder="Playback ID"
        />
        <Button mt={5} onClick={initiatePlaybackHandler}>
          Start Playback
        </Button>
        <Box mt={10} width={800} height={600}>
          {playbackId ? (
            <Player
              title="Incoming Video"
              playbackId={playbackId}
              showPipButton
              aspectRatio="4to3"
            />
          ) : (
            <Text align="center">Playback not started yet.</Text>
          )}
        </Box>
      </Flex>
    </LivepeerConfig>
  );
};

export default Viewer;
