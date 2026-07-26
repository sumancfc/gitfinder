import React, { useContext } from 'react';
import { Box, Wrap, WrapItem, Tag, TagLabel, TagCloseButton, Text, Button, HStack } from '@chakra-ui/react';
import GithubContext from '../../context/github/githubContext';

const SearchHistory = () => {
  const { history, searchUsers, removeFromHistory, clearHistory } = useContext(GithubContext);

  if (history.length === 0) return null;

  return (
    <Box mt={4}>
      <HStack justify='space-between' mb={2}>
        <Text fontSize='sm' color='muted' fontWeight='semibold'>
          Recent searches
        </Text>
        <Button variant='link' size='sm' color='muted' onClick={clearHistory}>
          Clear all
        </Button>
      </HStack>
      <Wrap>
        {history.map((username) => (
          <WrapItem key={username}>
            <Tag borderRadius='full' variant='subtle' colorScheme='gray' size='md'>
              <TagLabel
                as='button'
                type='button'
                onClick={() => searchUsers(username)}
                cursor='pointer'
              >
                {username}
              </TagLabel>
              <TagCloseButton
                aria-label={`Remove ${username} from recent searches`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(username);
                }}
              />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default SearchHistory;
