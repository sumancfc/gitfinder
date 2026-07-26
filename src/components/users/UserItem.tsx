import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  VStack,
  HStack,
  Avatar,
  Heading,
  Badge,
  Button,
  IconButton,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { GithubUser } from '../../types';

interface Props {
  user: GithubUser;
}

const UserItem = ({ user: { login, avatar_url, html_url, type } }: Props) => {
  // Chakra's default solid+brand button is already mode-aware (light bg +
  // dark text in dark mode), but brand.500 + white text falls just short of
  // 4.5:1 in light mode. Only override light mode; leave dark mode as-is.
  const solidOverride = useColorModeValue(
    { bg: 'brand.600', _hover: { bg: 'brand.700' }, _active: { bg: 'brand.800' } },
    {}
  );

  return (
    <VStack
      bg='surface'
      border='1px solid'
      borderColor='border-subtle'
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
          icon={<i className='fa fa-github' aria-hidden='true' />}
          size='md'
          variant='outline'
        />
        <Button
          as={RouterLink}
          to={`/user/${login}`}
          colorScheme='brand'
          {...solidOverride}
          size='md'
        >
          View Profile
        </Button>
      </HStack>
    </VStack>
  );
};

export default UserItem;
