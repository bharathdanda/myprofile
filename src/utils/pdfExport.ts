import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export type PDFQuality = 'minimal' | 'full'

interface PDFOptions {
  scale: number
  imageFormat: 'image/jpeg' | 'image/png'
  imageQuality: number
}

const qualitySettings: Record<PDFQuality, PDFOptions> = {
  minimal: {
    scale: 1,
    imageFormat: 'image/jpeg',
    imageQuality: 0.6
  },
  full: {
    scale: 2,
    imageFormat: 'image/png',
    imageQuality: 1.0
  }
}

function compressImageData(
  dataUrl: string,
  format: 'image/jpeg' | 'image/png',
  quality: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const compressedDataUrl = canvas.toDataURL(format, quality)
        resolve(compressedDataUrl)
      } else {
        resolve(dataUrl)
      }
    }
    img.src = dataUrl
  })
}

export async function exportToPDF(
  elementId: string,
  filename: string = 'resume.pdf',
  quality: PDFQuality = 'full'
) {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Element not found')
  }

  const options = qualitySettings[quality]

  // Create a clone to avoid affecting the original
  const clone = element.cloneNode(true) as HTMLElement
  clone.style.position = 'absolute'
  clone.style.left = '-9999px'
  clone.style.width = '210mm' // A4 width
  document.body.appendChild(clone)

  try {
    const canvas = await html2canvas(clone, {
      scale: options.scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    let imgData = canvas.toDataURL(options.imageFormat, options.imageQuality)
    
    // For minimal quality, apply additional compression if needed
    if (quality === 'minimal') {
      imgData = await compressImageData(imgData, options.imageFormat, options.imageQuality)
    }

    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, options.imageFormat === 'image/jpeg' ? 'JPEG' : 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, options.imageFormat === 'image/jpeg' ? 'JPEG' : 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(filename)
  } finally {
    document.body.removeChild(clone)
  }
}


