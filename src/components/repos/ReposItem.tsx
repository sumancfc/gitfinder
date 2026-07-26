import React from 'react';
import { Box, Heading, Link, useColorModeValue } from '@chakra-ui/react';
import { Repo } from '../../types';

interface Props {
  repo: Repo;
}

const ReposItem = ({ repo }: Props) => {
  const hoverColor = useColorModeValue('brand.600', 'brand.300');

  return (
    <Box
      bg='surface'
      border='1px solid'
      borderColor='border-subtle'
      borderRadius='2xl'
      boxShadow='md'
      p={5}
      mb={3}
      transition='all 0.2s ease'
      _hover={{ transform: 'translateY(-6px)', boxShadow: 'dark-lg', borderColor: 'brand.400' }}
    >
      <Heading as='h3' size='sm'>
        <Link href={repo.html_url} isExternal _hover={{ textDecoration: 'none', color: hoverColor }}>
          <Box as='i' className='fa fa-code-fork' color='brand.400' mr={2} aria-hidden='true' />
          {repo.name}
        </Link>
      </Heading>
    </Box>
  );
};

export default ReposItem;
