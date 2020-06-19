const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.get('/:uname&:upwd',(req,res)=>{
	var $uname = req.params.uname;
	var $upwd = req.params.upwd;
	var sql = 'select uid,uname,upwd from game_user where uname=? and upwd=?';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.length>0){
			res.send(result)
		}else{
			res.send('0')
		}
	})
})
module.exports = router;