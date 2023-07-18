// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'hookah'
// });

// module.exports = {
//     connection
// };

const mysql = require('mysql2/promise')

const connection = mysql.createPool({
	host: 'bepluvl2.beget.tech',
	user: 'bepluvl2_hookah',
	password: 'Arkad123',
	database: 'bepluvl2_hookah',
})

module.exports = {
	connection,
}
