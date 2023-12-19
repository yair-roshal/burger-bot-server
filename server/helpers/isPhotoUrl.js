function isPhotoUrl(variable) {
  // Проверяем, является ли переменная строкой
  if (typeof variable === "string") {
    // Проверяем, содержит ли строка расширение файла изображения
    return (
      /\.(jpeg|jpg|png|gif|svg|bmp|tiff|webp|heif|heic|raw|ico|psd|eps|pdf|pcx|pict|pnm|tga|exr|hdr|jpe|jfif|djvu|cdr|wmf|emf|xcf|bpg|flif|avif|svg)$/i.test(
        variable
      ) || // расширения файлов изображений
      /^data:image\/(jpeg|jpg|png|gif|svg|bmp|tiff|webp|heif|heic|raw|ico|psd|eps|pdf|pcx|pict|pnm|tga|exr|hdr|jpe|jfif|djvu|cdr|wmf|emf|xcf|bpg|flif|avif|svg);base64,/.test(
        variable
      ) // base64-данные изображения
    )
  }
  // Если переменная не является строкой, то не является ссылкой на фото
  return false
}

// module.exports = { isPhotoUrl }
export default isPhotoUrl
