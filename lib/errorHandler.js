function errorhandler(error) {
	console.log(error);
	throw new Error('Fallo en la operación del servidor');
}

module.exports = errorhandler;
