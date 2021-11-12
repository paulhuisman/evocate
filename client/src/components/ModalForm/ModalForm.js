import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Modal, Fade, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux' 

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const ModalForm = ({ currentId, setCurrentId, open, setOpen, setSuccessMessage }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    image_url: ''
  })

  const classes = useStyles()
  const dispatch = useDispatch()

  // Check if there is an active post being edited
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId) {
      dispatch(updatePost(currentId, postData))
    }
    else {
      dispatch(createPost(postData))
    }
    
    clearData()
    setOpen(false)
    setSuccessMessage(true)
  }

  const clearData = () => {
    setPostData({ creator: '', title: '', message: '', tags: '', image_url: '' });
  }

  return (
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
              label="Creator" 
              fullWidth
              sx={{ mb: 2 }}
              value={postData.creator}
              onChange={(e) => setPostData({ ...postData, creator: e.target.value })} 
            />  
            <TextField 
              name="title" 
              variant="standard" 
              label="Title" 
              fullWidth
              sx={{ mb: 2 }}
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
            />  
            <TextField 
              name="message" 
              variant="standard" 
              label="Message" 
              fullWidth
              sx={{ mb: 2 }}
              value={postData.message}
              onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
            />  
            <TextField 
              name="tags" 
              variant="standard" 
              label="Tags" 
              fullWidth
              sx={{ mb: 2 }}
              value={postData.tags}
              onChange={(e) => setPostData({ ...postData, tags: e.target.value })} 
            />   
            <TextField 
              name="image_url" 
              variant="standard" 
              label="Image url" 
              fullWidth
              sx={{ mb: 2 }}
              value={postData.image_url}
              onChange={(e) => setPostData({ ...postData, image_url: e.target.value })} 
            />  
            <Button sx={{ mt: 2 }} variant="contained" color="primary" size="large" type="submit" fullWidth>Save</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalForm