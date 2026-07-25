import React, { useContext } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import UserItem from './UserItem';
import { UsersSkeleton } from '../layout/Skeleton';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) {
    return <UsersSkeleton />;
  }

  if (users.length === 0) {
    return (
      <Box
        textAlign='center'
        bg='gray.800'
        border='1px solid'
        borderColor='gray.700'
        borderRadius='2xl'
        py={12}
        px={6}
      >
        <Box as='i' className='fa fa-github' fontSize='4xl' color='gray.500' mb={3} display='block' />
        <Text color='gray.400'>Search for a GitHub username to see results here.</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
};

export default Users;
