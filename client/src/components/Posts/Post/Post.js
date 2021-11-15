import React, { useState } from 'react'
import moment from 'moment'
import { Card, CardContent, CardMedia, Modal, Fade, Box, Avatar, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material'

import useStyles from './styles'

const Post = ({ post, setCurrentId, open, setOpen }) => {
  const classes = useStyles()

  const [openImageModal, setOpenImageModal] = useState(false)

  const handleOpen = () => {
    setCurrentId(post._id)
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
          <div>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <Avatar className={classes.avatar} size="small" onClick={handleOpen}>
            <Edit className={classes.editIcon} fontSize="small" />
          </Avatar>
        </div>
        { post.tags[0] !== '' &&
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="p">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
        }
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
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