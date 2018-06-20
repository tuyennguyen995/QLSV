var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);

var mysql = require('mysql') //Ket noi module
var connection = mysql.createConnection({  //Bien connect
  //Thuoc tinh
  host: 'localhost',  //Sai Xampp mac dinh là localhost
  user: 'root',       //Mac dinh root
  password: 'admin@123',       //Mat khau mat dinh trong
  database: 'qlsv'  //Ten csdl
});

//Kiem tra ket noi
connection.connect(function(error){
  if(!!error){
    console.log('Error');
  }
  else{
  console.log('Connected');
  }
})

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function(req, res){
  res.render("main");
})

app.get("/sinhvien/list", function(req, res){
  connection.query('SELECT * FROM sinhvien', function(error, rows){
    if(!!error){
      console.log('Error in the Query');
    }
    else {
      console.log('SUCCESS!');
      res.render("sinhvien_list.ejs",{data:rows});
    }
  })
})

app.get("/sinhvien/them", function(req, res){
// Hien thi form
  res.render("sinhvien_insert.ejs");
})
//Them sinh vien
app.post("/sinhvien/them", urlencodedParser,function(req, res){
//Nhận giá trị từ form
  var hoten = req.body.txtHoTen;
  var email = req.body.txtEmail;

  connection.query("INSERT INTO sinhvien(HOTEN, EMAIL) value('"+hoten+"','"+email+"')", function(error, rows){
    if(!!error){
      console.log('Error in the Query');
    }
    else {
      console.log('SUCCESS!');
      res.redirect("../sinhvien/list");
    }
  })
})

app.get("/sinhvien/sua/:id", function(req, res){
  var id = req.params.id;
  connection.query("SELECT * FROM sinhvien where id ="+id, function(error, rows){
    if(!!error){
      console.log('Error in the Query');
    }
    else {
      console.log('SUCCESS!');
      res.render("sinhvien_edit.ejs",{data:rows[0]});
    }
  })
})

app.post("/sinhvien/sua", urlencodedParser ,function(req, res){
  var id = req.body.txtID;
  var hoten = req.body.txtHoTen;
  var email = req.body.txtEmail;
  connection.query("UPDATE sinhvien SET HOTEN='"+hoten+"', EMAIL='"+email+"' where id ="+id, function(error, rows){
    if(!!error){
      console.log('Error in the Query');
    }
    else {
      console.log('SUCCESS!');
      res.redirect("../sinhvien/list");
    }
  })
})
