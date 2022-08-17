import { Box, Center, Text } from "@chakra-ui/react";
import Changelog from "../../components/Changelog";

function Home() {
    return (
        <Center w='100%' p={10}>
            <Box maxW='1440px' w='100%' textAlign='start'>
                <Text>Das ist ein Test</Text>
                <Changelog version='1.0.0' items={[{text: "Das ist ein Beispiela"}, {text: "Das ist ein Beispield"}, {text: "Das ist ein Beispielv"}]} />
                <Changelog version='1.0.0' items={[{text: "Das ist ein Beispielb"}, {text: "Das ist ein Beispielg"}, {text: "Das ist ein Beispielh"}]} />
            </Box>
        </Center>
    )
}

export default Home;