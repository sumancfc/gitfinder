import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  VStack,
  VisuallyHidden,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import UserItem from './UserItem';
import { UsersSkeleton } from '../layout/Skeleton';
import { GithubUser } from '../../types';

const PAGE_SIZE = 12;
const LOAD_MORE_SIZE = 8;

interface Props {
  users: GithubUser[];
  isLoading: boolean;
  error: string | null;
}

const Users = ({ users, isLoading, error }: Props) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [users]);

  if (isLoading) {
    return (
      <>
        <VisuallyHidden aria-live='polite' role='status'>
          Loading results&hellip;
        </VisuallyHidden>
        <UsersSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <Alert status='error' borderRadius='lg'>
        <AlertIcon />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (users.length === 0) {
    return (
      <Box
        textAlign='center'
        bg='surface'
        border='1px solid'
        borderColor='border-subtle'
        borderRadius='2xl'
        py={12}
        px={6}
      >
        <Box
          as='i'
          className='fa fa-github'
          fontSize='4xl'
          color='muted'
          mb={3}
          display='block'
          aria-hidden='true'
        />
        <Text color='muted'>Search for a GitHub username to see results here.</Text>
      </Box>
    );
  }

  const visibleUsers = users.slice(0, visibleCount);
  const hasMore = visibleCount < users.length;

  return (
    <VStack align='stretch' spacing={6}>
      <VisuallyHidden aria-live='polite' role='status'>
        {users.length} result{users.length === 1 ? '' : 's'} found, showing {visibleUsers.length}.
      </VisuallyHidden>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {visibleUsers.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </SimpleGrid>
      {hasMore && (
        <Button
          alignSelf='center'
          variant='outline'
          onClick={() => setVisibleCount((c) => c + LOAD_MORE_SIZE)}
        >
          Load more
        </Button>
      )}
    </VStack>
  );
};

export default Users;
