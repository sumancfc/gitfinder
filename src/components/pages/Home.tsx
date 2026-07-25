import React, { useEffect } from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import Users from '../users/Users';
import Search from '../users/Search';

const Home = () => {
  useEffect(() => {
    document.title = 'Hublens — Find GitHub Users';
  }, []);

  return (
    <Box>
      <VStack textAlign='center' py={{ base: 8, md: 14 }} spacing={4}>
        <Heading as='h1' size='2xl'>Find GitHub Users</Heading>
        <Text color='gray.400' fontSize='lg' maxW={{ base: '420px', md: 'none' }} whiteSpace={{ md: 'nowrap' }}>
          Search any GitHub username to see their profile and repositories.
        </Text>
        <Box w='100%' maxW='560px' pt={2}>
          <Search />
        </Box>
      </VStack>
      <Users />
    </Box>
  );
};

export default Home;
