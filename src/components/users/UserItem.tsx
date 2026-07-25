import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { VStack, HStack, Avatar, Heading, Badge, Button, IconButton, Link } from '@chakra-ui/react';
import { GithubUser } from '../../types';

interface Props {
  user: GithubUser;
}

const UserItem = ({ user: { login, avatar_url, html_url, type } }: Props) => {
  return (
    <VStack
      bg='gray.800'
      border='1px solid'
      borderColor='gray.700'
      borderRadius='2xl'
      boxShadow='md'
      p={6}
      spacing={2}
      transition='all 0.2s ease'
      _hover={{ transform: 'translateY(-6px)', boxShadow: 'dark-lg', borderColor: 'brand.400' }}
    >
      <Avatar
        size='xl'
        src={avatar_url}
        name={login}
        boxShadow='0 0 0 4px var(--chakra-colors-brand-900)'
      />
      <Heading size='sm' wordBreak='break-word' textAlign='center'>
        {login}
      </Heading>
      {type && (
        <Badge colorScheme='gray' fontSize='0.65em' letterSpacing='wide'>
          {type}
        </Badge>
      )}
      <HStack pt={2}>
        <IconButton
          as={Link}
          href={html_url}
          isExternal
          aria-label={`Open ${login} on GitHub`}
          icon={<i className='fa fa-github' />}
          size='sm'
          variant='outline'
        />
        <Button as={RouterLink} to={`/user/${login}`} colorScheme='brand' size='sm'>
          View Profile
        </Button>
      </HStack>
    </VStack>
  );
};

export default UserItem;
