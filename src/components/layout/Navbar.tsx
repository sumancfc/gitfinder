import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { Flex, Box, Heading, HStack, Link } from '@chakra-ui/react';

interface Props {
  icon?: string;
  title?: string;
}

const navLinkStyle = {
  padding: '0.5rem 0.9rem',
  borderRadius: '8px',
  fontWeight: 600,
};

const activeStyle = {
  ...navLinkStyle,
  color: '#e6e8ee',
  background: 'rgba(129, 140, 248, 0.16)',
};

const Navbar = ({ icon = 'fa fa-github', title = 'Hublens' }: Props) => {
  return (
    <Box
      as='nav'
      position='sticky'
      top={0}
      zIndex={10}
      bg='rgba(26, 29, 36, 0.75)'
      backdropFilter='blur(10px)'
      borderBottom='1px solid'
      borderColor='gray.700'
      mb={8}
    >
      <Flex
        justify='space-between'
        align='center'
        wrap='wrap'
        gap={3}
        maxW='1100px'
        mx='auto'
        px={{ base: 4, md: 6 }}
        py={3}
      >
        <Heading as='h1' size='md'>
          <Link
            as={RouterLink}
            to='/'
            display='flex'
            alignItems='center'
            _hover={{ color: 'brand.300', textDecoration: 'none' }}
          >
            <Flex
              align='center'
              justify='center'
              boxSize='34px'
              borderRadius='full'
              bg='brand.900'
              color='brand.300'
              fontSize='16px'
              mr={2}
            >
              <Box as='i' className={icon}></Box>
            </Flex>
            {title}
          </Link>
        </Heading>
        <HStack as='ul' spacing={1} listStyleType='none'>
          <Box as='li'>
            <Link
              as={NavLink}
              to='/'
              exact
              activeStyle={activeStyle}
              style={navLinkStyle}
              color='gray.400'
              _hover={{ color: 'gray.100', bg: 'gray.700', textDecoration: 'none' }}
            >
              Home
            </Link>
          </Box>
          <Box as='li'>
            <Link
              as={NavLink}
              to='/about'
              activeStyle={activeStyle}
              style={navLinkStyle}
              color='gray.400'
              _hover={{ color: 'gray.100', bg: 'gray.700', textDecoration: 'none' }}
            >
              About
            </Link>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
