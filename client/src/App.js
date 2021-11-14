import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { teal, green } from '@mui/material/colors'
import { Container, Avatar } from '@mui/material'
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
        main: teal[800],
      },
      secondary: {
        main: green[500],
      },
      mode: 'dark'
    }
  })

  const [currentId, setCurrentId] = useState(null)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect( () => {
    dispatch(getPosts())
  }, [dispatch])

  const handleOpen = () => {
    setCurrentId(null)
    setOpen(true)
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container sx={{ mt: 3 }} maxwidth="lg">
          <Posts setCurrentId={setCurrentId} open={open} setOpen={setOpen} />
        </Container>

        <Avatar className={classes.createButton} onClick={handleOpen} alt="Create new memory"><Add fontSize="large"/></Avatar>

        <ModalForm currentId={currentId} setCurrentId={setCurrentId} open={open} setOpen={setOpen} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App