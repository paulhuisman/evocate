import { makeStyles } from '@mui/styles'
import { teal } from '@mui/material/colors'

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundBlendMode: 'darken',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 'calc(100% - 40px)',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  avatar: {
    cursor: 'pointer',
    backgroundColor: teal[700],
    transition: 'background-color .2s ease-in-out',
    "&:hover": {
      backgroundColor: teal[800],
    },
  },
  editIcon: {
    color: 'white', 
    p: 2 
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '1200px',
    backgroundColor: '#121212',
    borderRadius: '10px',
    boxShadow: 24,
    outline: 'none',
  },
})