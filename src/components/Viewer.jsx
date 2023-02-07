import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Player } from "@livepeer/react";
import { useRef, useState } from "react";

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
    <Flex direction="column" align="center" paddingBottom={2}>
      <Heading marginY="2%">Viewer</Heading>
      <Input
        width="20%"
        className="Stream-input"
        ref={inputEl}
        type="text"
        placeholder="Playback ID"
      />
      <Button mt={5} className="Stream-button" onClick={initiatePlaybackHandler}>
        Start Playback
      </Button>
      <Box className="Stream-video" mt={10}>
        {playbackId ? (
          <Player
            title="Incoming Video"
            playbackId={playbackId}
            showPipButton
          />
        ) : (
          <Text>Playback not started yet.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Viewer;
