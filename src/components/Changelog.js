import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

function Changelog(props) {
  return (
    <Box mt={5}>
      <Text fontSize="xl">Changelog {props.version}</Text>
      <Box
        borderLeft="2px"
        borderLeftColor="secondaryLight"
        w="100%"
        p={4}
        ml={5}
        mt={2}
      >
        <List spacing={3}>
          {props.items.map(item => (
            <ListItem key={item.text}>
              <ListIcon as={FaCheck} color="green.500" />
              {item.text}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Changelog;
