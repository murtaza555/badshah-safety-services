//express is a web application server framework
let express = require('express');

//assign express function full access to a variable
let app = express();

// mysql library to connect to database 
let mysql = require('mysql');

//to store image in database
var base64ToImage = require('base64-to-image');

//to get post request from the ajax
var bodyParser = require('body-parser')
    //var jsonParser = bodyParser.json()

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyparser.json());

//to get ip address of system 
let ip = require('ip').address();

//get url 
var url = require('url');

// fs file system
var fs = require('fs')


let uuid = require('uuidv4')

const { v4: uuidv4 } = require('uuid');

// .env file use
let dotenv = require('dotenv');
dotenv.config();

//to encode the post request to json
//let urlencodedparser = bodyparser.urlencoded({ extended: false });

//to set the template engine as ejs
app.set('view engine', 'ejs');

//to use json functionalities
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb' }));


//to make publically access of public folder
app.use(express.static('./public'));

//app.use(bodyparser.json({ limit: '50mb', extended: true }))
//app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }))


//to create connection to the database from nodejs
let connection = mysql.createConnection({
    host: process.env.Host,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database

})



//response if database connected or not on console
connection.connect(function(error) {
    if (!!error) {
        console.log("error on database connection");

    } else {
        console.log("database connected");
    }
})
let link_url = null;
let port = process.env.Port || 3006;
app.listen(port, function(err) {

    if (err) {
        console.log("Error while creating connection");

    } else {
        link_url = 'http://' + ip + ':' + port;
        console.log('server started at http://' + ip + ':' + port);


    }

});



//--------------------------------- Get Start ------------------------------------

app.get('/', function(req, res) {

    //console.log('Cookies: ', req.cookies)

    res.render('index');
})

app.get('/admin', function(req, res) {

    //console.log('Cookies: ', req.cookies)

    res.render('admin');
})
app.get('/products', function(req, res) {

    //console.log('Cookies: ', req.cookies)

    res.render('products');
})

app.get('/product', function(req, res) {

    //console.log('Cookies: ', req.cookies)

    res.render('product');
})

app.get('/login', function(req, res) {

        //console.log('Cookies: ', req.cookies)

        res.render('login');
    })
    //---------------------------------- Get End -------------------------------------



//----------------------------------POST Start -----------------------------------
let get_Products = null;
let get_Recent = null;
app.post('/getProducts', function(req, res) {

    connection.query(`CREATE TABLE if not exists products (product_name varchar(200), product_price int(10),product_description varchar(5000),product_image varchar(300),product_size varchar(2000), products_tags varchar(2000),specification varchar(3000),category varchar(100),uuid_no varchar(50))`, function(err, rows, fields) {
        if (err) {

            console.log(err);

        }
    })
    connection.query(`CREATE TABLE if not exists recentProducts (product_name varchar(200),product_price int(10),product_image varchar(300),category varchar(100),uuid_no varchar(50))`, function(err, rows, fields) {
        if (err) {

            console.log(err);

        }
    })
    connection.query("SELECT product_name , product_price,product_description ,product_image ,product_size, products_tags, specification, category, uuid_no FROM products", function(err, rows, fields) {

        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);

        } else {

            get_Products = rows;
            connection.query("SELECT product_name ,product_price ,product_image ,category, uuid_no FROM recentProducts", function(err, rows, fields) {

                if (err) {
                    res.send({
                        status: 'no'
                    });
                    console.log(err);

                } else {
                    get_Recent = rows
                    connection.query("SELECT category_name, COUNT(*) AS count FROM categories  GROUP BY category_name", function(err, rows, fields) {

                        if (err) {
                            res.send({
                                status: 'no'
                            });
                            console.log(err);
                        } else {

                            get_category = rows
                            connection.query("SELECT category_name, category_image FROM categories", function(err, rows, fields) {

                                if (err) {
                                    res.send({
                                        status: 'no'
                                    });
                                    console.log(err);
                                } else {

                                    getAllCategories = rows
                                    connection.query("SELECT category, COUNT(*) AS count FROM products  GROUP BY category", function(err, rows, fields) {

                                        if (err) {
                                            res.send({
                                                status: 'no'
                                            });
                                            console.log(err);
                                        } else {
                                            res.send({
                                                status: 'ok',
                                                get_Products: get_Products,
                                                get_Recent: get_Recent,
                                                get_category: get_category,
                                                getAllCategories: getAllCategories,
                                                categoryCountNumber: rows

                                            });

                                        }
                                    })














                                    // res.send({
                                    //     status: 'ok',
                                    //     get_Products: get_Products,
                                    //     get_Recent: get_Recent,
                                    //     get_category:get_category,
                                    //     getAllCategories:rows
                                    // });

                                }
                            })




                        }
                    })
                }


            })

        }

    })

})



