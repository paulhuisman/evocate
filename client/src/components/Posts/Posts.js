import React from 'react'
import { Grid, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

import Post from './Post/Post'
import useStyles from './styles'

const Posts = (props) => {
  const posts = useSelector((state) => state.posts)
  const classes = useStyles()

  return (
    !posts.length ? 
      <CircularProgress className={classes.loaderIcon} color="primary"/> 
    : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Post post={post} {...props} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts