import { toPng, toSvg } from 'html-to-image'

/**
 * Export a single card as PNG
 */
export async function exportCardAsPNG(
  element: HTMLElement,
  filename: string = 'facecard.png'
): Promise<void> {
  try {
    // Create a wrapper div with export padding
    const wrapper = document.createElement('div')
    wrapper.style.position = 'fixed'
    wrapper.style.left = '-9999px'
    wrapper.style.top = '0'
    wrapper.style.padding = '120px 100px'
    wrapper.style.width = '600px'
    wrapper.style.backgroundColor = 'transparent'
    
    // Store original parent and styles
    const originalParent = element.parentElement
    const originalPadding = element.style.padding
    const originalWidth = element.style.width
    const originalMaxWidth = element.style.maxWidth
    
    // Temporarily move element to wrapper and adjust its styles
    wrapper.appendChild(element)
    document.body.appendChild(wrapper)
    element.style.padding = '60px 20px'
    element.style.width = '100%'
    element.style.maxWidth = '600px'
    
    // Wait for DOM to settle
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Capture the wrapper (which includes the element with proper padding)
    const dataUrl = await toPng(wrapper, {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: 'transparent',
      style: {
        padding: '0',
        margin: '0',
      }
    })
    
    // Restore original structure and styles
    element.style.padding = originalPadding
    element.style.width = originalWidth
    element.style.maxWidth = originalMaxWidth
    if (originalParent) {
      originalParent.appendChild(element)
    }
    document.body.removeChild(wrapper)
    
    downloadDataUrl(dataUrl, filename)
  } catch (error) {
    console.error('Failed to export PNG:', error)
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