app.post('/getBanners', function(req, res) {
    connection.query(`CREATE TABLE if not exists banner_img (id INT(10) AUTO_INCREMENT PRIMARY KEY, banner_name varchar(50))`, function(err, rows, fields) {
        if (err) {

            console.log(err);

        }
    })


    connection.query("SELECT * FROM  banner_img ", function(err, rows, fields) {

        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);
        } else {
            res.send({
                status: 'ok',
                banner_img: rows
            });

        }
    })


})

app.post('/getUuid', function(req, res) {

    // let uuid1 = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'



    // if (uuid1 !== null) {

    //     res.send({
    //         status: 'ok',
    //         get_uuid: uuid1
    //     });
    // }
})

let uuid1 = null;
var uuid11 = null;
var imgName = null;

app.post('/update_item_details', function(req, res) {

    async function call_uuidGenerator() {
        uuid11 = await uuidGenerator();
        imgName = null;


        if (req.body.srcData !== null) { //start testing
            var base64Str = req.body.srcData;
            var path = './public/img/';


            var optionalObj = { 'fileName': `${uuid11}.jpeg`, 'type': 'jpeg' };

            imgName = `${uuid11}.jpeg`;

            //var optionalObj = { 'fileName': 'testing', 'type': 'jpeg' };


            var imageInfo = base64ToImage(base64Str, path, optionalObj);

            //end testing}
        }

        connection.query("INSERT INTO products (product_name,product_price,product_description,product_image,product_size,products_tags,specification,category,uuid_no) VALUES (?,?,?,?,?,?,?,?,?)", [req.body.item_name_input, req.body.item_price_input, req.body.item_description_input, imgName, JSON.stringify(req.body.array_size), JSON.stringify(req.body.array_tags), JSON.stringify(req.body.array_specification), req.body.category, uuid11], function(err, rows, fields) {
            if (err) {
                res.send({
                    status: 'no'
                });
                console.log(err);
            } else {
                res.send({
                    status: 'ok',

                });

            }


        })



        if (req.body.recent_do === "yes") {

            connection.query("INSERT INTO recentProducts (product_name,product_price,product_image,category,uuid_no) VALUES (?,?,?,?,?)", [req.body.item_name_input, req.body.item_price_input, imgName, req.body.category, uuid11], function(err, rows, fields) {
                if (err) {
                    res.send({
                        status: 'no'
                    });
                    console.log(err);
                }



            })

        }



    }
    call_uuidGenerator();




})


app.post('/add_new_category', function(req, res) {

    // async   function call_uuidGenerator (){
    //  uuid11 = await uuidGenerator();
    imgName = null;


    if (req.body.srcData !== null) { //start testing
        var base64Str = req.body.srcData;
        var path = './public/img/';


        var optionalObj = { 'fileName': `${req.body.category_name_input}.jpeg`, 'type': 'jpeg' };

        imgName = `${req.body.category_name_input}.jpeg`;

        //var optionalObj = { 'fileName': 'testing', 'type': 'jpeg' };


        var imageInfo = base64ToImage(base64Str, path, optionalObj);

        //end testing}
    }


    connection.query("INSERT INTO categories (category_name,category_image) VALUES (?,?)", [req.body.category_name_input, imgName], function(err, rows, fields) {
        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);
        } else {
            res.send({
                status: 'ok',

            });

        }


    })



    //  if(req.body.recent_do === "yes"){

    //   connection.query("INSERT INTO recentProducts (product_name,product_price,product_image,category,uuid_no) VALUES (?,?,?,?,?)", [req.body.item_name_input,req.body.item_price_input,imgName,req.body.category,uuid11], function(err, rows, fields) {
    //       if (err) {
    //           res.send({
    //               status: 'no'
    //           });
    //           console.log(err);
    //       }



    //   })

    //  } 



    //}
    // call_uuidGenerator();




})












