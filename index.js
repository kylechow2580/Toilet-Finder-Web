//Set up all required module and function
var express   =    require("express");
var bodyParser = require('body-parser');
var mysql     =    require('mysql');
var app       =    express();
var server = require('http').createServer(app);
var http = require("http");

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Connect to the db
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "3100",
    "multipleStatements": true
});
connection.connect();

//load all the statics files
app.use('/css', express.static('css'));
app.get('/javascript/star.js', function(req, res){
    res.sendFile(__dirname + '/javascript/star.js');
});
app.get('/javascript/bootstrap.js', function(req, res){
    res.sendFile(__dirname + '/javascript/bootstrap.js');
});
app.get('/javascript/bootstrap.min.js', function(req, res){
    res.sendFile(__dirname + '/javascript/bootstrap.min.js');
});
app.get('/javascript/location.js', function(req, res){
    res.sendFile(__dirname + '/javascript/location.js');
});
app.get('/javascript/googlemap.js', function(req, res){
    res.sendFile(__dirname + '/javascript/googlemap.js');
});
app.get('/images/logo.png', function(req, res){
    res.sendFile(__dirname + '/images/logo.png');
});
app.get('/images/bg-nav-selected.png', function(req, res){
    res.sendFile(__dirname + '/images/bg-nav-selected.png');
});
app.get('/images/toilet.png', function(req, res){
    res.sendFile(__dirname + '/images/toilet.png');
});
app.get('/fonts/glyphicons-halflings-regular.eot', function(req, res){
    res.sendFile(__dirname + '/fonts/glyphicons-halflings-regular.eot');
});
app.get('/fonts/glyphicons-halflings-regular', function(req, res){
    res.sendFile(__dirname + '/fonts/glyphicons-halflings-regular');
});
app.get('/fonts/glyphicons-halflings-regular', function(req, res){
    res.sendFile(__dirname + '/fonts/glyphicons-halflings-regular');
});
app.get('/fonts/glyphicons-halflings-regular.woff', function(req, res){
    res.sendFile(__dirname + '/fonts/glyphicons-halflings-regular.woff');
});
app.get('/fonts/glyphicons-halflings-regular.woff2', function(req, res){
    res.sendFile(__dirname + '/fonts/glyphicons-halflings-regular.woff2');
});

//Query database
function queryDatabase(sql, callback) {
  connection.query(sql, function(error, results) {
		if (error) {
			return console.error(error);
		}
    callback(null, results);
  });
}

//For url debug
function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
}

//Doing rounting of every url
//To get home page
app.get("/", function(req, res, next) {
  var sql = "select toilets.TID, toilets.image, toilets.name from toilets, comments where comments.TID = toilets.TID GROUP by comments.TID ORDER by comments.star desc LIMIT 5;";
  queryDatabase(sql, function(error, results) {
    var top = results;
    res.render( 'index', {
      image1 : 'url(' + top[0].image + ')',
      image2 : 'url(' + top[1].image + ')',
      image3 : 'url(' + top[2].image + ')',
      image4 : 'url(' + top[3].image + ')',
      image5 : 'url(' + top[4].image + ')',

      img_p1 : top[0].name,
      img_p2 : top[1].name,
      img_p3 : top[2].name,
      img_p4 : top[3].name,
      img_p5 : top[4].name,

      ID1 : top[0].TID,
      ID2 : top[1].TID,
      ID3 : top[2].TID,
      ID4 : top[3].TID,
      ID5 : top[4].TID
    });
  });
});

//To get home page
app.get("/index", function(req, res, next) {
  var sql = "select toilets.TID, toilets.image, toilets.name from toilets, comments where comments.TID = toilets.TID GROUP by comments.TID ORDER by comments.star desc LIMIT 5;";
  queryDatabase(sql, function(error, results) {
    var top = results;
    res.render( 'index', {
      image1 : 'url(' + top[0].image + ')',
      image2 : 'url(' + top[1].image + ')',
      image3 : 'url(' + top[2].image + ')',
      image4 : 'url(' + top[3].image + ')',
      image5 : 'url(' + top[4].image + ')',

      img_p1 : top[0].name,
      img_p2 : top[1].name,
      img_p3 : top[2].name,
      img_p4 : top[3].name,
      img_p5 : top[4].name,

      ID1 : top[0].TID,
      ID2 : top[1].TID,
      ID3 : top[2].TID,
      ID4 : top[3].TID,
      ID5 : top[4].TID
    });
  });
});

