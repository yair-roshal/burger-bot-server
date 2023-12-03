function isPhotoUrl(variable) {
  // Проверяем, является ли переменная строкой
  if (typeof variable === "string") {
    // Проверяем, содержит ли строка расширение файла изображения
    return (
      /\.(jpg|jpeg|png|gif|webp|bmp|tiff|ico|svg)$/i.test(variable) || // расширения файлов изображений
      /^data:image\/(jpg|jpeg|png|gif|webp|bmp|tiff|ico|svg);base64,/.test(
        variable
      ) // base64-данные изображения
    );
  }
  // Если переменная не является строкой, то не является ссылкой на фото
  return false;
}

module.exports = { isPhotoUrl };
