const requireLogin = require('../middlewares/requireLogin');
const redClient = require('../database/redis');
const User = require('../database/models/user-model');
const Msgs = require('../database/models/msg-model');
module.exports = (app) => {
	app.get('/api/dms/:id', (req,res)=>{
		User.findOne({_id:req.params.id}).then(user=>{
			res.json(user.dms)
		})
	})
	app.get('/api/sessions', (req,res)=>{
			redClient.hgetall('rooms', (err, data)=>{
			res.json(data)
		})
	})	
};
