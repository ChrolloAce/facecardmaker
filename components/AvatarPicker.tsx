'use client'

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Upload, X } from 'lucide-react'

interface AvatarPickerProps {
  currentUrl?: string
  onUrlChange: (url?: string) => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

/**
 * AvatarPicker - Upload and crop avatar images to circular format
 */
export function AvatarPicker({ currentUrl, onUrlChange }: AvatarPickerProps) {
  const [tempImage, setTempImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)
  const [showCropDialog, setShowCropDialog] = useState(false)

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setTempImage(reader.result as string)
        setShowCropDialog(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropSave = async () => {
    if (!tempImage || !croppedAreaPixels) return

    try {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels)
      onUrlChange(croppedImage)
      setShowCropDialog(false)
      setTempImage(null)
    } catch (error) {
      console.error('Error cropping image:', error)
    }
  }

  const handleRemove = () => {
    onUrlChange(undefined)
  }

  return (
    <div className="space-y-3">
      <Label>Avatar Image</Label>
      
      {currentUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={currentUrl}
            alt="Avatar preview"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => document.getElementById('avatar-upload')?.click()}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Avatar
        </Button>
      )}

      <Input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crop Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="relative h-[400px] bg-gray-900 rounded-lg overflow-hidden">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Zoom</Label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCropDialog(false)
                  setTempImage(null)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCropSave}>
                Save Avatar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/**
 * Helper function to create cropped image from canvas
 */
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropArea
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  // Set canvas size to match the crop area
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Convert canvas to blob and then to data URL
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'))
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }, 'image/jpeg', 0.95)
  })
}

/**
 * Helper to create an image element from source
 */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })
}

