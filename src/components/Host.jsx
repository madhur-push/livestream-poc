import usePeer from "../hooks/usePeer";
import { Box, Heading, Text } from "@chakra-ui/react"

const Host = ()=>{
    const [myPeer, myPeerId] = usePeer();
    return(
        <Box>
            <Heading>Host</Heading>
            <Text>Host's peer Id - {myPeerId}</Text>
        </Box>
    )
}

export default Host;