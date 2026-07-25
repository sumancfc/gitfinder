import React, { useEffect, useContext } from 'react';
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
} from '@chakra-ui/react';
import Repos from '../repos/Repos';
import { ProfileSkeleton } from '../layout/Skeleton';
import GithubContext from '../../context/github/githubContext';

type Props = RouteComponentProps<{ login: string }>;

const User = ({ match }: Props) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

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

  if (loading) return <ProfileSkeleton />;
  return (
    <Box>
      <Button
        as={RouterLink}
        to='/'
        variant='outline'
        leftIcon={<i className='fa fa-arrow-left' />}
        mb={4}
      >
        Back to Search
      </Button>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={6}
        bg='gray.800'
        border='1px solid'
        borderColor='gray.700'
        borderRadius='2xl'
        boxShadow='md'
        p={6}
        mb={4}
      >
        <VStack textAlign='center'>
          <Avatar src={avatar_url} name={name} boxSize='150px' />
          <Heading size='lg'>{name}</Heading>
          <Text color='gray.400'>Location: {location}</Text>
          <HStack>
            <Text>Hireable:</Text>
            {hireable ? (
              <Box as='i' className='fa fa-check' color='green.400' />
            ) : (
              <Box as='i' className='fa fa-times-circle' color='red.400' />
            )}
          </HStack>
        </VStack>
        <Box>
          {bio && (
            <Box mb={3}>
              <Heading size='sm' mb={1}>
                Bio
              </Heading>
              <Text color='gray.300'>{bio}</Text>
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
            leftIcon={<i className='fa fa-github' />}
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
                  color='brand.300'
                >
                  {blog}
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
      </SimpleGrid>

      <HStack
        justify='center'
        wrap='wrap'
        bg='gray.800'
        border='1px solid'
        borderColor='gray.700'
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
        <Badge colorScheme='whiteAlpha' fontSize='0.85em' px={3} py={1} borderRadius='full'>
          Public Gists: {public_gists}
        </Badge>
      </HStack>

      <Repos repos={repos} />
    </Box>
  );
};

export default User;
