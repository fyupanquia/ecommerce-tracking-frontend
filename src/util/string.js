const stringToColor = (string) =>{
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = "#";
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
export const stringAvatar = (name) => {
    const split = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${split[0][0]}${split.length > 1 ? split[1][0] : ""}`,
    };
  }