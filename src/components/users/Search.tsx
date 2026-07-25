import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { Box, HStack, Input, Button, VisuallyHidden } from '@chakra-ui/react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please Enter Value', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <Box>
      <Box
        as='form'
        role='search'
        aria-label='Search GitHub users'
        onSubmit={onSubmit}
        bg='gray.800'
        border='1px solid'
        borderColor='gray.700'
        borderRadius='full'
        boxShadow='lg'
        p={2}
      >
        <HStack spacing={2}>
          <VisuallyHidden as='label' htmlFor='github-username-search'>
            Search a GitHub username
          </VisuallyHidden>
          <Input
            id='github-username-search'
            type='text'
            name='text'
            value={text}
            onChange={handleChange}
            placeholder='Search a GitHub username, e.g. octocat'
            required
            variant='unstyled'
            flex='1'
            pl={5}
            h='44px'
          />
          <Button
            type='submit'
            colorScheme='brand'
            borderRadius='full'
            px={7}
            h='44px'
            flexShrink={0}
          >
            Search
          </Button>
        </HStack>
      </Box>
      {githubContext.users.length > 0 && (
        <Button
          variant='outline'
          width='100%'
          mt={3}
          onClick={githubContext.clearUsers}
          leftIcon={<i className='fa fa-times' aria-hidden='true' />}
        >
          Clear results
        </Button>
      )}
    </Box>
  );
};

export default Search;
