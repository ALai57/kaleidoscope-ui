import React        from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField    from '@mui/material/TextField';
import Stack        from '@mui/material/Stack';


const logger = (event, list, reason, detail) => console.log(event, list, reason, detail);

const onChange = (onAdd, onRemove) =>
      (event, list, reason, detail) =>
      { if (reason === 'selectOption') {
        console.log('Added!', event, list, reason, detail);
        onAdd(detail);
      } else if (reason === 'removeOption'){
        console.log('Removed!');
        onRemove(detail);
      }
      }

const InputTags = ({options=[],
                    width=500,
                    onAdd=logger,
                    vals,
                    onRemove=logger,
                    tagType="Albums"}) => {

  const onChangeHandler = onChange(onAdd, onRemove);

  return (
    <Stack spacing={3} sx={{ width: {width} }}>
      <Autocomplete
        multiple
        id                  ="tags-standard"
        options             ={options}
        getOptionLabel      ={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        onChange       ={onChangeHandler}
        defaultValue   ={vals}
        renderInput    ={(params) => (<TextField
                                        {...params}
                                        type       ="text"
                                        label      ={tagType}
                                        placeholder={tagType}
                                        size       ='small'
                                      />
                                     )}
      />
    </Stack>
  );
}

export { InputTags };
