import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import Users from '../users/Users';
import Search from '../users/Search';
import SearchHistory from '../users/SearchHistory';
import { useSearchUsers } from '../../hooks/useGithubQueries';

const Home = () => {
  useEffect(() => {
    document.title = 'Hublens — Find GitHub Users';
  }, []);

  // The submitted search term lives here (not in Search or Users) because
  // both children need it: Search needs it to know whether there are
  // results to clear, Users needs it to actually run the query.
  const [query, setQuery] = useState('');
  const usersQuery = useSearchUsers(query);
  const users = usersQuery.data ?? [];

  return (
    <Box>
      <VStack textAlign='center' py={{ base: 8, md: 14 }} spacing={4}>
        <Heading as='h1' size='2xl'>Find GitHub Users</Heading>
        <Text color='muted' fontSize='lg' maxW={{ base: '420px', md: 'none' }} whiteSpace={{ md: 'nowrap' }}>
          Search any GitHub username to see their profile and repositories.
        </Text>
        <Box w='100%' maxW='560px' pt={2}>
          <Search onSearch={setQuery} hasResults={users.length > 0} onClear={() => setQuery('')} />
          <SearchHistory onSelect={setQuery} />
        </Box>
      </VStack>
      <Users
        users={users}
        isLoading={usersQuery.isLoading && query.trim().length > 0}
        error={usersQuery.error?.message ?? null}
      />
    </Box>
  );
};

export default Home;
