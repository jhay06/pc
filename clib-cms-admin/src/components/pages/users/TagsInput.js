import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../../InputGroup.css';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import BRANCH from '../../../api/queries/Branch';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    // '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //   borderColor: '#456081',
    // },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e0e7ff',
      color: '#456081',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
  },
});

function TagsInput({ onChange, value }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(BRANCH.LIST, {
    variables: {
      limit: '1000',
      page: '1',
    },
  });

  return (
    <div className="input-group col-md-12 col-sm 12">
      <label>Assigned Branches</label>
      <Autocomplete
        multiple
        id="branch-tags"
        options={data ? data.getBranches : []}
        getOptionLabel={(option) => option.branchCode}
        defaultValue={[]}
        filterSelectedOptions
        size="small"
        onChange={onChange}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            color="secondary"
            className={classes.root}
            placeholder={
              loading
                ? 'Loading branches...'
                : error
                ? 'Error loading data'
                : 'Add Branch'
            }
          />
        )}
      />
    </div>
  );
}

export default TagsInput;

TagsInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
};
