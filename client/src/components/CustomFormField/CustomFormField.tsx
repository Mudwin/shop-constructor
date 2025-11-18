import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const stylesForLabel = {
  '&.MuiInputLabel-root': {
    color: 'var(--color-gray)',
    fontSize: '15px',
    position: 'absolute',
    top: '-5px',
    '&.Mui-focused': {
      color: 'var(--color-dark)',
      fontWeight: 500,
      fontSize: '20px',
      position: 'absolute',
      top: '-12px',
      left: '-8px',
    },
    '&.MuiInputLabel-shrink': {
      fontSize: '20px',
      color: 'var(--color-dark)',
      fontWeight: 500,
      top: '-12px',
      left: '-8px',
    },
  },
};

const stylesForInput = {
  '&.MuiOutlinedInput-root': {
    position: 'relative',
    width: '250px',
    height: '40px',
    fontSize: '14px',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--color-dark)',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--color-dark)',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '8px',
    },
  },
};

interface CustomFormFieldProps {
  label: string;
  id: string;
  placeholder?: string;
}

export default function CustomFormField({ label, id, placeholder }: CustomFormFieldProps) {
  return (
    <FormControl>
      <InputLabel sx={stylesForLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput sx={stylesForInput} id={id} placeholder={placeholder} />
    </FormControl>
  );
}
