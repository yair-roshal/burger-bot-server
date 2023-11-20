function isPhotoUrl(variable) {
	// Проверяем, является ли переменная строкой
	if (typeof variable === "string") {
		// Проверяем, содержит ли строка расширение файла изображения
		return (
			/\.(jpg|jpeg|png|gif)$/i.test(variable) ||
			/^data:image\/(jpeg|png|gif|jpg);base64,/.test(variable)
		);
	}
	// Если переменная не является строкой, то не является ссылкой на фото
	return false;
}

module.exports = { isPhotoUrl };
// export default isPhotoUrl