//To get logined home page
app.get("/index_u", function(req, res, next) {
  var sql = "select toilets.TID, toilets.image, toilets.name from toilets, comments where comments.TID = toilets.TID GROUP by comments.TID ORDER by comments.star desc LIMIT 5;";

  queryDatabase(sql, function(error, results) {
    var top = results;
    res.render( 'index_u', {
      name : "admin ",

      image1 : 'url(' + top[0].image + ')',
      image2 : 'url(' + top[1].image + ')',
      image3 : 'url(' + top[2].image + ')',
      image4 : 'url(' + top[3].image + ')',
      image5 : 'url(' + top[4].image + ')',

      img_p1 : top[0].name,
      img_p2 : top[1].name,
      img_p3 : top[2].name,
      img_p4 : top[3].name,
      img_p5 : top[4].name,

      ID1 : top[0].TID,
      ID2 : top[1].TID,
      ID3 : top[2].TID,
      ID4 : top[3].TID,
      ID5 : top[4].TID
    });
  });
});

//For login
app.get("/login", function(req, res, next) {

  var item_num = req.query.err;
  if(item_num==null)
  {
    console.log("normal");
    item = 0;
  }
  else
  {
    console.log("err:"+item_num);
  }
  res.render( 'login', {
    errornum : item_num,
  });
});

//For view the personal info
app.get("/person", function(req, res, next) {
    res.render( 'person', {
        name : 'admin' + ' ',
        id : '1155074568',
        email : 'admin@abc.immd',
        gender : 'Female',
        icon : 'https://lh3.googleusercontent.com/5oh994t2XLUThXYZQgeH3lv7Zv0cAHh8qJPuK82tqES6oFDASv4j43D0Hsps84_IhjM=w300'
    });
});

//To show the toilet (logined page)
app.get("/toilet_u", function(req, res, next) {
  var sql = "SELECT * FROM toilets;";
  queryDatabase(sql, function(error, results) {
    var all_toilet = results;
    res.render( 'toilet_u', {
      name : 'admin' + ' ',

      item1_name : all_toilet[0].name,
      item2_name : all_toilet[1].name,
      item3_name : all_toilet[2].name,
      item4_name : all_toilet[3].name,
      item5_name : all_toilet[4].name,
      item6_name : all_toilet[5].name,
      item7_name : all_toilet[6].name,
      item8_name : all_toilet[7].name,
      item9_name : all_toilet[8].name,
      item10_name : all_toilet[9].name,
      item11_name : all_toilet[10].name,
      item12_name : all_toilet[11].name,

      place1_name : 'MMW ENG BUILD pp',
      place2_name : 'MMW ENG BUILD2 pp',
      place3_name : 'MMW ENG BUILD3 pp',
      place4_name : 'MMW ENG BUILD4 pp',
      place5_name : 'MMW ENG BUILD5 pp',
      place6_name : 'MMW ENG BUILD6 pp',
      place7_name : 'MMW ENG BUILD7 pp',
      place8_name : 'MMW ENG BUILD8 pp',
      place9_name : 'MMW ENG BUILD9 pp',
      place10_name : 'MMW ENG BUILD10',
      place11_name : 'MMW ENG BUILD11',
      place12_name : 'MMW ENG BUILD12',

      item0_img : all_toilet[0].image,
      item1_img : all_toilet[1].image,
      item2_img : all_toilet[2].image,
      item3_img : all_toilet[3].image,
      item4_img : all_toilet[4].image,
      item5_img : all_toilet[5].image,
      item6_img : all_toilet[6].image,
      item7_img : all_toilet[7].image,
      item8_img : all_toilet[8].image,
      item9_img : all_toilet[9].image,
      item10_img : all_toilet[10].image,
      item11_img : all_toilet[11].image,

      link1 : all_toilet[0].TID,
      link2 : all_toilet[1].TID,
      link3 : all_toilet[2].TID,
      link4 : all_toilet[3].TID,
      link5 : all_toilet[4].TID,
      link6 : all_toilet[5].TID,
      link7 : all_toilet[6].TID,
      link8 : all_toilet[7].TID,
      link9 : all_toilet[8].TID,
      link10 : all_toilet[9].TID,
      link11 : all_toilet[10].TID,
      link12 : all_toilet[11].TID
    });
  });
});