function uuidGenerator() {
    return new Promise(resolve => {

        uuid1 = null
        uuid1 = uuidv4();

        connection.query("SELECT * FROM products WHERE   uuid_no = ?", [uuid1], function(err, rows, fields) {

            if (err) {
                // res.send({
                //     status: 'no'
                // });
                console.log(err);

            } else {

                if (rows.length > 0) {
                    uuidGenerator()
                } else {

                    resolve(uuid1);

                    return uuid1
                }


            }


        })
    });

}

app.post('/delete_product', function(req, res) {



    connection.query('DELETE FROM  products  WHERE uuid_no = ?', [req.body.delete_uuid], function(err, rows, fields) {

        if (err) {

            console.log(err);
            res.send({
                status: 'no',

            });

        } else {
            //invoice_number_holder = rows;



            connection.query('DELETE FROM  recentProducts  WHERE uuid_no = ?', [req.body.delete_uuid], function(err, rows, fields) {

                if (err) {

                    console.log(err);
                    res.send({
                        status: 'no',

                    });

                } else {
                    //invoice_number_holder = rows;

                    const path1 = `./public/img/${req.body.delete_uuid}.jpeg`

                    fs.unlink(path1, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    })

                    res.send({
                        status: 'ok',

                    });
                }



            })


        }



    })



})


app.post('/loginCheck', function(req, res) {
    connection.query(`CREATE TABLE if not exists adminlogin (username varchar(100), password varchar(100))`, function(err, rows, fields) {
        if (err) {

            console.log(err);

        }
    })


    connection.query("SELECT * FROM  adminlogin ", function(err, rows, fields) {

        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);
        } else {

            rows.filter(function(e) {

                if (req.body.username === e.username && req.body.password === e.password) {


                    res.send({
                        status: 'ok',
                        code: "yes"
                    });

                } else {
                    res.send({
                        status: 'no',

                    });

                }
            })




        }
    })


})




app.post('/delete_order', function(req, res) {



    connection.query('DELETE FROM  order_details  WHERE id = ?', [req.body.delete_id], function(err, rows, fields) {

        if (err) {

            console.log(err);
            res.send({
                status: 'no',

            });

        } else {
            res.send({
                status: 'ok',

            });


        }



    })



})

app.post('/get_product_info', function(req, res) {



    connection.query("SELECT * FROM products WHERE   uuid_no = ?", [req.body.uuid], function(err, rows, fields) {

        if (err) {

            console.log(err);
            res.send({
                status: 'no',

            });

        } else {
            //invoice_number_holder = rows;
            res.send({
                status: 'ok',
                product_info: rows
            });

        }

    })

})

app.post('/get_product_info_category', function(req, res) {



    connection.query("SELECT * FROM products WHERE   category = ?", [req.body.category_name], function(err, rows, fields) {

        if (err) {

            console.log(err);
            res.send({
                status: 'no',

            });

        } else {
            //invoice_number_holder = rows;
            res.send({
                status: 'ok',
                product_info: rows
            });

        }

    })

})
app.post('/upload_order', function(req, res) {




    connection.query(`create table if not exists order_details (id INT(10)  AUTO_INCREMENT PRIMARY KEY,uuid_no varchar(50),date_current varchar(15),client varchar(5000),product_detail varchar(5000),status varchar(30))`, function(err, rows, fields) {
        if (err) {

            console.log(err);

        }
    })

    connection.query("INSERT INTO order_details (uuid_no,date_current,client,product_detail) VALUES (?,?,?,?)", [req.body.uuid_no, req.body.date_current, JSON.stringify(req.body.client), JSON.stringify(req.body.product_detail)], function(err, rows, fields) {

        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);

        } else {
            res.send({
                status: 'ok',

            });
        }




    })

})

