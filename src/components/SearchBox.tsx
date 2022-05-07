import React, { memo } from 'react'

interface ISearchBoxProps {
  value: string;
  handleOnChange: (e: string) => void
}

const SearchBox: React.FC<ISearchBoxProps> = memo(({
  value,
  handleOnChange,
}) => {
  return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={value}
				onChange={(event) => handleOnChange(event.target.value)}
				placeholder='Type to search...'
			></input>
		</div>
	);
});

export default SearchBox;
