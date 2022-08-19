import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Text,
  useToast,
  chakra,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { BsLightningFill } from 'react-icons/all';

function Login() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);

  function login() {
    logInWithEmailAndPassword(email, password, value => {
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
                  {value}
                </chakra.p>
              </Box>
            </Box>
          </Flex>
        ),
      });
    });
  }

  return (
    <Center>
      <Box
        mt={10}
        w="500px"
        boxShadow={{ md: 'lg' }}
        textAlign="center"
        p={8}
        borderRadius="20px"
      >
        <Text fontSize="xl">Login</Text>
        <Input
          mt={5}
          onChange={value => setEmail(value.target.value)}
          w="80%"
          placeholder="Email"
        />
        <Input
          mt={5}
          onChange={value => setPassword(value.target.value)}
          w="80%"
          placeholder="Passwort"
          type="password"
        />
        <Button mt={5} colorScheme="blue" onClick={() => login()}>
          Anmelden
        </Button>
      </Box>
    </Center>
  );
}

export default Login;
