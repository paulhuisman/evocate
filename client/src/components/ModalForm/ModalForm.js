import React, { useState, useEffect } from 'react'
import { TextField, Button, CircularProgress, Typography, Modal, Fade, Box, Snackbar, Alert} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux' 

import useStyles from './styles'
import { createPost, updatePost, deletePost } from '../../actions/posts'

const ModalForm = ({ currentId, setCurrentId, open, setOpen }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  // Check if there is an active post being edited
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null))

  useEffect(() => {
    if(post) {
      // Loading post values into form
      setPostData(post)
    }
    else {
      // Making sure to clean the form when adding a new memory
      clearData()
    }
  }, [post])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)

    setTimeout(() => {
      if(currentId) {
        dispatch(updatePost(currentId, postData))
      }
      else {
        dispatch(createPost(postData))
      }
      
      clearData()
      setOpen(false)
      setSuccessMessage(true)
      setLoading(false)
    }, 1000) // Little temporary delay added to see the loader in action ;)
  } 

  const handleSuccessMessageClose = () => {
    setSuccessMessage(false)
  }

  const handleDeletePost = () => {
    try {
      dispatch(deletePost(currentId))
    } catch (error) {
      console.log('Error trying to delete', error)
    }
    clearData()
    setOpen(false)
  }

  const clearData = () => {
    setPostData({ creator: '', title: '', message: '', tags: '', image_url: '' })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <Box className={classes.modal}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
              <Typography sx={{ mb: 3 }} variant="h5" align="center" color="white">
                {currentId ? 'Edit' : 'Create' } memory
              </Typography>  
              <TextField 
                name="creator" 
                variant="standard" 
                label="Your name" 
                fullWidth
                required={true}
                value={postData.creator || ''}
                onChange={(e) => setPostData({ ...postData, creator: e.target.value })} 
                disabled={loading}
                sx={{ mb: 2 }}
              />  
              <TextField 
                name="title" 
                variant="standard" 
                label="Title" 
                fullWidth
                required={true}
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
                disabled={loading}
                sx={{ mb: 2 }}
              />  
              <TextField 
                name="message" 
                variant="standard" 
                label="Message"
                multiline={true} 
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
                disabled={loading}
                sx={{ mb: 2 }}
              />  
              <TextField 
                name="tags" 
                variant="standard" 
                label="Tags (comma separated)" 
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} 
                disabled={loading}
                sx={{ mb: 2 }}
              />   
              <TextField 
                name="image_url" 
                variant="standard" 
                label="Image url" 
                fullWidth
                value={postData.image_url}
                onChange={(e) => setPostData({ ...postData, image_url: e.target.value })} 
                disabled={loading}
                sx={{ mb: 2 }}
              /> 
              <Button sx={{ mt: 2 }} variant="contained" color="primary" size="large" type="submit" fullWidth>
                Save
                { loading && 
                  <CircularProgress sx={{ ml: 1 }} color="info" size={20} />
                }
              </Button>
              { currentId &&
                <Button sx={{ mt: 2 }} onClick={handleDeletePost} variant="contained" color="error" size="small" disabled={loading} fullWidth>Delete memory</Button>
              }
            </form>
          </Box>
        </Fade>
      </Modal>
      
      <Snackbar open={successMessage} autoHideDuration={5000} onClose={handleSuccessMessageClose}>
        <Alert onClose={handleSuccessMessageClose} severity="success">
          Successfully { currentId ? 'edited' : 'created'} memory.
        </Alert>
      </Snackbar>
    </>
  )
}

export default ModalForm