const { connection } = require('./db')

const getAllBooking = async (req, res) => {
	try {
		// выборка всех активных столов и столы которые забронированы на текущую дату или меньше
		//  `SELECT booking.id, DATE_FORMAT(booking.time_start,'%d.%m.%Y %H:%i') AS "timeStart", booking.table_id, booking.time_finish, booking.client_id, booking.order_client, booking.status, table_room.name
		//          FROM booking RIGHT JOIN table_room ON booking.table_id = table_room.id WHERE status = "busy" AND DATE(time_start) <= ADDDATE(DATE(NOW()), INTERVAL 1 DAY) OR status = "active" `);

		const resp = await connection.execute(
			`SELECT booking.id, DATE_FORMAT(booking.time_start,'%d.%m.%Y %H:%i') AS "timeStart", booking.table_id, booking.time_finish, booking.client_id, booking.order_client, booking.status, table_room.name 
         FROM booking RIGHT JOIN table_room ON booking.table_id = table_room.id WHERE 
         (DATE(time_start) BETWEEN DATE(NOW()) AND ADDDATE(DATE(NOW()), INTERVAL 1 DAY)) AND
         status = "busy" OR status = "active" `
		)
		res.status(200).json({ data: resp[0] })
	} catch {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Не удалось получить список , повторите попытку познее',
			})
	}
}

const getBookingDate = async (req, res) => {
	const { date } = req.body
	console.log(date)

	try {
		const resp = await connection.query(
			`SELECT booking.id, DATE_FORMAT(booking.time_start,'%Y-%m-%d %H:%i') AS "timeStart", booking.table_id, booking.comment, booking.time_finish, booking.client_id, booking.order_client, booking.status, table_room.name, table_room.number, clients.name AS "client_name", clients.phone, clients.email FROM booking RIGHT JOIN table_room ON booking.table_id = table_room.id LEFT JOIN clients ON booking.client_id = clients.id 
       WHERE DATE(time_start) = ? OR (status = "active" AND DATE(time_start) - interval 1 day = ?) ORDER BY time_start`,
			[date, date]
		)
		console.log(resp[0])
		res.status(200).json({ data: resp[0] })
	} catch {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Не удалось получить список , повторите попытку познее',
			})
	}
}

//добавляет бронь при нажатии админом
const addBooking = async (req, res) => {
	const {
		tableId,
		timeStart,
		timeFinish,
		clientId,
		orderClient,
		status,
		phone,
		userName,
	} = req.body

	try {
		const timeStartForFree = timeStart.split(' ')

		// const freeTime = await connection.execute(
		//   `SELECT booking.id, DATE_FORMAT(booking.time_start,'%d.%m.%Y %H:%i') AS "timeStart" FROM booking WHERE DATE(time_start) = ? AND table_id = ? AND TIME(time_start) < ? ORDER BY time_start DESC`,
		//   [timeStartForFree[0], tableId, timeStartForFree[1]]);

		// if (freeTime[0].length > 0) {
		//   console.log(freeTime)
		//      return res.status(200).json({status: "error", message: "На это время имеется запись", data: freeTime[0][0]})
		// }

		// создаем текущую дату и записываем в бауз нового клиента
		let date = new Date()
		let dateBase = `${date.getFullYear()}-${
			date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
		}-${
			date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

		const addUserOnTime = await connection.execute(
			`INSERT INTO clients(id, name, phone, email, role, password, timestamp) VALUE (?, ?, ?, ?, ?, ?, ?)`,
			[null, userName, phone, null, 'on-time', null, dateBase]
		)

		const resp = await connection.execute(
			`INSERT INTO booking(id, table_id, time_start, time_finish, client_id, order_client, status) VALUE (?, ?, ?, ?, ?, ?, ?)`,
			[
				null,
				tableId,
				timeStart,
				null,
				addUserOnTime[0].insertId,
				orderClient,
				status,
			]
		)
		res.status(200).json({ data: resp[0] })
	} catch {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Не удалось получить список , повторите попытку познее стол',
			})
	}
}

//добавляет запись взять в работу админом со статусом active
const addBookingForAdmin = async (req, res) => {
	console.log(req.body)
	let date = new Date(req.body.timeStart)
	let dateBase = `${date.getFullYear()}-${
		date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
	}-${
		date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

	const { tableId, timeStart, timeFinish, clientId, orderClient, status } =
		req.body

	try {
		const resp = await connection.execute(
			`INSERT INTO booking(id, table_id, time_start, time_finish, client_id, order_client, status) VALUE (?, ?, ?, ?, ?, ?, ?)`,
			[null, tableId, dateBase, timeFinish, clientId, orderClient, status]
		)
		res.status(200).json({ data: resp[0] })
	} catch {
		res
			.status(500)
			.json({ status: 'error', message: 'Не удалось внести изменение2' })
	}
}

// удаление брони
const delBooking = async (req, res) => {
	const { id } = req.body

	try {
		const resp = await connection.execute(`DELETE FROM booking WHERE id = ?`, [
			id,
		])
		res.status(200).json({ data: resp })
	} catch {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Не удалось получить список , повторите попытку позднее ',
			})
	}
}

// закрытие стола
const succesBooking = async (req, res) => {
	const { id, sale, totalPrice, totalPriceSale } = req.body
	console.log(req.body)
	try {
		const resp = await connection.execute(
			`UPDATE booking SET status = ?, sales = ?, total = ?, total_price = ?, comment = ? WHERE id = ? `,
			['succes', sale, totalPrice, totalPriceSale, null, id]
		)
		res.status(200).json({ data: resp })
	} catch {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Не удалось получить список , повторите попытку позднее ',
			})
	}
}

//комментарий к столу
const addComment = async (req, res) => {
	const { id, comment } = req.body
	console.log(req.body)
	try {
		const resp = await connection.execute(
			`UPDATE booking SET comment = ? WHERE id = ? `,
			[comment, id]
		)
		res.status(200).json({ data: resp })
	} catch {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Не удалось получить список , повторите попытку позднее ',
			})
	}
}

module.exports = {
	getAllBooking,
	addBooking,
	getBookingDate,
	addBookingForAdmin,
	delBooking,
	succesBooking,
	addComment,
}
