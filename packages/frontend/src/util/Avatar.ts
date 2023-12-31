import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

 function stringToColor(string : string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  export function stringAvatar(name = "" , options? : SxProps<Theme>)  {
    const newname = name.split('_').map(el => el.at(0))
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...options
      },
      children: newname,
    };
  }