app.post('/getOrders', function(req, res) {

    connection.query(`CREATE TABLE if not exists order_details (id INT(10) AUTO_INCREMENT PRIMARY KEY,uuid_no varchar(50),date_current varchar(15),client varchar(5000),product_detail varchar(5000),status varchar(30))`, function(err, rows, fields) {
        if (err) {

            console.log(err);

        }
    })

    connection.query("SELECT id , uuid_no , date_current , client , product_detail , status FROM order_details", function(err, rows, fields) {

        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);

        } else {

            res.send({
                status: 'ok',
                getOrdersDeatil: rows
            });

        }

    })

})




//email section

app.post('/send_email', function(req, res) {

    connection.query("UPDATE order_details SET status = ? WHERE id = ?", [req.body.status, req.body.id], function(err, rows, fields) {

        if (err) {
            res.send({
                status: 'no'
            });
            console.log(err);

        }
        // else {
        //     res.send({
        //         status: 'ok',

        //     });
        // }

    })

    let order_id = req.body.id;
    let order_uuid = req.body.uuid_no;
    let order_date_current = req.body.date_current;
    let order_status = null;
    let check_status_order = req.body.status;
    if (check_status_order === "order_confirmed") {
        order_status = "Confirmed";
    }
    if (check_status_order === "item_bagged") {
        order_status = "Bagged";
    }
    if (check_status_order === "item_dispatched") {
        order_status = "Dispatched";

    }

    let order_client_name = null;
    let order_client_mobile = null;
    let order_client_email = null;
    let order_client_address = null;
    let order_client_pincode = null;
    let order_product_name = null;
    let order_product_price = null;


    req.body.client.filter(function(e) {

        order_client_name = e.name_order;
        order_client_mobile = e.mobile_order;
        order_client_email = e.email_order;
        order_client_address = e.address_order;
        order_client_pincode = e.pincode_order;

    })

    req.body.product_detail.filter(function(e) {

        order_product_name = e.product_name;
        order_product_price = e.product_price;
    })





    var nodemailer = require('nodemailer');


    let htmlText = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
 <head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>New email template 2020-10-13</title> 
  <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--> 
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
  <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--> 
  <style type="text/css">
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
.es-button-border:hover a.es-button {
	background:#7dbf44!important;
	border-color:#7dbf44!important;
}
.es-button-border:hover {
	background:#7dbf44!important;
	border-color:#7dbf44 #7dbf44 #7dbf44 #7dbf44!important;
}
td .es-button-border:hover a.es-button-1 {
	background:#7dbf44!important;
	border-color:#7dbf44!important;
}
td .es-button-border-2:hover {
	background:#7dbf44!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:14px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:22px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:22px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style> 
 </head> 
 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
   <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]--> 
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
     <tr style="border-collapse:collapse"> 
      <td valign="top" style="padding:0;Margin:0"> 
       <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center center" align="left"> 
               <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px;font-size:0"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;text-decoration:none;color:#659C35"><img src="https://raw.githubusercontent.com/murtaza555/imageCollection/main/theBoomStock.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" class="adapt-img" width="100%" height="65"></a></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]--> 
               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;width:270px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0"> 
                       <table class="es-menu" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr class="links" style="border-collapse:collapse"> 
                          <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;text-decoration:none;display:block;color:#659C35" href="https://viewstripo.email/">Products</a></td> 
                          <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;text-decoration:none;display:block;color:#659C35" href="https://viewstripo.email/">Services</a></td> 
                          <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;text-decoration:none;display:block;color:#659C35" href="tel:9131559979">9131559979</a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0;background-position:center top"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;position:relative"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;color:#659C35"><img class="adapt-img" src="https://raw.githubusercontent.com/murtaza555/imageCollection/main/test112.jpg" alt title width="600" height="300" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#659C35">Your order is ${order_status}</h2></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">The best compliment you can give is a referral.Thankyou for supporting this business.</p></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px"><span class="es-button-border" style="border-style:solid;border-color:#659C35;background:#659C35;border-width:0px;display:inline-block;border-radius:0px;width:auto"><a href="https://viewstripo.email/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#659C35;border-width:10px 20px;display:inline-block;background:#659C35;border-radius:0px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">View More Products</a></span></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
               <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:280px"> 
                   <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:1px solid transparent;border-top:1px solid transparent;border-bottom:1px solid transparent;background-color:#EFEFEF;background-position:center top" width="100%" cellspacing="0" cellpadding="0" bgcolor="#efefef" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#659C35">SUMMARY:</h4></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                       <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation"> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Order #:</td> 
                          <td style="padding:0;Margin:0"><strong><span style="font-size:14px;line-height:21px">${order_id}</span></strong></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Order Date:</td> 
                          <td style="padding:0;Margin:0"><strong><span style="font-size:14px;line-height:21px">${order_date_current}</span></strong></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Order Total:</td> 
                          <td style="padding:0;Margin:0"><strong><span style="font-size:14px;line-height:21px">₹${order_product_price}</span></strong></td> 
                         </tr> 
                       </table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]--> 
               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;width:280px"> 
                   <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:1px solid transparent;border-right:1px solid transparent;border-top:1px solid transparent;border-bottom:1px solid transparent;background-color:#EFEFEF;background-position:center top" width="100%" cellspacing="0" cellpadding="0" bgcolor="#efefef" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#659C35">SHIPPING ADDRESS:</h4></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">${order_client_name}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">${order_client_address}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">${order_client_pincode}</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-position:center top"> 
               <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:154px" valign="top"><![endif]--> 
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:154px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;font-size:0"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;color:#659C35"><img class="adapt-img" src="https://ocieid.stripocdn.email/content/guids/CABINET_dd455c10d72807d01fd51bb3bfe702d1/images/17351558530118413.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="154" height="202"></a></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td><td style="width:20px"></td><td style="width:386px" valign="top"><![endif]--> 
               <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;width:386px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-top:10px"><h3 style="Margin:0;line-height:23px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:19px;font-style:normal;font-weight:normal;color:#659C35"><strong>${order_product_name}</strong></h3></td> 
                     </tr> 
                  
                     <tr style="border-collapse:collapse"> 
                      <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-top:10px"><h3 style="Margin:0;line-height:23px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:19px;font-style:normal;font-weight:normal;color:#659C35"><strong><span style="color:#000000">Qty:</span>&nbsp;1</strong></h3></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-top:10px"><h3 style="Margin:0;line-height:23px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:19px;font-style:normal;font-weight:normal;color:#659C35"><strong><span style="color:#000000">Price:</span>&nbsp;₹${order_product_price}</strong></h3></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px;background-position:center top"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:1px solid #CCCCCC;border-bottom:1px solid #CCCCCC;background-position:center top" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-top:10px"> 
                       <table border="0" cellspacing="1" cellpadding="1" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" role="presentation"> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0"><h4 style="Margin:0;line-height:200%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333"><strong>Subtotal:</strong></h4></td> 
                          <td style="padding:0;Margin:0;color:#659C35"><strong>₹${order_product_price}</strong></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0"><h4 style="Margin:0;line-height:200%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333">Flat-rate Shipping:</h4></td> 
                          <td style="padding:0;Margin:0;color:#FF0000"><strong>Free</strong></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0"><h4 style="Margin:0;line-height:200%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333">Discount:</h4></td> 
                          <td style="padding:0;Margin:0;color:#FF0000"><strong>$0.00</strong></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0"><h4 style="Margin:0;line-height:200%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333">Order Total:</h4></td> 
                          <td style="padding:0;Margin:0;color:#659C35"><strong>₹${order_product_price}</strong></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px;background-position:left top"> 
               <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#659C35">Contact Us:</h4></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Customer service shouldn't just be a department, it should be the entire company.</p></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0"> 
                       <table class="es-table-not-adapt" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;padding-right:10px;font-size:0"><img src="https://ocieid.stripocdn.email/content/guids/CABINET_45fbd8c6c971a605c8e5debe242aebf1/images/30981556869899567.png" alt width="16" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="13"></td> 
                          <td align="left" style="padding:0;Margin:0"> 
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><a target="_blank" href="mailto:info.theboomstock@gmail.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;color:#333333">info.theboomstock@gmail.com</a></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;padding-right:10px;font-size:0"><img src="https://ocieid.stripocdn.email/content/guids/CABINET_45fbd8c6c971a605c8e5debe242aebf1/images/58031556869792224.png" alt width="16" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="16"></td> 
                          <td align="left" style="padding:0;Margin:0"> 
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><a target="_blank" href="tel:+919131559979" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;color:#333333">+919131559979</a></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;padding-right:10px;font-size:0"><img src="https://ocieid.stripocdn.email/content/guids/CABINET_45fbd8c6c971a605c8e5debe242aebf1/images/78111556870146007.png" alt width="16" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="16"></td> 
                          <td align="left" style="padding:0;Margin:0"> 
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Bilaspur (C.G)</p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-top:15px"><span class="es-button-border" style="border-style:solid;border-color:#659C35;background:#659C35;border-width:0px;display:inline-block;border-radius:0px;width:auto"><a href="https://viewstripo.email/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#659C35;border-width:10px 20px 10px 20px;display:inline-block;background:#659C35;border-radius:0px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">GET IT NOW</a></span></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]--> 
               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;width:270px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://ocieid.stripocdn.email/content/guids/CABINET_45fbd8c6c971a605c8e5debe242aebf1/images/52821556874243897.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="270" height="250"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#333333;width:600px" cellspacing="0" cellpadding="0" bgcolor="#333333" align="center"> 
             <tr style="border-collapse:collapse"> 
              <td style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center center;background-color:#659C35" bgcolor="#659C35" align="left"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0"> 
                       <table class="es-menu" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr class="links" style="border-collapse:collapse"> 
                          <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:0px;border:0" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;display:block;color:#FFFFFF" href="https://viewstripo.email">Menus</a></td> 
                          <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:0px;border:0;border-left:1px solid #FFFFFF" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;display:block;color:#FFFFFF" href="https://viewstripo.email">Delivery</a></td> 
                          <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:0px;border:0;border-left:1px solid #FFFFFF" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;display:block;color:#FFFFFF" href="https://viewstripo.email">Forum</a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr style="border-collapse:collapse"> 
              <td style="Margin:0;padding-bottom:15px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center center;background-color:#659C35" bgcolor="#659C35" align="left"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:15px;font-size:0"> 
                       <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Facebook" src="https://ocieid.stripocdn.email/content/assets/img/social-icons/circle-white/facebook-circle-white.png" alt="Fb" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Twitter" src="https://ocieid.stripocdn.email/content/assets/img/social-icons/circle-white/twitter-circle-white.png" alt="Tw" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          <td valign="top" align="center" style="padding:0;Margin:0"><img title="Youtube" src="https://ocieid.stripocdn.email/content/assets/img/social-icons/circle-white/youtube-circle-white.png" alt="Yt" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:13px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:20px;color:#FFFFFF">You are receiving this email because you have visited our site or asked us about a regular newsletter. Make sure our messages get to your inbox (and not your bulk or junk folders).</p></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px;font-size:0"><img src="https://ocieid.stripocdn.email/content/guids/CABINET_c6d6983b8f90c1ab10065255fbabfbaf/images/15841556884046468.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="140" height="17"></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:13px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:20px;color:#FFFFFF"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:13px;text-decoration:none;color:#FFFFFF" href="https://viewstripo.email/">Privacy</a> | <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:13px;text-decoration:none;color:#FFFFFF" class="unsubscribe" href="">Unsubscribe</a></p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="transparent" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px;background-position:left top"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                     <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=food2&utm_content=order_newsletter" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;text-decoration:none;color:#CCCCCC"><img src="https://raw.githubusercontent.com/murtaza555/imageCollection/main/developedBy.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="80"></a></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table></td> 
     </tr> 
   </table> 
  </div>  
 </body>
</html>`






    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mrtzbadshah@gmail.com',
            pass: 'flvmlwcliircaaro'
        }
    });

    var mailOptions = {
        from: 'mrtzbadshah@gmail.com',
        to: `${order_client_email}`,
        subject: `${order_status}: ${order_product_name}`,
        html: htmlText
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');

            res.send({
                status: 'ok',

            });



        }
    });





})