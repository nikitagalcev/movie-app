import React, { ChangeEventHandler, memo } from 'react'

interface ISearchBoxProps {
  value: string;
  loading: boolean;
  handleOnChange: any;
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
          : <span className="input-group-text" id="basic-addon2">Ready</span>
        }
      </div>
		</div>
	);
});

export default SearchBox;
