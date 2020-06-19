const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.post("/", (req, res) => {
    var obj = req.body;
    var sql = `select * from user_cart where uid=? and uname=? and cgid=? and game_name=?`;
    var InsertSql = `INSERT INTO user_cart VALUES(?,?,?,?,?)`;
    pool.query(sql, [obj.uid, obj.uname, obj.cgid, obj.game_name], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("-1")
        } else {
            pool.query(InsertSql, ['DEFAULT', obj.uid, obj.uname, obj.cgid, obj.game_name], (err,
                result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send("1")
                } else {
                    res.send("0")
                }
            })
        }
    })
});

router.get("/", (req, res) => {
    var uid = parseInt(req.query.uid);
    var sql =
        `SELECT a.cid, a.game_name,a.cgid,b.price,c.index_img 
               FROM user_cart a,gameapp b,game_media c 
               where uid=? and a.cgid=b.gid and c.gid = b.gid; `;
    pool.query(sql, [uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send("0")
        }
    })
})

router.post("/buy", (req, res) => {
    var uid = parseInt(req.body.uid);
    var arr = req.body.buyitem;
    arr = arr.split(",");
    var sql = ``;
    for (let key in arr) {
        if (typeof arr[key] === "string") {
            arr[key] = parseInt(arr[key])
        }
    }
    for (let i = 0; i < arr.length; i++) {
        sql += `DELETE FROM user_cart WHERE cid=${arr[i]} and uid=${uid};`
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
});

router.post("/remove", (req, res) => {
    var cid = parseInt(req.body.cid);
    var uid = parseInt(req.body.uid);
    var sql = "DELETE FROM user_cart WHERE cid=? and uid=?";
    pool.query(sql, [cid, uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1")
        } else {
            res.send("0")
        }
    })
});

module.exports = router;
