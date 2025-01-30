export function getRandomNumber(min: number, max: number){
  return Math.floor(Math.random() * max) + min;
};

// REF: https://docs.foursquare.com/developer/reference/places-photos-guide
export function getFsqPhotoUrl(prefix: string, suffix: string, width?: number, height?: number): string {
  let sizeString = 'original'
  
  if (width && height) {
    sizeString = `${width}x${height}`
  }
  return `${prefix}${sizeString}${suffix}`
}