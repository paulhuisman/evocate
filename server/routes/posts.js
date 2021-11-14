import express from 'express'

import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js'

const router = express.Router()

import { validatePost } from '../middleware/validators/postValidator.js'

router.get('/', getPosts)
router.post('/', validatePost, createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

export default router