//To show the toilet
app.get("/toilet", function(req, res, next) {
  var sql = "SELECT * FROM toilets;";
  queryDatabase(sql, function(error, results) {
    var all_toilet = results;
    res.render( 'toilet', {
      item1_name : all_toilet[0].name,
      item2_name : all_toilet[1].name,
      item3_name : all_toilet[2].name,
      item4_name : all_toilet[3].name,
      item5_name : all_toilet[4].name,
      item6_name : all_toilet[5].name,
      item7_name : all_toilet[6].name,
      item8_name : all_toilet[7].name,
      item9_name : all_toilet[8].name,
      item10_name : all_toilet[9].name,
      item11_name : all_toilet[10].name,
      item12_name : all_toilet[11].name,

      place1_name : 'MMW ENG BUILD pp',
      place2_name : 'MMW ENG BUILD2 pp',
      place3_name : 'MMW ENG BUILD3 pp',
      place4_name : 'MMW ENG BUILD4 pp',
      place5_name : 'MMW ENG BUILD5 pp',
      place6_name : 'MMW ENG BUILD6 pp',
      place7_name : 'MMW ENG BUILD7 pp',
      place8_name : 'MMW ENG BUILD8 pp',
      place9_name : 'MMW ENG BUILD9 pp',
      place10_name : 'MMW ENG BUILD10',
      place11_name : 'MMW ENG BUILD11',
      place12_name : 'MMW ENG BUILD12',

      item0_img : all_toilet[0].image,
      item1_img : all_toilet[1].image,
      item2_img : all_toilet[2].image,
      item3_img : all_toilet[3].image,
      item4_img : all_toilet[4].image,
      item5_img : all_toilet[5].image,
      item6_img : all_toilet[6].image,
      item7_img : all_toilet[7].image,
      item8_img : all_toilet[8].image,
      item9_img : all_toilet[9].image,
      item10_img : all_toilet[10].image,
      item11_img : all_toilet[11].image,

      link1 : all_toilet[0].TID,
      link2 : all_toilet[1].TID,
      link3 : all_toilet[2].TID,
      link4 : all_toilet[3].TID,
      link5 : all_toilet[4].TID,
      link6 : all_toilet[5].TID,
      link7 : all_toilet[6].TID,
      link8 : all_toilet[7].TID,
      link9 : all_toilet[8].TID,
      link10 : all_toilet[9].TID,
      link11 : all_toilet[10].TID,
      link12 : all_toilet[11].TID
    });
  });
});

//To show the detail of toilet
app.get("/item", function(req, res, next) {
  var item_num = req.query.link;
  var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num + "; SELECT name,image,special FROM toilets where TID =" + item_num + "; SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num + ";";
  queryDatabase(sql, function(error, results) {
    var star = results[0];
    var itemuse = results[1];
    var com = results[2];
    var count = Math.round(star[0].a);
    console.log("Get Go to item " + item_num);
    if (com.length < 3){
        for (var i = com.length ; i < 12; i++){
            com[i] = "";
        }
    }
    res.render( 'item', {
      place_image : itemuse[0].image,
      place_name : itemuse[0].name,
      place_description : itemuse[0].special,

  		temp : count,

      commenticon1 : com[0].image,
  		commenter1 : com[0].name,
      commentnum1 : com[0].MID,
      comment1 : com[0].comments,

      commenticon2 : com[1].image,
      commenter2 : com[1].name,
      commentnum2 : com[1].MID,
      comment2 : com[1].comments,

  		commenticon3 : com[2].image,
      commenter3 : com[2].name,
      commentnum3 : com[2].MID,
      comment3 : com[2].comments
    });
  });
});

