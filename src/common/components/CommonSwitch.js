import Switch from '@mui/joy/Switch';
import { switchClasses } from '@mui/joy/Switch';
import { Typography } from '@mui/material';
import React from 'react';

function CommonSwitch({
  checked,
  onChange,
  labelOn,
  labelOff,
  colorOn,
  colorOff,
  width,
  height,
  thumbSize,
  sx,
}) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      slotProps={{
        track: {
          children: (
            <React.Fragment>
              <Typography component="span" level="inherit" sx={{ ml: '8px', color: checked ? 'white' : 'black' }}>
                {labelOn}
              </Typography>
              <Typography component="span" level="inherit" sx={{ mr: '8px', color: !checked ? 'white' : 'black' }}>
                {labelOff}
              </Typography>
            </React.Fragment>
          ),
        },
      }}
      sx={(theme) => ({
        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
        '--Switch-thumbSize': thumbSize,
        '--Switch-trackWidth': width,
        '--Switch-trackHeight': height,
        '--Switch-trackBackground': checked ? colorOn : colorOff,
        [`& .${switchClasses.thumb}`]: {
          transition: 'width 0.2s, left 0.2s',
        },
        '&:hover': {
          '--Switch-trackBackground': checked ? colorOn : colorOff,
        },
        '&:active': {
          '--Switch-thumbWidth': `calc(${thumbSize} + 5px)`,
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': colorOn,
          '&:hover': {
            '--Switch-trackBackground': colorOn,
          },
        },
        ...sx,
      })}
    />
  );
}

export default CommonSwitch;

// Common switch props eg.
{/* <CommonSwitch
checked={autoBlockThreats}
onChange={() => setAutoBlockThreats(prevState => !prevState)}
labelOn='On'
labelOff='Off'
height='26px'
width='54px'
thumbSize='20px'
colorOn='#5bb450'
colorOff='#ff4122'
/> */}
