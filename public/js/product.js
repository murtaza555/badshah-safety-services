window.onload = function() {
    var hash_uuid = null;

    let name_order = null;
    let mobile_order = null;
    let email_order = null;
    let address_order = null;
    let pincode_order = null;
    let product_info_1 = [];
    let final_uuid = null;
    let check_size_option = 0;
    let final_product_info_1 = [];
    let clientInformation = [];


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;


    document.getElementById('close_form').addEventListener('click', function(e) {

        // document.getElementById("product_details").style.display = "none"

        document.location.href = "/";


    });


    if (window.location.hash) {
        hash_uuid = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        final_uuid = hash_uuid;

        final_uuid = final_uuid.slice(final_uuid.length - 36)
        hash_uuid = final_uuid

        ajax({
                url: '/get_product_info',
                method: 'post',
                contentType: 'application/json',
                data: {
                    uuid: hash_uuid
                }


            })
            .then(res => {
                if (res.status === 'ok') {

                    product_info_1 = res.product_info;
                    get_product_info(res.product_info);

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

    // let link_product = window.location.href;

    // let link_product_uuid =  link_product.substring(,)



    let get_product_info = function(product_info) {


        document.getElementById("select_size").innerHTML = '';

        product_info.filter(function(f) {

            document.getElementById("title_product").textContent = `${f.product_name} in Bilaspur, Chhattisgarh | Badshah Safety Services`;
            document.querySelector('meta[name="description"]').content = f.product_description;
            


            document.getElementById("product_name_box").textContent = f.product_name;


            document.getElementById("product_img_box").setAttribute("src", `/img/${f.product_image}`);

            document.getElementById("description_div_paragraph").textContent = f.product_description;

            document.getElementById("product_price_box").textContent = `₹${f.product_price}`;


            var dataSize = JSON.parse(f.product_size);
            let size_array = dataSize;

            size_array.filter(function(g) {
                let option_size = document.createElement('option')
                option_size.setAttribute("value", g.size);
                var nod = document.createTextNode(g.size);
                option_size.appendChild(nod);

                document.getElementById("select_size").append(option_size);
            })

            if (f.product_size.length <= 2) {
                document.getElementById("size_div1").style.display = "none"
                check_size_option = 1;
            }


            var dataSpecification = JSON.parse(f.specification);

            dataSpecification.filter(function(g) {
                let spec_name = document.createElement('DIV');
                spec_name.setAttribute("class", "spec_name");
                // spec_name.setAttribute("textContent", g.specification_name);
                spec_name.textContent = g.specification_name
                document.getElementById("product_description_box1").append(spec_name);



                let spec_value = document.createElement('DIV')
                spec_value.setAttribute("class", "spec_value");
                spec_value.textContent = g.specification_value

                document.getElementById("product_description_box2").append(spec_value);
            })



        })

    }

    document.getElementById("btn_buy").addEventListener('click', function() {

        document.getElementById("product_details").style.filter = "blur(8px)";


        document.getElementById("container_order_item").style.display = "block"



    })


    document.getElementById("close_form1").addEventListener('click', function() {

        document.getElementById("buyer_name_input").value = '';
        document.getElementById("buyer_mobile_input").value = '';
        document.getElementById("buyer_email_input").value = '';
        document.getElementById("buyer_address_input").value = '';
        document.getElementById("buyer_pincode_input").value = '';

        document.getElementById("buyer_name_input").placeholder = '';
        document.getElementById("buyer_mobile_input").placeholder = '';
        document.getElementById("buyer_email_input").placeholder = '';
        document.getElementById("buyer_address_input").placeholder = '';
        document.getElementById("buyer_pincode_input").placeholder = '';;


        document.getElementById("container_order_item").style.display = "none";
        document.getElementById("product_details").style.filter = "none";

        clientInformation = []


        // array_size = [];
        // array_tags = [];
        // size_id_count = 0;
        // tags_id_count = 0;





    })

    document.getElementById("close_form2").addEventListener('click', function() {

        document.getElementById("buyer_name_input").value = '';
        document.getElementById("buyer_mobile_input").value = '';
        document.getElementById("buyer_email_input").value = '';
        document.getElementById("buyer_address_input").value = '';
        document.getElementById("buyer_pincode_input").value = '';

        document.getElementById("buyer_name_input").placeholder = '';
        document.getElementById("buyer_mobile_input").placeholder = '';
        document.getElementById("buyer_email_input").placeholder = '';
        document.getElementById("buyer_address_input").placeholder = '';
        document.getElementById("buyer_pincode_input").placeholder = '';


        document.getElementById("container_orderConfirm_item").style.display = "none";
        document.getElementById("container_order_item").style.display = "none";

        document.getElementById("product_details").style.filter = "none";

        clientInformation = []

        // array_size = [];
        // array_tags = [];
        // size_id_count = 0;
        // tags_id_count = 0;





    })





    document.getElementById("submitBuyButton").addEventListener('click', function() {



        // if (document.getElementById("buyer_email_input").value === '') { 
        //     document.getElementById("buyer_email_input").setCustomValidity('Entering an email-id is necessary!'); 
        // } else if (document.getElementById("buyer_email_input").validity.typeMismatch) { 
        //     document.getElementById("buyer_email_input").setCustomValidity('Please enter an email address which is valid!'); 
        // } else { 
        //     document.getElementById("buyer_email_input").setCustomValidity(''); 
        // }


        // document.getElementById("container_orderConfirm_item").style.display = "block"


        if (document.getElementById("buyer_name_input").value === '') {


            document.getElementById("buyer_name_input").style.border = "2px solid red";
            document.getElementById("buyer_name_input").placeholder = "Please Enter Full Name";

        } else if (document.getElementById("buyer_mobile_input").value === '') {


            document.getElementById("buyer_mobile_input").style.border = "2px solid red";
            document.getElementById("buyer_mobile_input").placeholder = "Please Enter Mobile Number";

        } else if (document.getElementById("buyer_email_input").value === '') {


            document.getElementById("buyer_email_input").style.border = "2px solid red";
            document.getElementById("buyer_email_input").placeholder = "Please Enter Email";

        } else if (document.getElementById("buyer_address_input").value === '') {


            document.getElementById("buyer_address_input").style.border = "2px solid red";
            document.getElementById("buyer_address_input").placeholder = "Please Enter Address";

        } else if (document.getElementById("buyer_pincode_input").value === '') {


            document.getElementById("buyer_pincode_input").style.border = "2px solid red";
            document.getElementById("buyer_pincode_input").placeholder = "Please Enter Zip Code";

        } else if (document.getElementById("buyer_mobile_input").value.length < 10) {


            document.getElementById("buyer_mobile_input").value = '';
            document.getElementById("buyer_mobile_input").style.border = "2px solid red";
            document.getElementById("buyer_mobile_input").placeholder = "Please Enter Vaild Mobile Number";

        } else if (!document.getElementById("buyer_email_input").value.includes("@") || !document.getElementById("buyer_email_input").value.includes(".")) {

            document.getElementById("buyer_email_input").value = '';
            document.getElementById("buyer_email_input").style.border = "2px solid red";
            document.getElementById("buyer_email_input").placeholder = "Please Enter Vaild Email";
        } else {


            clientInformation.push({
                name_order: document.getElementById("buyer_name_input").value,
                mobile_order: document.getElementById("buyer_mobile_input").value,
                email_order: document.getElementById("buyer_email_input").value,
                address_order: document.getElementById("buyer_address_input").value,
                pincode_order: document.getElementById("buyer_pincode_input").value
            });




            document.getElementById("container_orderConfirm_item").style.display = "block"


            product_info_1.filter(function(e) {
                document.getElementById("product_name_div").textContent = e.product_name;
                document.getElementById("product_price_div").textContent = e.product_price;
                document.getElementById("product_total_div").textContent = e.product_price;
            })

            if (check_size_option === 0) {

                document.getElementById("product_size_div").textContent = document.getElementById("select_size").value;
            } else {

                document.getElementById("product_size_div_main").style.display = "none";

            }
            document.getElementById("product_date_div").textContent = today;


        }


    })


    document.getElementById("submitBuyConfirmButton").addEventListener('click', function() {



        if (check_size_option === 0) {
            value_size = document.getElementById("select_size").value

            product_info_1.filter(function(e) {

                final_product_info_1.push({

                    product_name: e.product_name,
                    product_price: e.product_price,
                    product_size: value_size,

                })

            })


        } else {
            product_info_1.filter(function(e) {

                final_product_info_1.push({

                    product_name: e.product_name,
                    product_price: e.product_price,

                })

            })
        }



        ajax({
                url: '/upload_order',
                method: 'post',
                contentType: 'application/json',
                data: {
                    uuid_no: final_uuid,
                    date_current: today,
                    client: clientInformation,
                    product_detail: final_product_info_1,
                }
            })
            .then(res => {
                if (res.status === 'ok') {

                    let img11 = document.createElement('input');
                    img11.setAttribute("type", "image");
                    img11.setAttribute("class", "img_thankyou");
                    //  img11.style.marginRight = "auto";
                    //  img11.style.marginLeft = "auto";
                    // img1.style.paddingRight = "auto";
                    // img1.style.paddingLeft = "auto";
                    img11.style.outline = "none";

                    img11.setAttribute("src", `/system_img/thankyou.png`);
                    document.getElementById("container_orderConfirm_item_div_table").style.display = "none";

                    document.getElementById("container_orderConfirm_item_div").append(img11)

                }


                if (res.status === 'no') {

                    console.log("No item data got");


                }
            })
            .catch(err => {
                console.log(err);
            });



    })




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