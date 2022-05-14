import React, { memo } from 'react'

interface ISearchBoxProps {
  value: string;
  loading: boolean;
  handleOnChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<ISearchBoxProps> = memo(({
  value,
  loading,
  handleOnChange,
}) => {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        value={value}
        onChange={handleOnChange}
        placeholder='Type to search...'
      />
      <div className="input-group-append">
        {loading
          ? <span className="input-group-text" id="basic-addon2">Loading...</span>
          : <span className="input-group-text" id="basic-addon2">Input ready</span>
        }
      </div>
    </div>
  );
});

export default SearchBox;
