import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  loaderIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  actionDiv: {
    textAlign: 'center',
  },
}))