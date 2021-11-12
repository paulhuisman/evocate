import React, { useState } from 'react'
import { Button, Card, CardContent, CardActions, CardMedia, Modal, Fade, Box, Avatar, Typography } from '@mui/material'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { Delete, ThumbUpAlt, MoreHoriz, Edit } from '@mui/icons-material'

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles'

const Post = ({ post, setCurrentId, open, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles()

  const [openImageModal, setOpenImageModal] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleOpenImageModel = () => {
    setOpenImageModal(true)
  }
  
  const handleCloseImageModel = () => {
    setOpenImageModal(false)
  }

  return (
    <>
      <Card className={classes.card}>
        <CardMedia onClick={handleOpenImageModel} className={classes.media} image={post.image_url || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Avatar style={{ color: 'white', cursor: 'pointer' }} size="small" onClick={() => setCurrentId(post._id)}><Edit sx={{ p: 2 }} onClick={handleOpen} fontSize="small" /></Avatar>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="p">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAlt fontSize="small" /> Like {post.likeCount} </Button>
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><Delete fontSize="small" /> Delete</Button>
        </CardActions>
      </Card>

      <Modal
        open={openImageModal}
        onClose={handleCloseImageModel}
      >
        <Fade in={openImageModal}>
          <Box className={classes.modal}>
            <CardMedia className={classes.media} image={post.image_url || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
          </Box>
        </Fade>
      </Modal>
    </> 
  )
}

export default Post