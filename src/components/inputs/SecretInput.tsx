import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  label: string;
  value?: string;
  defaultValue?: string;
  onEnter?: (value: string) => void;
  onChange?: (value: string) => void;
  isHidden?: boolean;
  onHiddenChange?: (isHidden: boolean) => void;
  required?: boolean;
  charCount?: number;
  readOnly?: boolean;
}

export const SecretInput: React.FC<Props> = ({
  label,
  value,
  defaultValue,
  onChange,
  onEnter,
  isHidden,
  required,
  onHiddenChange,
  charCount,
  readOnly
}) => {
  const [_isHidden, setIsHidden] = useState(isHidden);
  const [_value, setValue] = useState(value);

  useEffect(() => {
    setIsHidden(isHidden ?? true);
  }, [isHidden]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleMouseDownOrDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant='standard'>
      <InputLabel htmlFor='standard-adornment-password'>{label}</InputLabel>
      <Input
        inputProps={{ size: charCount ?? 16 }}
        required={required ?? false}
        id='standard-adornment-password'
        type={_isHidden ? 'password' : 'text'}
        {...(defaultValue ? { defaultValue } : { value: _value })}
        {...(readOnly
          ? {
              slotProps: {
                input: {
                  readOnly: true
                }
              }
            }
          : {})}
        onChange={(event) => {
          const newValue = event.currentTarget.value;
          if (onChange) {
            onChange(newValue);
          } else {
            setValue(newValue);
          }
        }}
        onKeyUp={({ key }) => {
          if (key === 'Enter') {
            onEnter?.(_value ?? '');
          }
        }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label={_isHidden ? 'hide the password' : 'display the password'}
              onClick={() => {
                if (onHiddenChange) {
                  onHiddenChange(!_isHidden);
                } else {
                  setIsHidden(!_isHidden);
                }
              }}
              onMouseDown={handleMouseDownOrDownPassword}
              onMouseUp={handleMouseDownOrDownPassword}>
              {_isHidden ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
