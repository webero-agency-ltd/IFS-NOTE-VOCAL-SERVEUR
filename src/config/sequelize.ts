module.exports = {
  	username : "webero",
  	database : "vocalnote",
  	password : 'aUGZyL8T67',
  	params : {
  		host: 'localhost',
	  	dialect: 'mysql',
		pool: {
		    max: 10,
		    min: 0,
		    acquire: 30000,
		    idle: 10000
		}
	}
}