const express = require('express');

const pool = require('../pool.js')

let router = express.Router();

router.get("/", (req, res) => {
    var gid = parseInt(req.query.gid)
    var sql =
        `select * from gameapp a,game_media b,app_type c 
         where a.gid=? and a.tid=c.tid and b.game_name=a.game_name order by a.gid asc`;
    pool.query(sql, [gid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send(err)
        }
    })
})

module.exports = router;
