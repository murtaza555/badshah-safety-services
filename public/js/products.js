window.onload = function() {

    let product_info = [];
    let check_search = 0;
    let categoryCountNumber = [];
    let next_product_count = 14;
    var final_category_name = null;
    let product_name_to_link = null;





    if (window.location.hash) {
        hash_category_name = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        final_category_name = hash_category_name.replace("%20", " ");

        document.getElementById("title_products").textContent = `${final_category_name} | Badshah Safety Services`;
        document.getElementById("h1_product_category").textContent = final_category_name;


        ajax({
                url: '/get_product_info_category',
                method: 'post',
                contentType: 'application/json',
                data: {
                    category_name: final_category_name
                }


            })
            .then(res => {
                if (res.status === 'ok') {

                    product_info = res.product_info;
                    all_products = product_info;
                    // get_product_info(res.product_info);                             

                    showProducts();
                }

                if (res.status === 'no') {

                    console.log("no product found ");


                }
            })
            .catch(err => {
                console.log(err);
            });



        // hash found
    }

    let showProducts = function() {
        document.getElementById("regula1r_mainDiv2").innerHTML = '';

        let n = 0;
        all_categories = product_info;
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
            img1.setAttribute("id", `regular_${all_products1[next_product_count1].uuid_no}`);
            // img1.setAttribute("id", `regular_${all_products1[next_product_count1].product_name}`);



            img1.setAttribute("src", `/img/${all_products1[next_product_count1].product_image}`);
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

            let short_name = all_products1[next_product_count1].product_name;
            if (short_name.length > 30) {
                short_name = short_name.substring(0, 22);
                short_name = short_name + "..."
            }
            h2.textContent = short_name;
            div4.append(h2);

            product_name_to_link = all_products1[next_product_count1].product_name;



            // categoryCountNumber.filter(function(e) {

            //     if (e.category === all_products1[next_product_count1].category_name) {

            //         let p1 = document.createElement('p');
            //         p1.setAttribute("class", "product-price");
            //         p1.textContent = `${e.count}  Products`;
            //         div4.append(p1);
            //     }

            // })






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



    window.addEventListener('click', function(e) {


        if (e.target.id.includes("regular")) {

            var url1 = window.location.href
            var arr = url1.split("/");
            var resultURL = arr[0] + "//" + arr[2]
            console.log(resultURL);

            let link_product = resultURL + "/product/#" + final_category_name + "/" + product_name_to_link + "/#" + e.target.id.substring(8, );
            // let link_product = resultURL + "/product";

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





    // end
}