const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.get("/", (req, res) => {
    var uid = parseInt(req.query.uid);
    var sql = `select a.*,b.index_img from user_order a,game_media b where a.user_id=? and a.ogid=b.gid`;
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send(result)
        }else{
            res.send("0")
        }
    })
})

router.post("/", (req, res) => {
    var orders = JSON.parse(req.body.orders);
    var uid = parseInt(req.body.uid);
    var uname = req.body.uname;
    var sql = "";
    for (let i of orders) {
        sql +=`INSERT INTO user_order values(DEFAULT,${uid},'${uname}',${i.cgid},'${i.game_name}',${i.buyTime},${i.price});`
    }
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            if (result.affectedRows > 0) {
                res.send("1")
            } else {
                res.send("0")
            }
        } else {
            if (result.length > 0) {
                res.send("1")
            } else {
                res.send("0")
            }
        }
    })
})

module.exports = router;
