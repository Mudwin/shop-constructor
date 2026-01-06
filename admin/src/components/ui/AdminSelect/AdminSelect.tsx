import styles from './AdminSelect.module.css';
import React, { useState } from 'react';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type SelectType = 'order' | 'product' | 'customer';

export default function AdminSelect({ type }: { type: SelectType }) {
  const [category, setCategory] = React.useState('');

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
      {type === 'order' && (
        <>
          <MenuItem value="new" defaultChecked>
            <em>Сначала новые</em>
          </MenuItem>
          <MenuItem value="old">
            <em>Сначала старые</em>
          </MenuItem>
        </>
      )}

      {type === 'product' && (
        <>
          <MenuItem value="expensive" defaultChecked>
            <em>Сначала дорогие</em>
          </MenuItem>
          <MenuItem value="cheap">
            <em>Сначала дешевые</em>
          </MenuItem>
          <MenuItem value="here">
            <em>В наличии</em>
          </MenuItem>
          <MenuItem value="soon">
            <em>Скоро поступят</em>
          </MenuItem>
          <MenuItem value="off">
            <em>Сняты с продажи</em>
          </MenuItem>
        </>
      )}

      {type === 'customer' && (
        <>
          <MenuItem value="new" defaultChecked>
            <em>Новые</em>
          </MenuItem>
          <MenuItem value="active">
            <em>Активные</em>
          </MenuItem>
        </>
      )}
    </Select>
  );
}
