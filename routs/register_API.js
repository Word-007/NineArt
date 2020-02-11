const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.post('/register',(req,res)=>{
	var obj = req.body;
	var sql = 'select uname from game_user where uname = ?';
	var INSERT = 'INSERT INTO game_user VALUES (?,?,?,?,?)';
	console.log(obj)
	pool.query(sql,[obj.uname],(err,result)=>{
		if(err)throw err; 
		console.log(result)
		if(result.length>0){
			res.send('1')
		}else{
			pool.query(INSERT,['DEFAULT',obj.uname,obj.upwd,obj.email,obj.country],
			(err,result)=>{
				if(err)throw err;
				if(result.affectedRows>0){
					res.send('2')
				}else{
					res.send('0')
				}
			})
		}
	})
})

module.exports = router;