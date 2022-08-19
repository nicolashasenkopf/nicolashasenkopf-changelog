import { Box, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Changelog from '../../components/Changelog';
import { getChangelogs } from '../../firebase';

function Home() {
  const [changelogs, setChangelogs] = useState([]);
  useEffect(() => {
    getChangelogs().then(changelogs => {
      setChangelogs(changelogs);
    });
  }, []);
  return (
    <Center w="100%" p={10}>
      <Box maxW="1440px" w="100%" textAlign="start">
        {changelogs.map(changelog => (
          <Changelog
            key={changelog.id}
            version={changelog.version}
            items={changelog.items}
            date={changelog.date}
          />
        ))}
      </Box>
    </Center>
  );
}

export default Home;
