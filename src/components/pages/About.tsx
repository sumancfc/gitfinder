import React from 'react';
import { Box, SimpleGrid, VStack, Wrap, WrapItem, Heading, Text, Badge } from '@chakra-ui/react';

const features = [
  {
    icon: 'fa fa-search',
    title: 'Instant Search',
    text: 'Look up any GitHub username and get matching profiles in real time, powered by the GitHub Search API.',
  },
  {
    icon: 'fa fa-id-card',
    title: 'Rich Profiles',
    text: 'View avatar, bio, company, location, follower/following counts, and public repo & gist totals at a glance.',
  },
  {
    icon: 'fa fa-code-fork',
    title: 'Recent Repositories',
    text: "See a user's most recently created repositories with one click through to GitHub.",
  },
];

const stack = [
  'React',
  'TypeScript',
  'React Router',
  'Context API + useReducer',
  'Axios',
  'GitHub REST API',
];

const cardProps = {
  bg: 'gray.800',
  border: '1px solid',
  borderColor: 'gray.700',
  borderRadius: '2xl',
  boxShadow: 'md',
  p: 6,
  mb: 4,
};

const About = () => {
  return (
    <Box>
      <VStack textAlign='center' py={{ base: 6, md: 10 }} spacing={3}>
        <Heading size='xl'>About Hublens</Heading>
        <Text color='gray.400' fontSize='lg' maxW='600px'>
          Hublens is a lightweight tool for searching GitHub users and
          exploring their public profiles and repositories, without leaving
          a single page.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mb={4}>
        {features.map((f) => (
          <Box key={f.title} {...cardProps} mb={0} textAlign='left'>
            <Box as='i' className={f.icon} color='brand.400' fontSize='2xl' mb={2} display='block' />
            <Heading size='sm' mb={2}>
              {f.title}
            </Heading>
            <Text color='gray.400'>{f.text}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box {...cardProps}>
        <Heading size='md' mb={2}>
          How it works
        </Heading>
        <Text color='gray.400'>
          Type a GitHub username into the search box on the home page.
          Hublens queries the GitHub API for matching accounts and displays
          them as cards. Click "View Profile" on any result to see full
          details, including their five most recently created repositories.
        </Text>
      </Box>

      <Box {...cardProps} mb={0}>
        <Heading size='md' mb={3}>
          Built with
        </Heading>
        <Wrap>
          {stack.map((tech) => (
            <WrapItem key={tech}>
              <Badge colorScheme='gray' px={3} py={1} borderRadius='full' fontSize='0.85em'>
                {tech}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default About;
