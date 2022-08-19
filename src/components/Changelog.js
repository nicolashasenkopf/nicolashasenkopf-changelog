import {
  Badge,
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaWrench } from 'react-icons/fa';
import { timestampToDate } from '../utils/time';

function Changelog(props) {
  return (
    <Box mt={5}>
      <Flex alignItems='center'>
        <Text fontSize="xl">Changelog {props.version}</Text>
        <Badge ml={3} colorScheme='green' fontSize='0.8em'>{timestampToDate(props.date)}</Badge>
      </Flex>
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
              <Flex alignItems="center">
                {item.type === 'add' ? (
                  <ListIcon as={FaCheck} color="green.500" />
                ) : item.type === 'remove' ? (
                  <ListIcon as={FaTimes} color="red.500" />
                ) : (
                  <ListIcon as={FaWrench} color="orange" />
                )}
                {item.text}
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Changelog;
