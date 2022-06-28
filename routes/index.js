var express = require('express');
var router = express.Router();
var initDB = require('../database/index');
var moment = require('moment');

/******************************************************
 * Retrives the data from DB and send it to handlerbars
 ******************************************************/
router.get('/', function(req, res, next) {
  const query = 'SELECT deals.id, sites.title, deals.site_id, deals.listing_date, deals.revenue FROM sites LEFT JOIN deals ON deals.site_id = sites.id';
  const client = initDB();
  client.query(query, (err, _res) => {
    client.end();
    if (err || !_res.rows || !_res.rows.length) {
      res.render('no-records', {layout: false});
    } else {
      _res.rows.map(row=> {
        if(row.listing_date) {
          row.listing_month = moment(row.listing_date).format('MMM - YYYY');
          row.listing_full_date = moment(row.listing_date).format("MMM DD, YYYY");
        }
        if(row.revenue) row.revenue = parseInt(row.revenue) / 100
        return row;
      })

      res.render('home', {layout: false, data: _res.rows});
    }
  })
});

module.exports = router;