//To show the detail toilet (logined page)
app.get("/item_u", function(req, res, next) {
  var item_num = req.query.link;
  var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num + "; SELECT name,image,special FROM toilets where TID =" + item_num + "; SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num + ";";
  queryDatabase(sql, function(error, results) {
    var star = results[0];
    var itemuse = results[1];
    var com = results[2];
    var count = Math.round(star[0].a);
    console.log("Go to item " + item_num);
    if (com.length < 3){
        for (var i = com.length ; i < 12; i++){
            com[i] = "";
        }
    }
    res.render( 'item_u', {
      name : 'admin' + ' ',
      id : '1155074568',
      email : 'admin@abc.immd',
      gender : 'Female',

      place_image : itemuse[0].image,
      place_name : itemuse[0].name,
      place_description : itemuse[0].special,

  		temp : count,

      commenticon1 : com[0].image,
  		commenter1 : com[0].name,
      commentnum1 : com[0].MID,
      comment1 : com[0].comments,

      commenticon2 : com[1].image,
      commenter2 : com[1].name,
      commentnum2 : com[1].MID,
      comment2 : com[1].comments,

  		commenticon3 : com[2].image,
      commenter3 : com[2].name,
      commentnum3 : com[2].MID,
      comment3 : com[2].comments
    });
  });
});


//Handle every post request
//To search toilet
app.post("/item", function(req, res, next) {
  var item_num = req.query.link;
  var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num + "; SELECT name,image,special FROM toilets where TID =" + item_num + "; SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num + ";";
  queryDatabase(sql, function(error, results) {
    var star = results[0];
    var itemuse = results[1];
    var com = results[2];
    var count = Math.round(star[0].a);
    console.log("Post Go to item " + item_num);
    if (com.length < 3){
        for (var i = com.length ; i < 12; i++){
            com[i] = "";
        }
    }
    res.render( 'item', {
      place_image : itemuse[0].image,
      place_name : itemuse[0].name,
      place_description : itemuse[0].special,

      temp : count,

      commenticon1 : com[0].members.image,
      commenter1 : com[0].members.name,
      commentnum1 : com[0].comments.MID,
      comment1 : com[0].comments.comments,

      commenticon2 : com[1].members.image,
      commenter2 : com[1].members.name,
      commentnum2 : com[1].comments.MID,
      comment2 : com[1].comments.comments,

      commenticon3 : com[2].members.image,
      commenter3 : com[2].members.name,
      commentnum3 : com[2].comments.MID,
      comment3 : com[2].comments.comments
    });
  });
});

//To search toilet (logined page)
app.post("/item_u", function(req, res, next) {
  var item_num = req.query.link;
  var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num + "; SELECT name,image,special FROM toilets where TID =" + item_num + "; SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num + ";";
  queryDatabase(sql, function(error, results) {
    var star = results[0];
    var itemuse = results[1];
    var com = results[2];
    var count = Math.round(star[0].a);
    console.log("Post Go to item " + item_num);
    if (com.length < 3){
        for (var i = com.length ; i < 12; i++){
            com[i] = "";
        }
    }
    res.render( 'item_u', {
      place_image : itemuse[0].image,
      place_name : itemuse[0].name,
      place_description : itemuse[0].special,

      temp : count,

      commenticon1 : com[0].members.image,
      commenter1 : com[0].members.name,
      commentnum1 : com[0].comments.MID,
      comment1 : com[0].comments.comments,

      commenticon2 : com[1].members.image,
      commenter2 : com[1].members.name,
      commentnum2 : com[1].comments.MID,
      comment2 : com[1].comments.comments,

      commenticon3 : com[2].members.image,
      commenter3 : com[2].members.name,
      commentnum3 : com[2].comments.MID,
      comment3 : com[2].comments.comments
    });
  });
});

