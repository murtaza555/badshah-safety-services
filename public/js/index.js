window.onload = function() {
    let all_categories = [];
    let all_products = [];
    let recent_products = [];
    let actual_product_count = 0;
    let next_product_count = 14;
    let check_count_15 = 0;
    let check_count_next = 0;
    let check_count_last = 0;
    let m = 0;
    let array_data_item = [];
    let dataTags = null;
    let dataTagsArray = [];
    let showProductAtSearchArray = [];
    let check_search = 0;
    let products_array = [];
    let product_name_to_link = null;
    let categoryCountNumber = [];




    // scroll animation    
    // const sr = ScrollReveal({
    //     origin: 'top',
    //     distance: '30px',
    //     duration: 2000,
    //     reset: true
    // });

    // sr.reveal(`.product`, {
    //     interval: 200
    // })


    // document.getElementById("facebook_id").addEventListener('click', function(e) {

    //     //location.replace("https://www.facebook.com/Badshah-Safety-Services-107376454189864/?modal=admin_todo_tour")

    //     window.open('https://www.facebook.com/Badshah-Safety-Services-107376454189864/?modal=admin_todo_tour', '_blank');


    // })


    // document.getElementById("instagram_id").addEventListener('click', function(e) {

    //     window.open('https://www.instagram.com/theboom_stock/', '_blank')

    // })

    // document.getElementById("whatsapp_id").addEventListener('click', function(e) {

    //     window.open('https://wa.me/919131559979?text=I%27m%20interested%20in%20The%20Boom%20Stock', '_blank');
    // })

    let getBanners = function() {


        ajax({
                url: '/getBanners',
                method: 'post',
                contentType: 'application/json',
                data: {
                    say: "show banner"
                }
            })
            .then(res => {
                if (res.status === 'ok') {

                    res.banner_img.filter(function(e) {

                        let bannerImg = document.createElement('input');
                        bannerImg.setAttribute("type", "image");
                        bannerImg.setAttribute("class", "myslides");
                        //  img11.style.marginRight = "auto";
                        //  img11.style.marginLeft = "auto";
                        // img1.style.paddingRight = "auto";
                        // img1.style.paddingLeft = "auto";
                        bannerImg.style.outline = "none";

                        bannerImg.setAttribute("src", `/banner_img/${e.banner_name}`);
                        bannerImg.setAttribute("id", "myslides");


                        document.getElementById("banner").append(bannerImg);


                    })
                    slides();

                }


                if (res.status === 'no') {

                    console.log("No banner found");


                }
            })
            .catch(err => {
                console.log(err);
            });


    }

    getBanners();

    let myindex = 0;
    let slides = function() {


        let i;
        let x = document.getElementsByClassName("myslides");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myindex++;
        if (myindex > x.length) { myindex = 1 }

        // let y = window.matchMedia("(max-width: 768px)")
        // if (y.matches) { // If media query matches
        //     x[myindex - 1].style.display = "none";

        // } else {
        x[myindex - 1].style.display = "block";
        setTimeout(slides, 4000); // Change image every 2 seconds
        //}
        //y.addListener(slides) // Attach listener function on state changes
    }







    let getProducts = function() {

        ajax({
                url: '/getProducts',
                method: 'post',
                contentType: 'application/json',
                data: {
                    say: "show products"
                }
            })
            .then(res => {
                if (res.status === 'ok') {

                    all_categories = res.getAllCategories;
                    all_products = res.get_Products;
                    recent_products = res.get_Recent;
                    categoryCountNumber = res.categoryCountNumber;
                    showProducts();
                    recentProducts();


                    all_products.filter(function(a) {
                        dataTags = JSON.parse(a.products_tags);
                        dataTagsArray.push({
                            dataTags: dataTags,
                            uuid_no: a.uuid_no,
                            product_name: a.product_name
                        });
                    })



                }


                if (res.status === 'no') {

                    console.log("No item data got");


                }
            })
            .catch(err => {
                console.log(err);
            });

    }



    getProducts();



    let showProducts = function() {
        document.getElementById("regula1r_mainDiv2").innerHTML = '';

        let n = 0;
        all_products1 = all_categories;



        if (all_products.length > 15) {
            next_product_count1 = next_product_count;


            if (check_count_15 === 1) {
                all_products1 = products_array;

                next_product_count1 = all_products1.length;
                next_product_count1 = next_product_count1 - 1;

            }
            if (check_count_15 === 2) {
                all_products1 = products_array;
                next_product_count1 = all_products1.length;
                next_product_count1 = next_product_count1 - 1;

            }

            if (check_search === 1) {
                all_products1 = products_array;
                next_product_count1 = all_products1.length;
                next_product_count1 = next_product_count1 - 1;
            }
        } else {

            if (check_search === 1) {
                all_products1 = products_array;
                next_product_count1 = all_products1.length;
                next_product_count1 = next_product_count1 - 1;
            } else {
                next_product_count1 = all_products1.length;
                next_product_count1 = next_product_count1 - 1;
            }
        }


        for (next_product_count1; next_product_count1 >= 0; next_product_count1--) {

            // all_products.filter(function(e) {

            // let div01 = document.createElement('div');
            // div01.setAttribute("class", "container px-5 py-24 mx-auto");
            // div01.setAttribute("style", "padding-top: 0%;padding-bottom: 0%;");



            // let div0 = document.createElement('div');
            // div0.setAttribute("class", "product-items");


            let div1 = document.createElement('div');
            div1.setAttribute("class", "product");
            //div1.style.width = "20%";


            let div2 = document.createElement('div');
            div2.setAttribute("class", "product-content");

            let div3 = document.createElement('div');
            div3.setAttribute("class", "product-img");

            let a1 = document.createElement('a');


            let img1 = document.createElement('img');
            img1.setAttribute("alt", "product image");
            // img1.setAttribute("id", `regular_${all_products1[next_product_count1].uuid_no}`);
            img1.setAttribute("id", `regular_${all_products1[next_product_count1].category_name}`);



            img1.setAttribute("src", `/img/${all_products1[next_product_count1].category_image}`);
            div3.append(img1);

            //let img1 = document.createElement('img');
            // let img1 = document.createElement('input');
            // img1.setAttribute("type", "image");
            // img1.setAttribute("alt", "ecommerce");
            // img1.setAttribute("id", `regular_${all_products1[next_product_count1].uuid_no}`);
            // img1.setAttribute("class", "img1");

            // img1.style.marginRight = "auto";
            // img1.style.marginLeft = "auto";
            // // img1.style.paddingRight = "auto";
            // // img1.style.paddingLeft = "auto";
            // img1.style.outline = "none";

            // img1.setAttribute("src", `/img/${all_products1[next_product_count1].product_image}`);
            // a1.append(img1)


            let div4 = document.createElement('div');
            div4.setAttribute("class", "product-info");

            // let div5 = document.createElement('div');
            // div5.setAttribute("class", "product-info-top");














            // let div2 = document.createElement('div');
            // div2.setAttribute("class", "mt-4");

            // let h3 = document.createElement('h3');
            // h3.setAttribute("class", "text-gray-500 text-xs tracking-widest title-font mb-1");
            // h3.textContent = all_products1[next_product_count1].category;
            // div2.append(h3);

            let h2 = document.createElement('h2');
            h2.setAttribute("class", "product-name");
            h2.textContent = all_products1[next_product_count1].category_name;
            div4.append(h2);

            product_name_to_link = all_products1[next_product_count1].category_name;



            categoryCountNumber.filter(function(e) {

                if (e.category === all_products1[next_product_count1].category_name) {

                    let p1 = document.createElement('p');
                    p1.setAttribute("class", "product-price");
                    p1.textContent = `${e.count}  Products`;
                    div4.append(p1);
                }

            })






            div2.append(div3);
            a1.append(div2);
            a1.append(div4);
            div1.append(a1);
            // div0.append(div1);
            // div01.append(div0);
            document.getElementById("regula1r_mainDiv2").append(div1)


            // .........................original add product code........................


            // let div1 = document.createElement('div');
            //             div1.setAttribute("class", "lg:w-1/4 md:w-1/2 p-4 w-full");
            //             //div1.style.width = "20%";

            //             let a1 = document.createElement('a');
            //             a1.setAttribute("class", "block  h-48 rounded overflow-hidden");


            //             //let img1 = document.createElement('img');
            //             let img1 = document.createElement('input');
            //             img1.setAttribute("type", "image");
            //             img1.setAttribute("alt", "ecommerce");
            //             img1.setAttribute("id", `regular_${all_products1[next_product_count1].uuid_no}`);
            //             img1.setAttribute("class", "object-cover object-center  h-full block");

            //             img1.style.marginRight = "auto";
            //             img1.style.marginLeft = "auto";
            //             // img1.style.paddingRight = "auto";
            //             // img1.style.paddingLeft = "auto";
            //             img1.style.outline = "none";

            //             img1.setAttribute("src", `/img/${all_products1[next_product_count1].product_image}`);
            //             a1.append(img1)


            //             let div2 = document.createElement('div');
            //             div2.setAttribute("class", "mt-4");

            //             let h3 = document.createElement('h3');
            //             h3.setAttribute("class", "text-gray-500 text-xs tracking-widest title-font mb-1");
            //             h3.textContent = all_products1[next_product_count1].category;
            //             div2.append(h3);

            //             let h2 = document.createElement('h2');
            //             h2.setAttribute("class", "text-gray-900 title-font text-lg font-medium");
            //             h2.textContent = all_products1[next_product_count1].product_name;
            //             div2.append(h2);

            //             let p1 = document.createElement('p');
            //             p1.setAttribute("class", "mt-1");
            //             p1.style.fontWeight = "bold"
            //             p1.textContent = `₹${all_products1[next_product_count1].product_price}`;
            //             div2.append(p1);



            //             div1.append(a1);
            //             div1.append(div2);



            //             document.getElementById("regula1r_mainDiv2").append(div1)

            //  })
        }


    }

    let recentProducts = function() {

        if (recent_products.length >= 15) {
            m = 15;
            m = m - 1;
        } else {
            m = recent_products.length;
            m = m - 1;
        }




        for (m; m >= 0; m--) {

            // let div11 = document.createElement('div');
            // div11.setAttribute("class", "lg:w-1/3 sm:w-1/2 p-4");

            // let div12 = document.createElement('div');
            // div12.setAttribute("class", "flex relative");




            // let img11 = document.createElement('img');
            // img11.setAttribute("alt", "gallery");
            // img11.setAttribute("class", "absolute inset-0  h-full object-cover object-center");
            // img11.setAttribute("id", `recent_${recent_products[m].uuid_no}`);

            // img11.setAttribute("src", `/img/${recent_products[m].product_image}`);
            // //  img11.style.objectFit = "none"
            // img11.style.marginLeft = "auto";
            // img11.style.marginRight = "auto";


            // let div13 = document.createElement('div');
            // div13.setAttribute("class", "px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100");


            // let h1 = document.createElement('h1');
            // h1.setAttribute("class", "title-font text-lg font-medium text-gray-900 mb-3");
            // h1.textContent = recent_products[m].product_name;
            // div13.append(h1);

            // let des_short = null;
            // if (recent_products[m].product_description.length > 160) {
            //     des_short = recent_products[m].product_description.substring(0, 160);
            // } else {
            //     des_short = recent_products[m].product_description;
            // }

            // let p11 = document.createElement('p');
            // p11.setAttribute("class", "leading-relaxed");
            // p11.style.fontWeight = "bold"
            // p11.textContent = des_short;
            // div13.append(p11);



            // div12.append(img11);
            // div12.append(div13);
            // div11.append(div12);



            // document.getElementById("recent_mainDiv2").append(div11)

            let div11 = document.createElement('div');
            div11.setAttribute("class", "lg:w-1/4 md:w-1/2 p-4 w-full");

            let a11 = document.createElement('a');
            a11.setAttribute("class", "block  h-48 rounded overflow-hidden");


            //let img1 = document.createElement('img');
            let img11 = document.createElement('input');
            img11.setAttribute("type", "image");
            img11.setAttribute("alt", "ecommerce");
            img11.setAttribute("id", `regular_${recent_products[m].uuid_no}`);
            img11.setAttribute("class", "object-cover object-center  h-full block");

            img11.style.marginRight = "auto";
            img11.style.marginLeft = "auto";
            // img1.style.paddingRight = "auto";
            // img1.style.paddingLeft = "auto";
            img11.style.outline = "none";

            img11.setAttribute("src", `/img/${recent_products[m].product_image}`);
            a11.append(img11)


            let div22 = document.createElement('div');
            div22.setAttribute("class", "mt-4");

            let h33 = document.createElement('h3');
            h33.setAttribute("class", "text-gray-500 text-xs tracking-widest title-font mb-1");
            h33.textContent = recent_products[m].category;
            div22.append(h33);

            let h22 = document.createElement('h2');
            h22.setAttribute("class", "text-gray-900 title-font text-lg font-medium");
            h22.textContent = recent_products[m].product_name;
            div22.append(h22);

            let p11 = document.createElement('p');
            p11.setAttribute("class", "mt-1");
            p11.style.fontWeight = "bold"
            p11.textContent = `₹${recent_products[m].product_price}`;
            div22.append(p11);



            div11.append(a11);
            div11.append(div22);

            document.getElementById("recen1t_mainDiv2").append(div11)


        }

    }

    // document.getElementById("click_uuid").addEventListener('click', function(e) {

    //     ajax({
    //             url: '/getUuid',
    //             method: 'post',
    //             contentType: 'application/json',
    //             data: {
    //                 say: "get uuid"
    //             }
    //         })
    //         .then(res => {
    //             if (res.status === 'ok') {
    //                 document.getElementById("display_uuid").innerHTML = "";
    //                 document.getElementById("display_uuid").textContent = res.get_uuid;

    //             }


    //             if (res.status === 'no') {

    //                 console.log("No item data got");


    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });



    // })



    window.addEventListener('click', function(e) {


        if (e.target.id.includes("regular")) {

            var url1 = window.location.href
            var arr = url1.split("/");
            var resultURL = arr[0] + "//" + arr[2]

            let link_product = resultURL + "/products/#" + e.target.id.substring(8, );

            location.href = link_product;






            // if(e.target.id.includes("regular") || e.target.id.includes("recent")){

            //     let link_product = window.location.href +"product/#" + e.target.id.substring(8,) ;

            //     location.href =  link_product ;










            // all_products.filter(function (f){


            //     if(e.target.id.substring(8,) === f.uuid_no){

            //         console.log(f.uuid_no);

            //         console.log(f.product_name);

            // document.getElementById("product_details").style.display = "block";

            // document.getElementById("product_name_box").textContent = f.product_name;


            // document.getElementById("product_img_box").setAttribute("src", `/img/${f.product_image}`);

            // document.getElementById("product_description_box").textContent = f.product_description;

            // document.getElementById("product_price_box").textContent = `₹${f.product_price}`;
            // document.getElementById("select_size").innerHTML='';


            // size_array.filter(function(g){
            //     let option_size = document.createElement('option')
            //     option_size.setAttribute("value",g.size ); 
            //     var nod = document.createTextNode(g.size); 
            //     option_size.appendChild(nod); 

            //     document.getElementById("select_size").append(option_size);
            // })















            //     }
            // })

        }
    })

    //------- window click end --------------


    document.getElementById('btn_next').addEventListener('click', function() {


        if (all_products.length > 15 && check_count_last === 0) {


            actual_product_count = actual_product_count + 15;


            if (all_products.length - actual_product_count > 15) {
                next_product_count = next_product_count + 15;
                check_count_next = 1;
                products_array = indexRange(all_products, actual_product_count, next_product_count);


            } else {
                //        let count_limit_next =  all_products.length - actual_product_count;
                // next_product_count = next_product_count  + count_limit_next ;
                products_array = indexRange(all_products, actual_product_count, "1");
                check_count_last = 1;

            }

            // products_array = indexRange(all_products, actual_product_count, next_product_count);

            check_count_15 = 1;
            showProducts();
        }


    })


    // document.getElementById("container_bar").addEventListener('click',function(e){


    //     if(document.getElementById("sidenav_bar").style.display !== "block"){
    //         document.getElementById("sidenav_bar").style.display  = "block"
    //     }else{
    //         document.getElementById("sidenav_bar").style.display  = "none"

    //     }
    //     e.target.classList.toggle("change");

    // })
    const menuBtn = document.querySelector('.menu-btn');
    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            menuOpen = true;
            document.getElementById("sidenav_bar").style.display = "block"

        } else {
            menuBtn.classList.remove('open');
            menuOpen = false;
            document.getElementById("sidenav_bar").style.display = "none"

        }
    });


    document.getElementById('btn_previous').addEventListener('click', function() {


        //     if(all_products.length > 15 && actual_product_count >= 0){

        //      actual_product_count = actual_product_count - 15;
        // next_product_count = next_product_count  - 15 ;

        //       products_array = indexRange(all_products, actual_product_count, next_product_count);
        // check_count_15 = 1;
        //       showProducts();
        //     }

        if (actual_product_count !== 0) {


            actual_product_count = actual_product_count - 15;
            check_count_last = 0;


            if (check_count_next === 1) {
                next_product_count = next_product_count - 15;


            }
            //next_product_count = next_product_count  + 1 ;
            next_product_count = next_product_count + 1;


            products_array = indexRange(all_products, actual_product_count, next_product_count);
            next_product_count = next_product_count - 1;




            //        let count_limit_next =  all_products.length - actual_product_count;
            // next_product_count = next_product_count  + count_limit_next ;
            // products_array = indexRange(all_products, actual_product_count, "1");



            // products_array = indexRange(all_products, actual_product_count, next_product_count);

            check_count_15 = 2;
            showProducts();
        }


    })

    let indexRange = (arr, start, end) => {


        if (end !== "1") {
            return arr.slice(start, end)
        } else {
            return arr.slice(start, )

        }
    }



    document.getElementById("search_bar").addEventListener('input', function(e) {
        showProductAtSearchArray = [];

        // autocomplete(document.getElementById("input_search"), array_data_item);

        // console.log(e.target.value)

        //    if(dataTagsArray.includes(e.target.value)){

        //     console.log("lavda hai")
        //    }
        var find_search = e.target.value;

        if (find_search.length >= 2) {

            for (l = 0; l < dataTagsArray.length; l++) {


                dataTagsArray[l].dataTags.filter(function(f) {

                    if (f.tags.toUpperCase().includes(find_search.toUpperCase())) {



                        //console.log(dataTagsArray[l].product_name + "  " +dataTagsArray[l].uuid_no + "  " + f.tags)

                        showProductAtSearchArray.push({
                            product_name: dataTagsArray[l].product_name,
                            uuid_no: dataTagsArray[l].uuid_no,

                        })



                    }

                })


                //console.log(dataTagsArray[l].dataTags);
            }
            //console.log(showProductAtSearchArray)

            // var chars = showProductAtSearchArray;

            // var uniqueChars = [];
            // chars.filter( function (c) {
            //     if (!uniqueChars.includes(c.uuid_no)) {
            //         //uniqueChars.push(c);
            //         console.log(c);
            //     }
            // });


            // var arr_search  = showProductAtSearchArray;
            // function removeDuplicate(data){
            //     return data.filter((value,index) => data.indexOf(value) === index)
            // }

            // console.log(removeDuplicate(arr_search));

            // var arr_search = showProductAtSearchArray;
            // var temp_arr_search = [];

            // arr_search.filter(function(e){


            //     temp_arr_search.filter(function(f){
            //         if(f.uuid_no !== e.uuid_no){
            //             temp_arr_search.push({
            //                 product_name : e.product_name,
            //                 uuid_no: e.uuid_no
            //             })
            //         }
            //     })


            // })



            // Create an array of objects 
            var arr_search = showProductAtSearchArray;

            // Display the list of array objects 

            // Declare a new array 
            var temp_arr_search = [];

            // Declare an empty object 
            var uniqueObject = {};

            // Loop for the array elements 
            for (var i in arr_search) {

                // Extract the title 
                objTitle = arr_search[i]['uuid_no'];

                // Use the title as the index 
                uniqueObject[objTitle] = arr_search[i];
            }

            // Loop to push unique object into array 
            for (i in uniqueObject) {
                temp_arr_search.push(uniqueObject[i]);
            }

            // Display the unique objects 




            autocomplete(document.getElementById("search_bar"), temp_arr_search);


        }

        // dataTagsArray.filter(function(f){

        // f.filter(function(g){

        //     if(g.tags.includes(find_search)){

        //         console.log(g.tags + "  "+ g.uuid_no)
        //        }



        // })


        // })


    })


    document.getElementById("btn_search").addEventListener('click', function(e) {
        showProductAtSearchArray = [];

        // autocomplete(document.getElementById("input_search"), array_data_item);

        // console.log(e.target.value)

        //    if(dataTagsArray.includes(e.target.value)){

        //     console.log("lavda hai")
        //    }
        var find_search = document.getElementById("input_search").value;


        if (find_search.length >= 2) {

            for (l = 0; l < dataTagsArray.length; l++) {


                dataTagsArray[l].dataTags.filter(function(f) {

                    if (f.tags.toUpperCase().includes(find_search.toUpperCase())) {



                        //console.log(dataTagsArray[l].product_name + "  " +dataTagsArray[l].uuid_no + "  " + f.tags)

                        showProductAtSearchArray.push({
                            product_name: dataTagsArray[l].product_name,
                            uuid_no: dataTagsArray[l].uuid_no,

                        })



                    }

                })


                //console.log(dataTagsArray[l].dataTags);
            }

            products_array = []


            all_products.filter(function(a) {

                showProductAtSearchArray.filter(function(b) {

                    if (a.uuid_no === b.uuid_no) {

                        products_array.push({
                            product_name: a.product_name,
                            product_image: a.product_image,
                            product_price: a.product_price,
                            category: a.category,
                            uuid_no: a.uuid_no,



                        })
                    }
                })




            })


            check_search = 1;
            showProducts();
            //console.log(showProductAtSearchArray)

            // var chars = showProductAtSearchArray;

            // var uniqueChars = [];
            // chars.filter( function (c) {
            //     if (!uniqueChars.includes(c.uuid_no)) {
            //         //uniqueChars.push(c);
            //         console.log(c);
            //     }
            // });


            // var arr_search  = showProductAtSearchArray;
            // function removeDuplicate(data){
            //     return data.filter((value,index) => data.indexOf(value) === index)
            // }

            // console.log(removeDuplicate(arr_search));

            // var arr_search = showProductAtSearchArray;
            // var temp_arr_search = [];

            // arr_search.filter(function(e){


            //     temp_arr_search.filter(function(f){
            //         if(f.uuid_no !== e.uuid_no){
            //             temp_arr_search.push({
            //                 product_name : e.product_name,
            //                 uuid_no: e.uuid_no
            //             })
            //         }
            //     })


            // })



            //     // Create an array of objects 
            //     var arr_search = showProductAtSearchArray;

            //     // Display the list of array objects 

            //     // Declare a new array 
            //     var temp_arr_search = []; 

            //     // Declare an empty object 
            //     var uniqueObject = {}; 

            //     // Loop for the array elements 
            //     for (var i in arr_search) { 

            //         // Extract the title 
            //         objTitle = arr_search[i]['uuid_no']; 

            //         // Use the title as the index 
            //         uniqueObject[objTitle] = arr_search[i]; 
            //     } 

            //     // Loop to push unique object into array 
            //     for (i in uniqueObject) { 
            //         temp_arr_search.push(uniqueObject[i]); 
            //     } 

            //     // Display the unique objects 




            // autocomplete(document.getElementById("input_search"), temp_arr_search);


        }

        // dataTagsArray.filter(function(f){

        // f.filter(function(g){

        //     if(g.tags.includes(find_search)){

        //         console.log(g.tags + "  "+ g.uuid_no)
        //        }



        // })


        // })


    })


    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/


        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/

            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/

                // if (arr[i].toUpperCase().includes(val.toUpperCase())) {

                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].product_name.substr(0, val.length);

                b.innerHTML += arr[i].product_name.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].product_name + "' id='" + arr[i].uuid_no + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    inp.id = this.getElementsByTagName("input")[0].id;


                    display_product_regular(inp.id);

                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();

                    //  if (inp.id.includes("item")) {

                    // }


                });
                a.appendChild(b);
                // }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function(e) {
            closeAllLists(e.target);
        });
    }


    let display_product_regular = function(uuid_no_hai) {

        // all_products.filter(function(e) {
        //     if (e.uuid_no === uuid_no_hai) {

        //         products_array.push({})


        //     }
        // })

        let s = all_products.length;
        s = s - 1;
        products_array = []

        for (j = 0; j < s; j++) {

            if (all_products[j].uuid_no === uuid_no_hai) {


                products_array.push({
                    product_name: all_products[j].product_name,
                    product_image: all_products[j].product_image,
                    product_price: all_products[j].product_price,
                    category: all_products[j].category,
                    uuid_no: all_products[j].uuid_no,


                })
                console.log("1")

            }

        }

        // for(kl =0 ; kl < s; kl++){



        //         products_array.push({
        //                 product_name : all_products[kl].product_name,
        //                 product_image : all_products[kl].product_image,
        //                 product_price : all_products[kl].product_price,
        //                 category : all_products[kl].category,
        //                 uuid_no : all_products[kl].uuid_no,



        //         }) 

        //         console.log("2")


        // }

        // array_id.filter(function(e) {

        //     if (e.id_item === id_hai) {
        //         //document.getElementById(e.id_qty).value = qty_value_sugesstion;
        //         document.getElementById(e.id_rate).value = rate_value_sugesstion;

        //     }
        // })
        console.log("3")
        check_search = 1;
        showProducts();





    }

    var btn_contact_a = $('#contact_a');

    btn_contact_a.on('click', function(e) {
        e.preventDefault();
        // $('html, body').animate({ scrollTop: 1600 }, '600');
        // $("html, body").animate({ scrollTop: $("#row_contact_us")[0].scrollHeight }, 1000);
        $("html, body").animate({ scrollTop: $('#row_contact_us').offset().top }, 1000);


    });

    var btn_contact_a1 = $('#contact_a1');

    btn_contact_a1.on('click', function(e) {
        e.preventDefault();
        // $('html, body').animate({ scrollTop: 430 }, '600');
        $("html, body").animate({ scrollTop: $('#row_contact_us').offset().top }, 1000);


    });
    document.getElementById("contact_a1").addEventListener('click', function() {

        document.getElementById('sidenav_bar').style.display = "none"
        menuBtn.classList.remove('open');

    })





    var btn_products_a = $('#products_a');

    btn_products_a.on('click', function(e) {
        e.preventDefault();
        // $('html, body').animate({ scrollTop: 650 }, '600');
        $("html, body").animate({ scrollTop: $('#regula1r_mainSection').offset().top }, 1000);

    });

    var btn_products_a1 = $('#products_a1');

    btn_products_a1.on('click', function(e) {
        e.preventDefault();
        // $('html, body').animate({ scrollTop: 430 }, '600');
        $("html, body").animate({ scrollTop: $('#regula1r_mainSection').offset().top }, 1000);

    });
    document.getElementById("products_a1").addEventListener('click', function() {

        document.getElementById('sidenav_bar').style.display = "none"
        menuBtn.classList.remove('open');

    })


    document.getElementById("services_a").addEventListener('click', function() {

        document.getElementById('services_section').scrollIntoView();

    })




    // index page product right slides according to category

    // var  myIndex1= 0;
    // carousel();

    // function carousel() {
    //   var i1;
    //   var x1 = document.getElementsByClassName("mySlides_products");
    //   for (i1 = 0; i1 < x1.length; i1++) {
    //     x1[i1].style.display = "none";  
    //   }
    //   myIndex1++;
    //   if (myIndex1 > x1.length) {myIndex1 = 1}    
    //   x1[myIndex1-1].style.display = "block";  
    //   setTimeout(carousel, 1500);    
    // }

    var btn = $('#button_top');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });










    // end
}