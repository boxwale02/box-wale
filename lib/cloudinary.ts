// src/lib/cloudinary.ts

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'pad';
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'gpto0thu';
  
  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    crop = 'fill',
  } = options;

  const transformations: string[] = [];
  
  transformations.push(`f_${format},q_${quality}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width && height) transformations.push(`c_${crop}`);

  const transformationString = transformations.join(',');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}