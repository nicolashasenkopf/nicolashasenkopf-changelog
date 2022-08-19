import { Box, Center, Flex, Link } from '@chakra-ui/react';

function Footer() {
  return (
    <Center>
      <Box p={5}>
        <Flex alignItems="center" w="full">
          <Link pr={10} pl={3} href="https://nicolas-hasenkopf/impressum">
            Impressum
          </Link>
          <Link pl={10} pr={3} href="https://nicolas-hasenkopf/datenschutz">
            Datenschutzerklärung
          </Link>
        </Flex>
      </Box>
    </Center>
  );
}

export default Footer;
