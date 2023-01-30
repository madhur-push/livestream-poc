import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const App = ()=>{
    return(
        <Box>
            <Heading width="fit-content" margin="2% auto">Dashboard</Heading>
            <Flex width="40%" margin="2% auto" justifyContent="space-evenly">
                <Link to="/host">Host</Link>
                <Link to="/participant">Participant</Link>
                <Link to="/viewer">Viewer</Link>
            </Flex>
        </Box>
    )
}

export default App;