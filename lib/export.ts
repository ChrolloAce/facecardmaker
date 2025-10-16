import { toPng, toSvg } from 'html-to-image'

/**
 * Preload and decode all images in the element
 */
async function preloadAndDecodeImages(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img')
  console.log(`Found ${images.length} images to preload`)
  
  const promises = Array.from(images).map(async (img, index) => {
    try {
      // If image is complete, ensure it's decoded
      if (img.complete && img.naturalHeight !== 0) {
        console.log(`Image ${index} already loaded, decoding...`)
        if ('decode' in img) {
          await img.decode()
        }
        return
      }
      
      // Wait for image to load
      console.log(`Image ${index} loading...`, img.src.substring(0, 60))
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          console.warn(`Image ${index} load timeout`)
          resolve()
        }, 5000)
        
        img.onload = async () => {
          clearTimeout(timeout)
          console.log(`Image ${index} loaded, decoding...`)
          try {
            if ('decode' in img) {
              await img.decode()
            }
            resolve()
          } catch (err) {
            console.warn(`Image ${index} decode error:`, err)
            resolve()
          }
        }
        
        img.onerror = () => {
          clearTimeout(timeout)
          console.error(`Image ${index} failed to load`)
          resolve()
        }
      })
    } catch (err) {
      console.error(`Error processing image ${index}:`, err)
    }
  })
  
  await Promise.all(promises)
  console.log('All images preloaded and decoded')
}

/**
 * Export a single card as PNG with robust image handling
 */
export async function exportCardAsPNG(
  element: HTMLElement,
  filename: string = 'facecard.png'
): Promise<void> {
  try {
    console.log('=== Starting Export Process ===')
    
    // Preload and decode all images
    await preloadAndDecodeImages(element)
    
    // Extra delay for browser painting
    console.log('Waiting for final render...')
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log('Capturing element to PNG...')
    
    // Export with simplified options that work better with data URLs
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: false, // Critical: don't cache bust data URLs
      backgroundColor: 'transparent',
      skipFonts: false,
    })
    
    console.log('Export successful! Downloading...')
    downloadDataUrl(dataUrl, filename)
    console.log('=== Export Complete ===')
  } catch (error) {
    console.error('=== Export Failed ===')
    console.error('Error details:', error)
    alert('Export failed. Please check console for details.')
    throw error
  }
}

/**
 * Export a single card as SVG
 */
export async function exportCardAsSVG(
  element: HTMLElement,
  filename: string = 'facecard.svg'
): Promise<void> {
  try {
    const dataUrl = await toSvg(element, {
      cacheBust: true,
      backgroundColor: 'transparent',
    })
    
    downloadDataUrl(dataUrl, filename)
  } catch (error) {
    console.error('Failed to export SVG:', error)
    throw error
  }
}

/**
 * Export before/after comparison as a 2-up PNG
 */
export async function export2UpComparison(
  beforeElement: HTMLElement,
  afterElement: HTMLElement,
  filename: string = 'facecard-comparison.png'
): Promise<void> {
  try {
    // Capture both cards as data URLs
    const [beforeDataUrl, afterDataUrl] = await Promise.all([
      toPng(beforeElement, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: 'transparent',
      }),
      toPng(afterElement, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: 'transparent',
      }),
    ])
    
    // Create canvas for 2-up layout
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')
    
    // Load images
    const beforeImg = await loadImage(beforeDataUrl)
    const afterImg = await loadImage(afterDataUrl)
    
    // Calculate dimensions
    const gutter = 40
    const captionHeight = 60
    const cardWidth = beforeImg.width
    const cardHeight = beforeImg.height
    
    canvas.width = cardWidth * 2 + gutter
    canvas.height = cardHeight + captionHeight
    
    // No background fill - transparent background
    // Cards already have their own backgrounds from the elements
    
    // Draw cards
    ctx.drawImage(beforeImg, 0, 0)
    ctx.drawImage(afterImg, cardWidth + gutter, 0)
    
    // Draw captions
    ctx.fillStyle = '#A8ABB3'
    ctx.font = '600 16px Inter, -apple-system, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Before', cardWidth / 2, cardHeight + 35)
    ctx.fillText('After', cardWidth + gutter + cardWidth / 2, cardHeight + 35)
    
    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        downloadDataUrl(url, filename)
        URL.revokeObjectURL(url)
      }
    }, 'image/png', 1)
    
  } catch (error) {
    console.error('Failed to export 2-up comparison:', error)
    throw error
  }
}

/**
 * Helper to download a data URL
 */
function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

/**
 * Helper to load an image from data URL
 */
function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = dataUrl
  })
}

