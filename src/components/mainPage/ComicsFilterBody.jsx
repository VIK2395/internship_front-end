import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  CheckboxGroup,
  Stack,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCharacterToFilter,
  removeCharacterFromFilter,
  addPublisherToFilter,
  removePublisherFromFilter,
  setTitleToFlter,
} from '../../redux/actions';

const ComicsFilterBody = () => {
  const dispatch = useDispatch();
  const filteredTitle = useSelector(state => state.filters.title);
  const publishers = useSelector(state => state.publishers);
  const filteredPublishers = useSelector(state => state.filters.publishers);
  const characters = useSelector(state => state.characters);
  const filteredCharacters = useSelector(state => state.filters.characters);

  const onTitleFilterChange = ev => {
    dispatch(setTitleToFlter(ev.target.value));
  };

  const onPublisherFilterChange = ev => {
    if (ev.target.checked) {
      dispatch(addPublisherToFilter(ev.target.value));
    } else {
      dispatch(removePublisherFromFilter(ev.target.value));
    }
  };

  const onCharacterFilterChange = ev => {
    if (ev.target.checked) {
      dispatch(addCharacterToFilter(ev.target.value));
    } else {
      dispatch(removeCharacterFromFilter(ev.target.value));
    }
  };

  const booleanvalue = true;

  return (
    <Box>
      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          value={filteredTitle}
          placeholder="Title"
          autoComplete="off"
          onChange={onTitleFilterChange}
          colorScheme="green"
        />
      </InputGroup>
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Publisher
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel mt={2} pt={1} pb={4}>
            <CheckboxGroup colorScheme="green" value={filteredPublishers}>
              <Stack pl={1} spacing={2}>
                {publishers.map(publisher => (
                  <Checkbox
                    key={publisher._id}
                    value={publisher._id}
                    onChange={onPublisherFilterChange}
                  >
                    {publisher.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem pb={1}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Character
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {/* maxH="70vh" overflowY="auto" pb={4} */}
          <AccordionPanel mt={2} pt={1} pb={4}>
            <CheckboxGroup colorScheme="green" value={filteredCharacters}>
              <Stack pl={1} spacing={2}>
                {characters.map(character => (
                  <Checkbox
                    key={character._id}
                    value={character._id}
                    onChange={onCharacterFilterChange}
                  >
                    {character.nickname}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ComicsFilterBody;
