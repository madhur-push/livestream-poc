import usePeer from "../hooks/usePeer";
import { Box, Heading, Text } from "@chakra-ui/react";

const Participant = ()=>{
    const [myPeer, myPeerId] = usePeer();
    return(
        <Box>
            <Heading>Participant</Heading>
            <Text>Participant's peer Id - {myPeerId}</Text>
        </Box>
    );
}

export default Participant;