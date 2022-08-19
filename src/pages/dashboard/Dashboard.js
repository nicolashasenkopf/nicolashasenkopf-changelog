import {
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Grid,
  Icon,
  Input,
  Select,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsLightningFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import {
  addChangelog,
  deleteChangelog,
  getChangelogs,
  logout,
} from '../../firebase';
import { timestampToDate } from '../../utils/time';

function CreateChangelog() {
  const toast = useToast();
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  function add() {
    if (
      type != null &&
      type.trim().length > 0 &&
      text != null &&
      text.trim().length > 0
    ) {
      setItems([
        ...items,
        {
          type: type,
          text: text,
        },
      ]);
      setType('');
      setText('');
    }
  }

  function remove(text) {
    setItems(items.filter(e => e.text !== text));
  }

  function create() {
    addChangelog(version, items, error => {
      if (error) {
        toast({
          render: () => (
            <Flex
              maxW="sm"
              w="full"
              mx="auto"
              bg="gray.800"
              shadow="md"
              rounded="lg"
              overflow="hidden"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                w={12}
                bg="red.500"
              >
                <Icon as={BsLightningFill} color="white" boxSize={6} />
              </Flex>

              <Box mx={-3} py={2} px={4}>
                <Box mx={3}>
                  <chakra.span color="red.400" fontWeight="bold">
                    Fehler
                  </chakra.span>
                  <chakra.p color="gray.200" fontSize="sm">
                    Es ist ein Fehler aufgetreten
                  </chakra.p>
                </Box>
              </Box>
            </Flex>
          ),
        });
      } else {
        setVersion('');
        setType('');
        setText('');
        setItems([]);

        toast({
          render: () => (
            <Flex
              maxW="sm"
              w="full"
              mx="auto"
              bg="gray.800"
              rounded="lg"
              overflow="hidden"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                w={12}
                bg="green.500"
              >
                <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
              </Flex>

              <Box mx={-3} py={2} px={4}>
                <Box mx={3}>
                  <chakra.span color="green.500" fontWeight="bold">
                    Erstellt
                  </chakra.span>
                  <chakra.p color="gray.200" fontSize="sm">
                    Der Changelog wurde erfolgreich erstellt
                  </chakra.p>
                </Box>
              </Box>
            </Flex>
          ),
        });
      }
    });
  }

  return (
    <Center>
      <Box maxW="1440px" w="full" p={9} textAlign="center">
        <Center>
          <Box
            textAlign="start"
            color="gray.800"
            w="500px"
            bg="white"
            borderRadius="20px"
            p={7}
            pt={5}
            pb={5}
            boxShadow={{ md: 'xl' }}
          >
            <Text fontSize="lg">Changelog erstellen</Text>
            <Input
              mt={5}
              w="100%"
              placeholder="Version"
              borderColor="secondaryLight"
              _hover={{ borderColor: 'gray.200' }}
              _placeholder={{ color: 'gray.800' }}
              onChange={e => {
                setVersion(e.target.value);
              }}
            />
            <Flex mt={5}>
              <Select
                placeholder="Art"
                borderColor="secondaryLight"
                _hover={{ borderColor: 'gray.200' }}
                _placeholder={{ color: 'gray.800' }}
                colorScheme="white"
                isRequired
                onChange={event => {
                  setType(event.target.value);
                }}
              >
                <option value="add">ADD</option>
                <option value="remove">REMOVE</option>
                <option value="fix">FIX</option>
              </Select>
              <Input
                ml={2}
                mr={2}
                placeholder="Nachricht"
                borderColor="secondaryLight"
                _hover={{ borderColor: 'gray.200' }}
                _placeholder={{ color: 'gray.800' }}
                onChange={e => {
                  setText(e.target.value);
                }}
              />
              <Spacer />
              <Button
                onClick={() => {
                  add();
                }}
                colorScheme="green"
              >
                <Icon as={FaPlus} />
              </Button>
            </Flex>
            {items.map(item => (
              <Flex
                key={item.text}
                onClick={() => remove(item.text)}
                alignItems="center"
                bg="secondaryLight"
                p={2}
                borderRadius="12px"
                mt={4}
              >
                <Badge
                  colorScheme={
                    item.type === 'add'
                      ? 'green'
                      : item.type === 'remove'
                      ? 'red'
                      : 'orange'
                  }
                >
                  {item.type}
                </Badge>
                <Spacer />
                <Text
                  fontSize="sm"
                  maxW="200px"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  {item.text}
                </Text>
              </Flex>
            ))}
            <Center>
              <Button
                onClick={() => {
                  create();
                }}
                mt={5}
                colorScheme="green"
              >
                Erstellen
              </Button>
            </Center>
          </Box>
        </Center>
      </Box>
    </Center>
  );
}

function ChangelogList() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [changelogs, setChangelogs] = useState([]);

  useEffect(() => {
    getChangelogs().then(c => {
      setChangelogs(c);
    });
  }, []);

  function deleteChange(changelog) {
    setLoading(true);
    deleteChangelog(changelog, error => {
      if (error) {
        toast({
          render: () => (
            <Flex
              maxW="sm"
              w="full"
              mx="auto"
              bg="gray.800"
              shadow="md"
              rounded="lg"
              overflow="hidden"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                w={12}
                bg="red.500"
              >
                <Icon as={BsLightningFill} color="white" boxSize={6} />
              </Flex>

              <Box mx={-3} py={2} px={4}>
                <Box mx={3}>
                  <chakra.span color="red.400" fontWeight="bold">
                    Fehler
                  </chakra.span>
                  <chakra.p color="gray.200" fontSize="sm">
                    Es ist ein Fehler aufgetreten
                  </chakra.p>
                </Box>
              </Box>
            </Flex>
          ),
        });
      } else {
        setChangelogs(changelogs.filter(e => e.id !== changelog.id));
        toast({
          render: () => (
            <Flex
              maxW="sm"
              w="full"
              mx="auto"
              bg="gray.800"
              rounded="lg"
              overflow="hidden"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                w={12}
                bg="green.500"
              >
                <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
              </Flex>

              <Box mx={-3} py={2} px={4}>
                <Box mx={3}>
                  <chakra.span color="green.500" fontWeight="bold">
                    Erstellt
                  </chakra.span>
                  <chakra.p color="gray.200" fontSize="sm">
                    Der Changelog wurde erfolgreich gelöscht
                  </chakra.p>
                </Box>
              </Box>
            </Flex>
          ),
        });
      }
    });
  }

  return (
    <Center>
      <Box maxW="1440px" w="full" p={9} textAlign="center">
        <Center>
          <Box
            textAlign="start"
            color="gray.800"
            w="500px"
            bg="white"
            borderRadius="20px"
            p={7}
            pt={5}
            pb={5}
            boxShadow={{ md: 'xl' }}
          >
            <Text fontSize="lg">Changelogs</Text>
            {changelogs.map(changelog => (
              <Grid
                key={changelog.id}
                textAlign="center"
                alignItems="center"
                templateColumns="repeat(4, 1fr)"
                w="100%"
                gap={5}
              >
                <Text>{changelog.version}</Text>
                <Text>{changelog.items.length} Logs</Text>
                <Text>{timestampToDate(changelog.date)}</Text>
                <Button
                  onClick={() => deleteChange(changelog)}
                  m={2}
                  colorScheme="red"
                  isLoading={loading}
                >
                  Löschen
                </Button>
              </Grid>
            ))}
          </Box>
        </Center>
      </Box>
    </Center>
  );
}

const LogOutButton = () => (
  <Center>
    <Button
      onClick={() => {
        logout();
      }}
      mt={10}
      colorScheme="red"
    >
      Ausloggen
    </Button>
  </Center>
);

function Dashboard() {
  return (
    <div>
      <CreateChangelog />
      <ChangelogList />
      <LogOutButton />
    </div>
  );
}

export default Dashboard;
