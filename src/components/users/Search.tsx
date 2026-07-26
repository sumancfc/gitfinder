import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { Box, HStack, Input, Button, VisuallyHidden, useColorModeValue } from '@chakra-ui/react';
import AlertContext from '../../context/alert/alertContext';

interface Props {
  onSearch: (text: string) => void;
  hasResults: boolean;
  onClear: () => void;
}

const Search = ({ onSearch, hasResults, onClear }: Props) => {
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please Enter Value', 'light');
    } else {
      onSearch(text);
      setText('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  // Chakra's default solid+brand button is already mode-aware (light bg +
  // dark text in dark mode), but brand.500 + white text falls just short of
  // 4.5:1 in light mode. Only override light mode; leave dark mode as-is.
  const solidOverride = useColorModeValue(
    { bg: 'brand.600', _hover: { bg: 'brand.700' }, _active: { bg: 'brand.800' } },
    {}
  );

  return (
    <Box>
      <Box
        as='form'
        role='search'
        aria-label='Search GitHub users'
        onSubmit={onSubmit}
        bg='surface'
        border='1px solid'
        borderColor='border-subtle'
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
            {...solidOverride}
            borderRadius='full'
            px={7}
            h='44px'
            flexShrink={0}
          >
            Search
          </Button>
        </HStack>
      </Box>
      {hasResults && (
        <Button
          variant='outline'
          width='100%'
          mt={3}
          onClick={onClear}
          leftIcon={<i className='fa fa-times' aria-hidden='true' />}
        >
          Clear results
        </Button>
      )}
    </Box>
  );
};

export default Search;
