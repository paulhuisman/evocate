import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors'
import { Container, Avatar, Grow, Grid, Snackbar, Alert } from '@mui/material'
import { Add } from '@mui/icons-material'

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts'
import ModalForm from './components/ModalForm/ModalForm'

import useStyles from './styles'

const App = () => {
  document.title = 'Evocate'

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[600],
      },
      secondary: {
        main: red[500],
      },
      mode: 'dark'
    }
  })

  const [currentId, setCurrentId] = useState(null)
  const [successMessage, setSuccessMessage] = useState(false)
  const [open, setOpen] = useState(false)

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    image_url: ''
  })

  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect( () => {
    dispatch(getPosts())
  }, [dispatch])

  const handleOpen = () => {
    setCurrentId(null)
    clearData()
    setOpen(true)
  }

  const handleSuccessMessageClose = () => {
    setSuccessMessage(false)
  }

  const clearData = () => {
    setPostData({ creator: '', title: '', message: '', tags: '', image_url: '' })
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container sx={{ mt: 3 }} maxwidth="lg">
          <Posts setCurrentId={setCurrentId} open={open} setOpen={setOpen} />
        </Container>

        <Avatar className={classes.createButton} onClick={handleOpen}><Add fontSize="large"/></Avatar>

        <ModalForm currentId={currentId} setCurrentId={setCurrentId} open={open} setOpen={setOpen} setSuccessMessage={setSuccessMessage} />
        
        <Snackbar open={successMessage} autoHideDuration={5000} onClose={handleSuccessMessageClose}>
          <Alert onClose={handleSuccessMessageClose} severity="success">
            Successfully { currentId ? 'edited' : 'created'} memory.
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App