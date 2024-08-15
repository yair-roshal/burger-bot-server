const cleanObjectDB = (object: Record<string, any>): void => {
    console.log('object before clean :>> ', object);
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];
            if (typeof element === 'string' && element.length > 100) {
                object[key] = element.slice(-50);
            }
        }
    }
    console.log('object after clean :>> ', object);
};

export default cleanObjectDB;