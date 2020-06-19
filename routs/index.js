const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.get('/carousel', (req, res) => {
    var sql =
    `select a.cid,
    a.title,
    a.of_Introduction,
    a.img_src,
    b.lg_img1,
    b.lg_img2,
    b.lg_img3,
    b.lg_img4,
    b.sm_img1,
    b.sm_img2,
    b.sm_img3,
    b.sm_img4,
    c.gid,
    c.price,
    c.is_win,
    c.is_mac
    from index_carousel a,game_media b ,gameapp c where b.game_name=a.title and a.title = c.game_name`;
    pool.query(sql, [], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send('0')
        }
    })
});

router.get("/discount",(req,res)=>{
    var sql = `SELECT A.gid,A.PRICE,B.INDEX_IMG FROM gameapp A, game_media B 
               WHERE B.GAME_NAME = A.GAME_NAME LIMIT 9,9`
        pool.query(sql,[],(err,result)=>{
            if(err)throw err;
            if(result.length > 0){
                res.send(result)
            }else{
                res.send("0")
            }
        })
});

router.get("/banner",(req,res)=>{
    var sql = `SELECT a.gid,a.price,b.index_img FROM 
               gameapp a, game_media b where a.gid = b.gid 
               order by a.price desc  limit 4  `
        pool.query(sql,[],(err,result)=>{
            if(err)throw err;
            if(result.length>0){
                res.send(result)
            }else{
                res.send("0")
            }
        })
});

router.get("/allgame",(req,res)=>{
    var start = parseInt(req.query.start)*parseInt(req.query.pagesize);
    var pagesize = parseInt(req.query.pagesize);
    var sql = `select a.gid,a.game_name,a.price,a.is_win,a.is_mac ,b.index_img,b.lg_img1,b.lg_img2,b.lg_img3,b.lg_img4,c.type_name,c.type_aka 
               from gameapp a ,game_media b,app_type c where a.game_name = b.game_name and c.tid=a.tid order by gid asc limit ?,?`
    pool.query(sql,[start,pagesize],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send(result)
        }else{
            res.send("0")
        }
    })
})

module.exports = router;
