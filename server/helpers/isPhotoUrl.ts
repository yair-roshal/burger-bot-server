function isPhotoUrl(variable: any): boolean {
  // Check if the variable is a string
  if (typeof variable === "string") {
    // Check if the string contains an image file extension
    return (
      /\.(jpeg|jpg|png|gif|svg|bmp|tiff|webp|heif|heic|raw|ico|psd|eps|pdf|pcx|pict|pnm|tga|exr|hdr|jpe|jfif|djvu|cdr|wmf|emf|xcf|bpg|flif|avif|svg)$/i.test(
        variable
      ) || // image file extensions
      /^data:image\/(jpeg|jpg|png|gif|svg|bmp|tiff|webp|heif|heic|raw|ico|psd|eps|pdf|pcx|pict|pnm|tga|exr|hdr|jpe|jfif|djvu|cdr|wmf|emf|xcf|bpg|flif|avif|svg);base64,/.test(
        variable
      ) // base64 image data
    );
  }
  // If the variable is not a string, it's not a photo URL
  return false;
}

export { isPhotoUrl };
// export default isPhotoUrl;