import React, { useEffect } from 'react';
import { RouteComponentProps, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Avatar,
  Heading,
  Text,
  Badge,
  Button,
  Link,
  Divider,
  List,
  ListItem,
  VisuallyHidden,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
} from '@chakra-ui/react';
import Repos from '../repos/Repos';
import { ProfileSkeleton } from '../layout/Skeleton';
import { useGithubUser, useGithubUserRepos } from '../../hooks/useGithubQueries';
import { GithubUser } from '../../types';

type Props = RouteComponentProps<{ login: string }>;

const User = ({ match }: Props) => {
  const linkColor = useColorModeValue('brand.600', 'brand.300');
  const { login: routeLogin } = match.params;

  // Two independent queries instead of one sequential await-await — repo
  // data and profile data now load in parallel and cache separately, keyed
  // on routeLogin. Revisit a profile you already viewed and it's instant.
  const userQuery = useGithubUser(routeLogin);
  const reposQuery = useGithubUserRepos(routeLogin);

  useEffect(() => {
    document.title = `${routeLogin} · Hublens`;
  }, [routeLogin]);

  const loading = userQuery.isLoading || reposQuery.isLoading;
  const error = userQuery.error?.message ?? reposQuery.error?.message ?? null;
  const user: Partial<GithubUser> = userQuery.data ?? {};
  const repos = reposQuery.data ?? [];

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return (
      <>
        <VisuallyHidden aria-live='polite' role='status'>
          Loading profile&hellip;
        </VisuallyHidden>
        <ProfileSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert status='error' borderRadius='lg' mb={4}>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          as={RouterLink}
          to='/'
          variant='outline'
          leftIcon={<i className='fa fa-arrow-left' aria-hidden='true' />}
        >
          Back to Search
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        as={RouterLink}
        to='/'
        variant='outline'
        leftIcon={<i className='fa fa-arrow-left' aria-hidden='true' />}
        mb={4}
      >
        Back to Search
      </Button>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={6}
        bg='surface'
        border='1px solid'
        borderColor='border-subtle'
        borderRadius='2xl'
        boxShadow='md'
        p={6}
        mb={4}
      >
        <VStack textAlign='center'>
          <Avatar src={avatar_url} name={name || login} boxSize='150px' />
          <Heading as='h1' size='lg'>{name || login}</Heading>
          <Text color='muted'>Location: {location}</Text>
          <HStack>
            <Text>Hireable:</Text>
            <Box as='span' role='img' aria-label={hireable ? 'Yes' : 'No'}>
              {hireable ? (
                <Box as='i' className='fa fa-check' color='green.400' aria-hidden='true' />
              ) : (
                <Box as='i' className='fa fa-times-circle' color='red.400' aria-hidden='true' />
              )}
            </Box>
          </HStack>
        </VStack>
        <Box>
          {bio && (
            <Box mb={3}>
              <Heading as='h2' size='sm' mb={1}>
                Bio
              </Heading>
              <Text color='muted'>{bio}</Text>
            </Box>
          )}
          <Divider />
          <Button
            as={Link}
            href={html_url}
            isExternal
            colorScheme='blackAlpha'
            bg='gray.100'
            color='gray.900'
            _hover={{ bg: 'gray.300' }}
            leftIcon={<i className='fa fa-github' aria-hidden='true' />}
            my={3}
          >
            Go to Git
          </Button>
          <List spacing={2}>
            {login && (
              <ListItem>
                <strong>Username</strong>: {login}
              </ListItem>
            )}
            {company && (
              <ListItem>
                <strong>Company</strong>: {company}
              </ListItem>
            )}
            {blog && (
              <ListItem>
                <strong>Website</strong>:{' '}
                <Link
                  href={/^https?:\/\//i.test(blog) ? blog : `https://${blog}`}
                  isExternal
                  color={linkColor}
                >
                  {blog}
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
      </SimpleGrid>

      <VisuallyHidden as='h2'>Profile statistics</VisuallyHidden>
      <HStack
        justify='center'
        wrap='wrap'
        bg='surface'
        border='1px solid'
        borderColor='border-subtle'
        borderRadius='2xl'
        boxShadow='md'
        p={6}
        mb={4}
      >
        <Badge colorScheme='brand' fontSize='0.85em' px={3} py={1} borderRadius='full'>
          Followers: {followers}
        </Badge>
        <Badge colorScheme='green' fontSize='0.85em' px={3} py={1} borderRadius='full'>
          Following: {following}
        </Badge>
        <Badge colorScheme='gray' fontSize='0.85em' px={3} py={1} borderRadius='full'>
          Public Repos: {public_repos}
        </Badge>
        <Badge colorScheme='purple' fontSize='0.85em' px={3} py={1} borderRadius='full'>
          Public Gists: {public_gists}
        </Badge>
      </HStack>

      <Heading as='h2' size='md' mb={3}>
        Repositories
      </Heading>
      <Repos repos={repos} />
    </Box>
  );
};

export default User;