//For login as member
app.post("/login", function(request, response){
    var adminac = "admin";
    var adminpw = "123456";



    if(adminac != request.body.ac)
    {
      console.log("No this account");
      response.writeHead(302, {'Location': 'login?err=1'});
      response.end();
    }
    else
    {
      console.log("Ac match but pw not confirm!");
      if(request.body.pw != adminpw)
      {
        console.log("pw failed");
        response.writeHead(302, {'Location': 'login?err=1'});
        response.end();
      }
      else
      {
        console.log("login success");
        response.writeHead(302, {'Location': 'index_u'});
        response.end();
      }
    }

});

//To show searched toilet
app.post("/toilet", function(req, res,next) {
  var lat;
  var lng;
  var sql;
  console.log("received: " + req.body.word);
  key = req.body.word;
  if (/[^a-zA-Z]/.test(key)) { //Search by GPS
      lat = parseFloat(key.substr(0,key.indexOf(' ')-1));
      lng = parseFloat(key.substr(key.indexOf(' ')));
      sql = "SELECT * from toilets WHERE abs(x(location) - " + [lat] + ") <= 0.0056 AND abs(y(location) - " + [lng] + ") <= 0.0056";
      queryDatabase(sql, function(error, results) {
        var find = results;
        console.log("toilets find: " + find.length);
        if (find.length < 12){
            for (var i = find.length ; i < 12; i++){
                find[i] = "";
            }
        }
        //add for loop to store link value to tmp
        res.render( 'toilet', {
            item1_name : find[0].name || " ",
            item2_name : find[1].name || " ",
            item3_name : find[2].name || " ",
            item4_name : find[3].name || " ",
            item5_name : find[4].name || " ",
            item6_name : find[5].name || " ",
            item7_name : find[6].name || " ",
            item8_name : find[7].name || " ",
            item9_name : find[8].name || " ",
            item10_name : find[9].name || " ",
            item11_name : find[10].name || " ",
            item12_name : find[11].name || " ",

            place1_name : 'MMW ENG BUILD pp',
            place2_name : 'MMW ENG BUILD2 pp',
            place3_name : 'MMW ENG BUILD3 pp',
            place4_name : 'MMW ENG BUILD4 pp',
            place5_name : 'MMW ENG BUILD5 pp',
            place6_name : 'MMW ENG BUILD6 pp',
            place7_name : 'MMW ENG BUILD7 pp',
            place8_name : 'MMW ENG BUILD8 pp',
            place9_name : 'MMW ENG BUILD9 pp',
            place10_name : 'MMW ENG BUILD10',
            place11_name : 'MMW ENG BUILD11',
            place12_name : 'MMW ENG BUILD12',

            item0_img : find[0].image || " ",
            item1_img : find[1].image || " ",
            item2_img : find[2].image || " ",
            item3_img : find[3].image || " ",
            item4_img : find[4].image || " ",
            item5_img : find[5].image || " ",
            item6_img : find[6].image || " ",
            item7_img : find[7].image || " ",
            item8_img : find[8].image || " ",
            item9_img : find[9].image || " ",
            item10_img : find[10].image || " ",
            item11_img : find[11].image || " ",

            link1 : find[0].TID,
            link2 : find[1].TID,
            link3 : find[2].TID,
            link4 : find[3].TID,
            link5 : find[4].TID,
            link6 : find[5].TID,
            link7 : find[6].TID,
            link8 : find[7].TID,
            link9 : find[8].TID,
            link10 : find[9].TID,
            link11 : find[10].TID,
            link12 : find[11].TID
        });
      });
  } else { //Search by keywords
      sql = "SELECT * FROM toilets WHERE name LIKE \"%" + [key] + "%\"";
      queryDatabase(sql, function(error, results) {
        var find = results;
        console.log("toilets find: " + find.length);
        if (find.length < 12){
            for (var i = find.length ; i < 12; i++){
                find[i] = "";
            }
        }
        //add for loop to store link value to tmp
        res.render( 'toilet', {
            item1_name : find[0].name || " ",
            item2_name : find[1].name || " ",
            item3_name : find[2].name || " ",
            item4_name : find[3].name || " ",
            item5_name : find[4].name || " ",
            item6_name : find[5].name || " ",
            item7_name : find[6].name || " ",
            item8_name : find[7].name || " ",
            item9_name : find[8].name || " ",
            item10_name : find[9].name || " ",
            item11_name : find[10].name || " ",
            item12_name : find[11].name || " ",

            place1_name : 'MMW ENG BUILD pp',
            place2_name : 'MMW ENG BUILD2 pp',
            place3_name : 'MMW ENG BUILD3 pp',
            place4_name : 'MMW ENG BUILD4 pp',
            place5_name : 'MMW ENG BUILD5 pp',
            place6_name : 'MMW ENG BUILD6 pp',
            place7_name : 'MMW ENG BUILD7 pp',
            place8_name : 'MMW ENG BUILD8 pp',
            place9_name : 'MMW ENG BUILD9 pp',
            place10_name : 'MMW ENG BUILD10',
            place11_name : 'MMW ENG BUILD11',
            place12_name : 'MMW ENG BUILD12',

            item0_img : find[0].image || " ",
            item1_img : find[1].image || " ",
            item2_img : find[2].image || " ",
            item3_img : find[3].image || " ",
            item4_img : find[4].image || " ",
            item5_img : find[5].image || " ",
            item6_img : find[6].image || " ",
            item7_img : find[7].image || " ",
            item8_img : find[8].image || " ",
            item9_img : find[9].image || " ",
            item10_img : find[10].image || " ",
            item11_img : find[11].image || " ",

            link1 : find[0].TID,
            link2 : find[1].TID,
            link3 : find[2].TID,
            link4 : find[3].TID,
            link5 : find[4].TID,
            link6 : find[5].TID,
            link7 : find[6].TID,
            link8 : find[7].TID,
            link9 : find[8].TID,
            link10 : find[9].TID,
            link11 : find[10].TID,
            link12 : find[11].TID
        });
      });
  }
});

