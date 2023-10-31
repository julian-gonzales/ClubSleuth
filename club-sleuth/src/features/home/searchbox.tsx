import { Select } from '@chakra-ui/react';
import PROVINCES from '../../domain/provinces';

const SearchBox = (props: any) => {
  return (
    <Select {...props} defaultValue={'SK'}>
      {Object.keys(PROVINCES).map((key) => (
        <option value={key}>{key}</option>
      ))}
    </Select>
  );
};

export default SearchBox;
