import styles from './AdminSelect.module.css';
import React, { useState } from 'react';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AdminSelect() {
  const [category, setCategory] = React.useState('new');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <Select
      value={category}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{
        width: '200px',
        textAlign: 'center',
        fontSize: '14px',
        height: '30px',
        borderRadius: '10px',
      }}
    >
      <MenuItem value="new" defaultChecked>
        <em>Сначала новые</em>
      </MenuItem>
      <MenuItem value="old">
        <em>Сначала старые</em>
      </MenuItem>
    </Select>
  );
}
