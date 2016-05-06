//Set up all required module and function
var express   =    require("express");
var bodyParser = require('body-parser');
var mysql     =    require('mysql');
var app       =    express();
var server = require('http').createServer(app);
var http = require("http");
var __dirname = "/Users/Kyle/Desktop/test";
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Declare variable needed in template engine
var global,itemuse,itemimage, top, find, key,tmp,logined;
var star, username, com;

//Connect to the db
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "3100"
});

//All sql statement we needed
var sql = "SELECT * FROM toilets";
connection.query(sql, function(error, results) {
		if (error) {
				return console.error(error);
		}
		global = results;
});
var sql = "select toilets.TID, toilets.image, toilets.name from toilets, comments where comments.TID = toilets.TID GROUP by comments.TID ORDER by comments.star desc LIMIT 5 ";
connection.query(sql, function(error, results) {
		if (error) {
				return console.error(error);
		}
		top = results;
});

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






function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
}

//Doing rounting of every url
app.get("/index.html", function(req, res, next) {
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
app.get("/index_u.html", function(req, res, next) {
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
app.get("/login.html", function(req, res, next) {

  var item_num = req.param('err');
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

app.get("/person.html", function(req, res, next) {
    res.render( 'person', {
        name : 'admin' + ' ',
        id : '1155074568',
        email : 'admin@abc.immd',
        gender : 'Female',
        icon : 'https://lh3.googleusercontent.com/5oh994t2XLUThXYZQgeH3lv7Zv0cAHh8qJPuK82tqES6oFDASv4j43D0Hsps84_IhjM=w300'
    });
});
app.get("/toilet_u.html", function(req, res, next) {
    res.render( 'toilet_u', {
      name : 'admin' + ' ',
      id : '1155074568',
      email : 'admin@abc.immd',
      gender : 'Female',
        item1_name : global[0].name,
        item2_name : global[1].name,
        item3_name : global[2].name,
        item4_name : global[3].name,
        item5_name : global[4].name,
        item6_name : global[5].name,
        item7_name : global[6].name,
        item8_name : global[7].name,
        item9_name : global[8].name,
        item10_name : global[9].name,
        item11_name : global[10].name,
        item12_name : global[11].name,

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
        place12_name : 'MMW ENG BUILD12'
    });
});
app.get("/toilet.html", function(req, res, next) {
    console.log("GET GET GET received: " + req.param['word']);
    key = req.param['word'];
    var sql = "SELECT * from toilets";
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
        global = results;
    });
    console.log("toilets find: " + global.length);
    if (global.length < 12){
        for (var i = global.length ; i < 12; i++){
            global[i] = "";
        }
    }
    res.render( 'toilet', {
        item1_name : global[0].name,
        item2_name : global[1].name,
        item3_name : global[2].name,
        item4_name : global[3].name,
        item5_name : global[4].name,
        item6_name : global[5].name,
        item7_name : global[6].name,
        item8_name : global[7].name,
        item9_name : global[8].name,
        item10_name : global[9].name,
        item11_name : global[10].name,
        item12_name : global[11].name,

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

        item0_img : global[0].image,
        item1_img : global[1].image,
        item2_img : global[2].image,
        item3_img : global[3].image,
        item4_img : global[4].image,
        item5_img : global[5].image,
        item6_img : global[6].image,
        item7_img : global[7].image,
        item8_img : global[8].image,
        item9_img : global[9].image,
        item10_img : global[10].image,
        item11_img : global[11].image,

        link1 : global[0].TID,
        link2 : global[1].TID,
        link3 : global[2].TID,
        link4 : global[3].TID,
        link5 : global[4].TID,
        link6 : global[5].TID,
        link7 : global[6].TID,
        link8 : global[7].TID,
        link9 : global[8].TID,
        link10 : global[9].TID,
        link11 : global[10].TID,
        link12 : global[11].TID
    });
});



app.get("/item.html", function(req, res, next) {
    var item_num = req.param('link');
    var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num;
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
        star = results;
    });
    var count = Math.round(star[0].a);
    console.log("Go to item " + item_num);
    var sql = "SELECT name,image,special FROM toilets where TID =" + item_num;
		connection.query(sql, function(error, results) {
				if (error) {
						return console.error(error);
				}
				itemuse = results;
		});
    var sql = "SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num;
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
    		com = results;
    });
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

app.get("/item_u.html", function(req, res, next) {
    var item_num = req.param('link');
    var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num;
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
        star = results;
    });
    var count = Math.round(star[0].a);
    console.log("Go to item " + item_num);
    var sql = "SELECT name,image,special FROM toilets where TID =" + item_num;
		connection.query(sql, function(error, results) {
				if (error) {
						return console.error(error);
				}
				itemuse = results;
		});
    var sql = "SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num;
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
    		com = results;
    });
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


//Handle every post request
app.post("/item.html", function(req, res, next) {
    var item_num = req.param('link');
    var sql = "SELECT AVG(star) as a FROM comments where TID =" + item_num;
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
        star = results;
    });
    var count = Math.round(star[0].a);
    console.log("Go to item " + item_num);
    var sql = "SELECT name,image,special FROM toilets where TID =" + item_num;
		connection.query(sql, function(error, results) {
				if (error) {
						return console.error(error);
				}
				itemuse = results;
		});
    var sql = "SELECT members.name, members.image, comments.MID, comments.comments FROM comments left join members on comments.MID=members.MID where TID =" + item_num;
    connection.query(sql, function(error, results) {
        if (error) {
            return console.error(error);
        }
    		com = results;
    });
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


app.post("/login.html", function(request, response){
    var adminac = "admin";
    var adminpw = "123456";



    if(adminac != request.body.ac)
    {
      console.log("No this account");
      response.writeHead(302, {'Location': 'login.html?err=1'});
      response.end();
    }
    else
    {
      console.log("Ac match but pw not confirm!");
      if(request.body.pw != adminpw)
      {
        console.log("pw failed");
        response.writeHead(302, {'Location': 'login.html?err=1'});
        response.end();
      }
      else
      {
        console.log("login success");
        response.writeHead(302, {'Location': 'index_u.html'});
        response.end();
      }
    }

});

app.post("/toilet.html", function(req, res,next) {
    console.log("received: " + req.body.word);
    key = req.body.word;
    if (/[^a-zA-Z]/.test(key)) {
        var lat = parseFloat(key.substr(0,key.indexOf(' ')-1));
        var lng = parseFloat(key.substr(key.indexOf(' ')));
        var sql = "SELECT * from toilets WHERE abs(x(location) - " + [lat] + ") <= 0.0006 AND abs(y(location) - " + [lng] + ") <= 0.0006";
    } else {
        var sql = "SELECT * FROM toilets WHERE name LIKE \"%" + [key] + "%\"";
    }
        connection.query(sql, function(error, results) {
                if (error) {
                        return console.error(error);
                } else {
            find = results;
            console.log(find);
        }
        });
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

http.createServer(app).listen(8000);
