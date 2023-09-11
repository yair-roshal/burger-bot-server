module.exports = cleanObjectDB = (object) => {
    console.log('object before clean :>> ', object)
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key]
            if (element.length > 100) {
                element.slice(-50)
            }
        }
    }
    console.log('object after clean :>> ', object)
}
