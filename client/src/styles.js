import { makeStyles } from '@mui/styles'
import { teal } from '@mui/material/colors'

export default makeStyles(() => ({
  createButton: {
    width: 56,
    height: 56,
    color: 'white',
    cursor: 'pointer',
    position: 'fixed',
    backgroundColor: teal[700],
    right: 15,
    bottom: 15,
    transition: 'background-color .2s ease-in-out',

    "&:hover": {
      backgroundColor: teal[800],
    },
  }
}))