//To show searched toilet (logined page)
app.post("/toilet_u", function(req, res,next) {
  var lat;
  var lng;
  var sql;
  console.log("received: " + req.body.word);
  key = req.body.word;
  if (/[^a-zA-Z]/.test(key)) { //Search by GPS
      lat = parseFloat(key.substr(0,key.indexOf(' ')-1));
      lng = parseFloat(key.substr(key.indexOf(' ')));
      sql = "SELECT * from toilets WHERE abs(x(location) - " + [lat] + ") <= 0.0056 AND abs(y(location) - " + [lng] + ") <= 0.0056";
      queryDatabase(sql, function(error, results) {
        var find = results;
        console.log("toilets find: " + find.length);
        if (find.length < 12){
            for (var i = find.length ; i < 12; i++){
                find[i] = "";
            }
        }
        //add for loop to store link value to tmp
        res.render( 'toilet_u', {
          name : 'admin' + ' ',

          item1_name : find[0].name || " ",
          item2_name : find[1].name || " ",
          item3_name : find[2].name || " ",
          item4_name : find[3].name || " ",
          item5_name : find[4].name || " ",
          item6_name : find[5].name || " ",
          item7_name : find[6].name || " ",
          item8_name : find[7].name || " ",
          item9_name : find[8].name || " ",
          item10_name : find[9].name || " ",
          item11_name : find[10].name || " ",
          item12_name : find[11].name || " ",

          place1_name : 'MMW ENG BUILD pp',
          place2_name : 'MMW ENG BUILD2 pp',
          place3_name : 'MMW ENG BUILD3 pp',
          place4_name : 'MMW ENG BUILD4 pp',
          place5_name : 'MMW ENG BUILD5 pp',
          place6_name : 'MMW ENG BUILD6 pp',
          place7_name : 'MMW ENG BUILD7 pp',
          place8_name : 'MMW ENG BUILD8 pp',
          place9_name : 'MMW ENG BUILD9 pp',
          place10_name : 'MMW ENG BUILD10',
          place11_name : 'MMW ENG BUILD11',
          place12_name : 'MMW ENG BUILD12',

          item0_img : find[0].image || " ",
          item1_img : find[1].image || " ",
          item2_img : find[2].image || " ",
          item3_img : find[3].image || " ",
          item4_img : find[4].image || " ",
          item5_img : find[5].image || " ",
          item6_img : find[6].image || " ",
          item7_img : find[7].image || " ",
          item8_img : find[8].image || " ",
          item9_img : find[9].image || " ",
          item10_img : find[10].image || " ",
          item11_img : find[11].image || " ",

          link1 : find[0].TID,
          link2 : find[1].TID,
          link3 : find[2].TID,
          link4 : find[3].TID,
          link5 : find[4].TID,
          link6 : find[5].TID,
          link7 : find[6].TID,
          link8 : find[7].TID,
          link9 : find[8].TID,
          link10 : find[9].TID,
          link11 : find[10].TID,
          link12 : find[11].TID
        });
      });
  } else { //Search by keywords
      sql = "SELECT * FROM toilets WHERE name LIKE \"%" + [key] + "%\"";
      queryDatabase(sql, function(error, results) {
        var find = results;
        console.log("toilets find: " + find.length);
        if (find.length < 12){
            for (var i = find.length ; i < 12; i++){
                find[i] = "";
            }
        }
        //add for loop to store link value to tmp
        res.render( 'toilet_u', {
          name : 'admin' + ' ',

          item1_name : find[0].name || " ",
          item2_name : find[1].name || " ",
          item3_name : find[2].name || " ",
          item4_name : find[3].name || " ",
          item5_name : find[4].name || " ",
          item6_name : find[5].name || " ",
          item7_name : find[6].name || " ",
          item8_name : find[7].name || " ",
          item9_name : find[8].name || " ",
          item10_name : find[9].name || " ",
          item11_name : find[10].name || " ",
          item12_name : find[11].name || " ",

          place1_name : 'MMW ENG BUILD pp',
          place2_name : 'MMW ENG BUILD2 pp',
          place3_name : 'MMW ENG BUILD3 pp',
          place4_name : 'MMW ENG BUILD4 pp',
          place5_name : 'MMW ENG BUILD5 pp',
          place6_name : 'MMW ENG BUILD6 pp',
          place7_name : 'MMW ENG BUILD7 pp',
          place8_name : 'MMW ENG BUILD8 pp',
          place9_name : 'MMW ENG BUILD9 pp',
          place10_name : 'MMW ENG BUILD10',
          place11_name : 'MMW ENG BUILD11',
          place12_name : 'MMW ENG BUILD12',

          item0_img : find[0].image || " ",
          item1_img : find[1].image || " ",
          item2_img : find[2].image || " ",
          item3_img : find[3].image || " ",
          item4_img : find[4].image || " ",
          item5_img : find[5].image || " ",
          item6_img : find[6].image || " ",
          item7_img : find[7].image || " ",
          item8_img : find[8].image || " ",
          item9_img : find[9].image || " ",
          item10_img : find[10].image || " ",
          item11_img : find[11].image || " ",

          link1 : find[0].TID,
          link2 : find[1].TID,
          link3 : find[2].TID,
          link4 : find[3].TID,
          link5 : find[4].TID,
          link6 : find[5].TID,
          link7 : find[6].TID,
          link8 : find[7].TID,
          link9 : find[8].TID,
          link10 : find[9].TID,
          link11 : find[10].TID,
          link12 : find[11].TID
        });
      });
  }
});

http.createServer(app).listen(8000);
