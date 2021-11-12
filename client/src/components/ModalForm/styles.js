import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: 30,
    borderRadius: "0px!important"
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#121212',
    borderRadius: '10px',
    boxShadow: 24,
    padding: '40px 45px 50px' ,
    outline: 'none',
  },
  buttonSubmit: {
    marginTop: "30px"
  }
}))