/**
 */

import { SvgIcon, SvgIconProps } from '@mui/material';

export default function VideoIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      /
      <svg
        fill="#000000"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24,33a8,8,0,0,0,8-8V9A8,8,0,0,0,16,9V25A8,8,0,0,0,24,33ZM20,9a4,4,0,0,1,8,0V25a4,4,0,0,1-8,0Z" />
        <path d="M38,25a2,2,0,0,0-4,0,10,10,0,0,1-20,0,2,2,0,0,0-4,0A14,14,0,0,0,22,38.84V43H21a2,2,0,0,0,0,4h6a2,2,0,0,0,0-4H26V38.84A14,14,0,0,0,38,25Z" />
      </svg>
    </SvgIcon>
  );
}
