import express from 'express'
import { uploadImages, upload } from '../controller/cms'

export const assetRouter  = express.Router()

assetRouter.post('/upload/images', upload.single('image_card'), uploadImages)