import React from 'react';
import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  HStack,
  VStack,
} from '@chakra-ui/react';

interface UsersSkeletonProps {
  count?: number;
}

export const UsersSkeleton = ({ count = 8 }: UsersSkeletonProps) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
    {Array.from({ length: count }).map((_, i) => (
      <VStack
        key={i}
        bg='gray.800'
        border='1px solid'
        borderColor='gray.700'
        borderRadius='2xl'
        p={6}
        spacing={3}
      >
        <SkeletonCircle size='24' />
        <Skeleton height='16px' width='70%' />
        <Skeleton height='12px' width='40%' />
        <HStack pt={2}>
          <Skeleton height='30px' width='42px' borderRadius='md' />
          <Skeleton height='30px' width='96px' borderRadius='md' />
        </HStack>
      </VStack>
    ))}
  </SimpleGrid>
);

export const ProfileSkeleton = () => (
  <Box>
    <Skeleton height='38px' width='160px' borderRadius='md' mb={4} />
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={6}
      bg='gray.800'
      border='1px solid'
      borderColor='gray.700'
      borderRadius='2xl'
      p={6}
      mb={4}
    >
      <VStack>
        <SkeletonCircle size='36' />
        <Skeleton height='24px' width='60%' />
        <Skeleton height='14px' width='45%' />
      </VStack>
      <VStack align='stretch' spacing={3}>
        <SkeletonText noOfLines={3} spacing={3} />
        <Skeleton height='36px' width='120px' borderRadius='md' />
      </VStack>
    </SimpleGrid>
    <HStack
      justify='center'
      wrap='wrap'
      bg='gray.800'
      border='1px solid'
      borderColor='gray.700'
      borderRadius='2xl'
      p={6}
      mb={4}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height='28px' width='130px' borderRadius='full' m={1} />
      ))}
    </HStack>
    <VStack align='stretch' spacing={3}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Box
          key={i}
          bg='gray.800'
          border='1px solid'
          borderColor='gray.700'
          borderRadius='2xl'
          p={5}
        >
          <Skeleton height='20px' width='35%' />
        </Box>
      ))}
    </VStack>
  </Box>
);
