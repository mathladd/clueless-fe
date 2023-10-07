export const getWebkitScrollYCSS = (width?: string) => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: width || '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#ebebeb',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    background: '#C0C3C9',
  },
});

export const getWebkitScrollXCSS = (height?: string) => ({
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: height || '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#ebebeb',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    background: '#C0C3C9',
  },
});
