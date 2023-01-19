import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const App = ()=>{
    return(
        <Box>
            <Flex width="40%" margin="2% auto" justifyContent="space-evenly">
                <Link to="/host">Host</Link>
                <Link to="/participant">Participant</Link>
                <Link to="/viewer">Viewer</Link>
            </Flex>
            <Heading>Dashboard</Heading>
        </Box>
    )
}

export default App;