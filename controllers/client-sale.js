const { connection } = require('./db')

console.log(4565)
console.log(connection)

// получаем продукты по категории
const getSales = async (req, res) => {
	try {
		const sales = await connection.execute(
			`SELECT * 
         FROM sale `
		)

		res.status(200).json({ data: sales[0] })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			status: 'error',
			message: 'Не удалось получить список , повторите попытку позднее!',
		})
	}
}

module.exports = {
	getSales,
}
