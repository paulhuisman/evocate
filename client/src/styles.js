import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  createButton: {
    width: 56,
    height: 56,
    color: 'white',
    cursor: 'pointer',
    position: 'absolute',
    right: 15,
    bottom: 15,
    transition: 'all .3s ease-in-out',

    "&:hover": {
      backgroundColor: '#121212'
    },
  }
}));
