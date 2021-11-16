import React, { useState, useEffect } from 'react'
import { TextField, Button, CircularProgress, Typography, Modal, Fade, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux' 

import useStyles from './styles'
import { createPost, updatePost, deletePost } from '../../actions/posts'

const ModalForm = ({ currentId, open, setOpen, setStatusMessage }) => {
  const postDataInitialState = {
    creator: '',
    title: '',
    message: '',
    tags: '',
    image_url: ''
  }
  const [postData, setPostData] = useState(postDataInitialState)
  const [loading, setLoading] = useState(false)

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
      // Making sure to clean the form when adding a new post
      clearFormData()
    }
  }, [post]) // eslint-disable-line react-hooks/exhaustive-deps

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
      
      clearFormData()
      setOpen(false)
      setStatusMessage({ open: true, severity: 'success', typeString: currentId ? 'edited' : 'created' })
      setLoading(false)
    }, 1000) // Little temporary delay added to see the loader in action ;)
  } 

  const handleDeletePost = () => {
    try {
      dispatch(deletePost(currentId))
      setStatusMessage({ open: true, severity: 'success', typeString: 'deleted' })
    } catch (error) {
      console.log('Error trying to delete', error)
    }
    clearFormData()
    setOpen(false)
  }

  const clearFormData = () => {
    setPostData(postDataInitialState)
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
    </>
  )
}

export default ModalForm