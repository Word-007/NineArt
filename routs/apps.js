const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.get("/",(req,res)=>{
    var tid = parseInt(req.query.tid);
    var term = req.query.term;
    var tidSql = `SELECT a.gid,a.price,a.game_name,a.is_win,a.is_mac,b.*,c.index_img 
    FROM gameapp a,app_type b,game_media c where a.tid=? and b.tid=? and c.gid = a.gid`;
    var termSql = `
    SELECT a.gid,a.game_name,a.price,a.is_win,a.is_mac,b.*,c.index_img 
    FROM gameapp a,app_type b,game_media c 
    where ( a.game_name like "%"?"%" and a.gid=c.gid and a.tid=b.tid)
    or(b.type_name like "%"?"%" and a.tid=b.tid and a.gid=c.gid) 
    or(b.type_aka like "%"?"%" and a.tid=b.tid and a.gid=c.gid)order by a.gid asc`;
    if(tid){
        pool.query(tidSql,[tid,tid],(err,result)=>{
            if(err)throw err;
            if(result.length>0){
                res.send(result)
            }else{
                res.send("0")
            }
        })
    }
    if(term){
        pool.query(termSql,[term,term,term],(err,result)=>{
            if(err)throw err;
            if(result.length>0){
                res.send(result)
            }else{
                res.send("0")
            }
        })
    }
})

module.exports = router;