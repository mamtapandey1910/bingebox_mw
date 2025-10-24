import express from 'express'
import { uploadImages, upload, uploadTodisk } from '../controller/cms'
import { isAuthenticated } from '../middleware/authenticate'

export const assetRouter  = express.Router()

assetRouter.post('/upload/images', upload.single('image_card'), uploadImages)
assetRouter.post('/upload/disk-image', isAuthenticated, upload.single('image_card'), uploadTodisk)