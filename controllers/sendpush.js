const { connection } = require('./db')
const fs = require('fs')
const path = require('path')
var FCM = require('fcm-node')

const sendpush = async (req, res) => {
	const { title, body } = req.body

	console.log(req.body)
	const sendPushNotification = async () => {
		try {
			var fcm = new FCM(process.env.KEYFIREBASE)

			var reg_ids = []

			const resp = await connection.execute(`SELECT * FROM firebase`)

			resp[0].forEach(item => {
				reg_ids.push(item.token)
			})

			if (reg_ids.length > 0) {
				var pushMessage = {
					//this may vary according to the message type (single recipient, multicast, topic, et cetera)
					registration_ids: reg_ids,
					content_available: true,
					mutable_content: true,
					notification: {
						title: title,
						body: body,
						// icon: linkProduct,//Default Icon
						// badge: badgeCount, example:1 or 2 or 3 or etc....
					},
					// data: {
					//   notification_type: 5,
					//   conversation_id:inputs.user_id,
					// }
				}

				fcm.send(pushMessage, function (err, response) {
					if (err) {
						console.log('Something has gone wrong!', err)
						res.status(200).json({ stutus: true, err: response })
					} else {
						console.log('Push notification sent.', response)
						res.status(200).json({ stutus: true, data: response })
					}
				})

				let date = new Date()
				let dateBase = `${date.getFullYear()}-${
					date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
				}-${
					date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
				} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

				const push = await connection.execute(
					`INSERT INTO historypush(id, title, body, 	timestamp) VALUE (?, ?, ?, ?)`,
					[null, title, body, dateBase]
				)
			}
		} catch (error) {
			console.log(error)
		}
	}

	sendPushNotification()
}

const getpush = async (req, res) => {
	const resp = await connection.query(
		`SELECT historypush.title, historypush.body, DATE_FORMAT(historypush.timestamp,'%d.%m.%Y %H:%i') AS timestamp FROM historypush ORDER by timestamp `
	)
	res.status(200).json({ data: resp[0], status: true })
}

module.exports = {
	sendpush,
	getpush,
}
