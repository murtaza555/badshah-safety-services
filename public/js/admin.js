window.onload = function() {

    if (localStorage.getItem('adminPage') !== "yes") {


        location.href = "login";
    }

    let main_components_all_details_item = [];
    let main_components_order_detail = [];
    let array_size = [];
    let array_tags = [];
    let size_id_count = 0;
    let tags_id_count = 0;
    let specification_id_count = 0;
    let newCategoryDisplay = 0;
    var srcData = null;
    let category1 = null;
    let all_category_list = [];
    let recent_do = "no";
    let array_specification = [];







    let fetch_all_product_details = function() {


        ajax({
                url: '/getProducts',
                method: 'post',
                contentType: 'application/json',
                data: {

                }
            })
            .then(res => {
                if (res.status === 'ok') {
                    main_components_all_details_item = [];
                    all_category_list = [];

                    main_components_all_details_item = res.get_Products;
                    all_category_list = res.get_category;
                    let optionCategory = null;
                    let optionCategoryFilter = null;
                    console.log(all_category_list);

                    document.getElementById("item_category_select_filter").innerHTML = '';
                    optionCategoryAllWala = document.createElement('option');
                    optionCategoryAllWala.setAttribute("value", 'all');
                    optionCategoryAllWala.textContent = "All";
                    document.getElementById("item_category_select_filter").append(optionCategoryAllWala);

                    for (let l = 0; l < all_category_list.length; l++) {
                        if (all_category_list[l].category_name.length > 1) {
                            optionCategory = document.createElement('option');
                            optionCategory.setAttribute("value", all_category_list[l].category_name);
                            //optionCategory.setAttribute("id", all_category_list[l].category);
                            optionCategory.textContent = all_category_list[l].category_name;
                            document.getElementById("item_category_select").append(optionCategory);

                        }

                    }
                    for (let l1 = 0; l1 < all_category_list.length; l1++) {
                        if (all_category_list[l1].category_name.length > 1) {
                            optionCategoryFilter = document.createElement('option');
                            optionCategoryFilter.setAttribute("value", all_category_list[l1].category_name);
                            //optionCategory.setAttribute("id", all_category_list[l].category);
                            optionCategoryFilter.textContent = all_category_list[l1].category_name;
                            document.getElementById("item_category_select_filter").append(optionCategoryFilter);

                        }

                    }

                    showProducts();
                }

                if (res.status === 'no') {

                    console.log("no Products");


                }
            })
            .catch(err => {
                console.log(err);
            });




    }


    let fetch_all_orders_details = function() {


        ajax({
                url: '/getOrders',
                method: 'post',
                contentType: 'application/json',
                data: {

                }
            })
            .then(res => {
                if (res.status === 'ok') {
                    // main_components_all_details_item = [];
                    // all_category_list = [];

                    main_components_order_detail = res.getOrdersDeatil;
                    // all_category_list = res.get_category;


                    showOrders();



                }

                if (res.status === 'no') {

                    console.log("no Products");


                }
            })
            .catch(err => {
                console.log(err);
            });




    }


    fetch_all_orders_details();


    let showOrders = function() {

        let mainDivOrder = null;
        let n = main_components_order_detail.length;
        n = n - 1;
        document.getElementById("main_component_holder_div_item").innerHTML = '';



        for (n; n >= 0; n--) {


            if (main_components_order_detail[n].id !== null) {
                mainDivOrder = document.createElement('div');
                mainDivOrder.setAttribute("id", main_components_order_detail[n].id + "orderDiv");
                mainDivOrder.setAttribute("class", "mainDiv_class");
            }
            let orderIdDiv = document.createElement('div');
            var img_delete_divOrder = document.createElement("INPUT");
            let viewOrderButtton = document.createElement('button');
            let statusOrderButtton = document.createElement('button');

            var selectOrder = document.createElement("Select");


            if (main_components_order_detail[n].id !== null) {

                // img_delete_divOrder.setAttribute("type", "image");
                // img_delete_divOrder.setAttribute("src", "/system_img/wrong.png");
                // img_delete_divOrder.className = "deleteProduct_wrong_image";
                // img_delete_divOrder.id = `${main_components_order_detail[n].id}deleteOrder`;



                orderIdDiv.setAttribute("class", "orderIdDiv_class");
                orderIdDiv.textContent = main_components_order_detail[n].id;


                img_delete_divOrder.setAttribute("type", "image");
                img_delete_divOrder.setAttribute("src", "/system_img/wrong.png");
                img_delete_divOrder.className = "deleteProduct_wrong_image";
                img_delete_divOrder.id = `${main_components_order_detail[n].id}deleteOrder`;


                //updateButtton.style.width = "13%";

                viewOrderButtton.setAttribute("class", "viewOrderButtton_class");
                //viewOrderButtton.textContent = main_components_order_detail[n].date_current;
                if (main_components_order_detail[n].status === "order_confirmed" || main_components_order_detail[n].status === "item_bagged" || main_components_order_detail[n].status === "item_dispatched") {
                    viewOrderButtton.style.backgroundColor = "green";

                    if (main_components_order_detail[n].status === "order_confirmed") {
                        viewOrderButtton.textContent = "Confirmed";
                    }
                    if (main_components_order_detail[n].status === "item_bagged") {
                        viewOrderButtton.textContent = "Bagged";
                    }
                    if (main_components_order_detail[n].status === "item_dispatched") {
                        viewOrderButtton.textContent = "Dispatched";

                    }
                } else {
                    viewOrderButtton.textContent = "View Details";

                }
                viewOrderButtton.setAttribute("id", main_components_order_detail[n].id + "orderViewButton");


                selectOrder.setAttribute("id", main_components_order_detail[n].id + "orderSelect");
                selectOrder.setAttribute("class", "orderSelect_class");


                var optionOrderConfirmed = document.createElement("option");
                optionOrderConfirmed.setAttribute("value", "order_confirmed");
                var nodOrderConfirmed = document.createTextNode("Order Confirmed");
                optionOrderConfirmed.appendChild(nodOrderConfirmed);
                selectOrder.appendChild(optionOrderConfirmed);

                var optionItemBagged = document.createElement("option");
                optionItemBagged.setAttribute("value", "item_bagged");
                var nodItemBagged = document.createTextNode("Item Bagged");
                optionItemBagged.appendChild(nodItemBagged);
                selectOrder.appendChild(optionItemBagged);

                var optionItemDispatched = document.createElement("option");
                optionItemDispatched.setAttribute("value", "item_dispatched");
                var nodItemDispatched = document.createTextNode("Item Dispatched");
                optionItemDispatched.appendChild(nodItemDispatched);
                selectOrder.appendChild(optionItemDispatched);


                statusOrderButtton.setAttribute("class", "statusOrderButtton_class");
                statusOrderButtton.textContent = "Status";
                statusOrderButtton.setAttribute("id", main_components_order_detail[n].id + "orderStatusButton");



            }


            // let priceDiv = document.createElement('div');
            // priceDiv.setAttribute("class", "orderDateDiv_class");
            // if (main_components_all_details_item[m].product_price !== null) {
            //     priceDiv.textContent = main_components_all_details_item[m].product_price;
            // } else {
            //     priceDiv.textContent = " ";

            // }

            // let uuidDiv = document.createElement('div');
            // uuidDiv.setAttribute("class", "amountDiv_class1");


            // if (main_components_all_details_item[m].uuid_no !== null) {
            //     uuidDiv.textContent = main_components_all_details_item[m].uuid_no;
            // } else {
            //     uuidDiv.textContent = " ";

            // }

            // let updateButtton = document.createElement('button');
            // //updateButtton.style.width = "13%";

            // if (main_components_all_details_item[m].uuid_no !== null) {

            //     updateButtton.style.backgroundColor = "orange";
            //     updateButtton.setAttribute("class", "updateButton_class");
            //     updateButtton.textContent = "Update";
            //     updateButtton.setAttribute("id", main_components_all_details_item[m].uuid_no + "itemButton");
            // }



            if (main_components_order_detail[n].id !== null) {
                mainDivOrder.append(img_delete_divOrder);
                mainDivOrder.append(orderIdDiv);
                mainDivOrder.append(viewOrderButtton);
                mainDivOrder.append(selectOrder);
                mainDivOrder.append(statusOrderButtton);


                document.getElementById("main_component_holder_div_item").append(mainDivOrder);

            }


        }

    }


    let showProducts = function() {

        let mainDivItem = null;
        let m = main_components_all_details_item.length;
        m = m - 1;

        document.getElementById("header_div").style.display = "flex";
        document.getElementById("main_component_holder_div_item").innerHTML = '';



        for (m; m >= 0; m--) {


            if (main_components_all_details_item[m].uuid_no !== null) {
                mainDivItem = document.createElement('div');
                mainDivItem.setAttribute("id", main_components_all_details_item[m].uuid_no + "itemDiv");
                mainDivItem.setAttribute("class", "mainDiv_class");
            }
            let itemNameDiv = document.createElement('div');
            var img_delete_divProduct = document.createElement("INPUT");

            if (main_components_all_details_item[m].uuid_no !== null) {

                img_delete_divProduct.setAttribute("type", "image");
                img_delete_divProduct.setAttribute("src", "/system_img/wrong.png");
                img_delete_divProduct.className = "deleteProduct_wrong_image";
                img_delete_divProduct.id = `${main_components_all_details_item[m].uuid_no}deleteProduct`;

                itemNameDiv.setAttribute("class", "clientNameDiv_class");
                itemNameDiv.textContent = main_components_all_details_item[m].product_name;
            }


            let priceDiv = document.createElement('div');
            priceDiv.setAttribute("class", "orderDateDiv_class");
            if (main_components_all_details_item[m].product_price !== null) {
                priceDiv.textContent = main_components_all_details_item[m].product_price;
            } else {
                priceDiv.textContent = " ";

            }

            let uuidDiv = document.createElement('div');
            uuidDiv.setAttribute("class", "amountDiv_class1");


            if (main_components_all_details_item[m].uuid_no !== null) {
                uuidDiv.textContent = main_components_all_details_item[m].uuid_no;
            } else {
                uuidDiv.textContent = " ";

            }

            let updateButtton = document.createElement('button');
            //updateButtton.style.width = "13%";

            if (main_components_all_details_item[m].uuid_no !== null) {

                updateButtton.style.backgroundColor = "orange";
                updateButtton.setAttribute("class", "updateButton_class");
                updateButtton.textContent = "Update";
                updateButtton.setAttribute("id", main_components_all_details_item[m].uuid_no + "itemButton");
            }



            if (main_components_all_details_item[m].uuid_no !== null && main_components_all_details_item[m].product_name !== "") {
                mainDivItem.append(img_delete_divProduct);
                mainDivItem.append(itemNameDiv);
                mainDivItem.append(priceDiv);
                mainDivItem.append(uuidDiv);
                mainDivItem.append(updateButtton);


                document.getElementById("main_component_holder_div_item").append(mainDivItem);

            }


        }

    }


    document.getElementById("btn_addProducts").addEventListener('click', function() {
        fetch_all_product_details();


        document.getElementById("container_update_item").style.display = "block"


        document.getElementById("item_category_select").innerHTML = "";
        document.getElementById("newCategoryItem_div").style.display = "none"
        category1 = null;
        newCategoryDisplay = 0;
        document.getElementById("updateDoneStatus").textContent = "";

        // for (let l = 0; l < all_category_list.length; l++) {
        //     if (all_category_list[l].category !== null) {
        //         console.log(all_category_list[l].category);
        //         optionCategory = document.createElement('option');
        //         optionCategory.setAttribute("value", all_category_list[l].category);
        //         //optionCategory.setAttribute("id", all_category_list[l].category);
        //         optionCategory.textContent = all_category_list[l].category;
        //         document.getElementById("item_category_select").append(optionCategory);

        //     }

        // }







    })

    document.getElementById("btn_itemsManager").addEventListener('click', function() {

        fetch_all_product_details();

    })
    document.getElementById("btn_addCategory_submit").addEventListener('click', function() {

        let category_name_input = null;

        category_name_input = document.getElementById("category_name_input").value;

        ajax({
                url: '/add_new_category',
                method: 'post',
                contentType: 'application/json',
                data: {
                    category_name_input: category_name_input,
                    srcData: srcData



                }


            })
            .then(res => {
                if (res.status === 'ok') {

                    document.getElementById("status_addCategory").textContent = "Add Done";

                }

                if (res.status === 'no') {

                    console.log("no  item update done");
                    document.getElementById("status_addCategory").textContent = "Error While Updating";


                }
            })
            .catch(err => {
                console.log(err);
            });


    })

    document.getElementById("submitUpdateItemButton").addEventListener('click', function() {


        let item_name_input = null;
        let item_price_input = null;
        let item_description_input = null;
        let img_src_data = null;

        item_name_input = document.getElementById("item_name_input").value
        item_price_input = document.getElementById("item_price_input").value
        item_description_input = document.getElementById("item_description_input").value



        let newCategoryValue = null;
        if (newCategoryDisplay === 1) {

            category1 = document.getElementById("newCategoryItem").value

        } else {
            category1 = document.getElementById("item_category_select").value;
        }

        if (document.getElementById("checkbox_status").checked) {


            recent_do = "yes";
        }
        console.log(array_specification);

        ajax({
                url: '/update_item_details',
                method: 'post',
                contentType: 'application/json',
                data: {
                    item_name_input: item_name_input,
                    item_price_input: item_price_input,
                    item_description_input: item_description_input,
                    srcData: srcData,
                    array_size: array_size,
                    category: category1,
                    array_tags: array_tags,
                    array_specification: array_specification,
                    recent_do: recent_do


                }


            })
            .then(res => {
                if (res.status === 'ok') {

                    document.getElementById("updateDoneStatus").textContent = "Update Done";
                    // optionCategory_filter_available = "yes";
                    //getItemDetails();
                    fetch_all_product_details();
                }

                if (res.status === 'no') {

                    console.log("no  item update done");
                    document.getElementById("updateDoneStatus").textContent = "Error While Updating";


                }
            })
            .catch(err => {
                console.log(err);
            });





    })

    document.getElementById("close_form1").addEventListener('click', function() {

        document.getElementById("item_name_input").value = '';
        document.getElementById("item_price_input").value = '';
        document.getElementById("item_description_input").value = '';
        document.getElementById("item_size_input").value = '';
        document.getElementById("item_tags_input").value = '';
        document.getElementById("div_size_object").innerHTML = '';
        document.getElementById("div_tags_object").innerHTML = '';

        document.getElementById("div_specification").innerHTML = '';
        document.getElementById("item_spec1_input").innerHTML = '';
        document.getElementById("item_spec2_input").innerHTML = '';


        document.querySelector('#img_product').innerHTML = '';


        document.getElementById("container_update_item").style.display = "none";
        array_size = [];
        array_tags = [];
        size_id_count = 0;
        tags_id_count = 0;
        specification_id_count = 0;





    })
    document.getElementById("close_form2").addEventListener('click', function() {


        //document.getElementById("container_orderView_item_div_table").innerHTML = '';
        document.getElementById("product_size_div_main").style.display = "none";

        document.getElementById("container_orderView_item").style.display = "none";
        document.getElementById("class_addProducts").style.filter = "none";



    })


    document.getElementById("btn_addSize").addEventListener('click', function() {
        document.getElementById("div_size_object").innerHTML = '';


        let size_value = document.getElementById("item_size_input").value

        array_size.push({
            size: size_value
        })

        sizeArrayFuntion();




        document.getElementById("item_size_input").value = '';


    })

    window.addEventListener('click', function(e) {

        if (e.target.id.includes("sizeImg")) {

            let delete_size_number = parseInt(e.target.id);


            array_size.splice(delete_size_number, 1);
            sizeArrayFuntion();


        }

        if (e.target.id.includes("tagsImg")) {

            let delete_tags_number = parseInt(e.target.id);


            array_tags.splice(delete_tags_number, 1);
            tagsArrayFuntion();


        }
        if (e.target.id.includes("specImg")) {

            let delete_specification_number = parseInt(e.target.id);


            array_specification.splice(delete_specification_number, 1);
            specificationArrayFuntion();


        }


        if (e.target.id.includes("deleteProduct")) {

            if (confirm('Really wants to delete?')) {

                // Save it!let kl = parseInt(e.target.id);
                let kl = e.target.id.substring(0, 36);
                console.log(kl);
                main_components_all_details_item.filter(function(r) {


                    if (kl === r.uuid_no) {

                        ajax({
                                url: '/delete_product',
                                method: 'post',
                                contentType: 'application/json',
                                data: {
                                    delete_uuid: kl,
                                }


                            })
                            .then(res => {
                                if (res.status === 'ok') {

                                    fetch_all_product_details();


                                }

                                if (res.status === 'no') {

                                    console.log("no deletion done");


                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                })


            } else {
                // Do nothing!
                console.log('Not deleted');
            }



        }


        // view order

        if (e.target.id.includes("orderViewButton")) {

            let btn_view_click = parseInt(e.target.id);

            main_components_order_detail.filter(function(f) {

                if (f.id === btn_view_click) {

                    document.getElementById("class_addProducts").style.filter = "blur(8px)";

                    document.getElementById("container_orderView_item").style.display = "block"


                    var dataProduct_Detail = JSON.parse(f.product_detail);

                    dataProduct_Detail.filter(function(g) {

                        document.getElementById("product_name_div").textContent = g.product_name;
                        document.getElementById("product_total_div").textContent = g.product_price;

                        if (f.product_detail.includes("product_size")) {
                            document.getElementById("product_size_div_main").style.display = "block";
                            document.getElementById("product_size_div").textContent = g.product_size;

                        }

                    })



                    document.getElementById("product_date_div").textContent = f.date_current;

                    document.getElementById("product_uuid_div").textContent = f.uuid_no;



                    var dataClient = JSON.parse(f.client);

                    dataClient.filter(function(g) {

                        // document.getElementById("product_name_div").textContent = g.name_order;
                        // document.getElementById("product_total_div").textContent = g.product_price;
                        document.getElementById("product_client_name_div_class").textContent = g.name_order;
                        document.getElementById("product_client_mobile_div_class").textContent = g.mobile_order;
                        document.getElementById("product_client_email_div_class").textContent = g.email_order;
                        document.getElementById("product_client_address_div_class").textContent = g.address_order;
                        document.getElementById("product_client_pincode_div_class").textContent = g.pincode_order;



                    })



                }
            })



        }
        if (e.target.id.includes("deleteOrder")) {

            if (confirm('Really wants to delete?')) {

                // Save it!let kl = parseInt(e.target.id);
                let klm = parseInt(e.target.id);

                main_components_order_detail.filter(function(r) {


                    if (klm === r.id) {

                        ajax({
                                url: '/delete_order',
                                method: 'post',
                                contentType: 'application/json',
                                data: {
                                    delete_id: klm,
                                }


                            })
                            .then(res => {
                                if (res.status === 'ok') {

                                    fetch_all_orders_details();


                                }

                                if (res.status === 'no') {

                                    console.log("no deletion done");


                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                })


            } else {
                // Do nothing!
                console.log('Not deleted');
            }



        }


        if (e.target.id.includes("orderStatusButton")) {
            let klmn = parseInt(e.target.id);


            main_components_order_detail.filter(function(r) {

                if (klmn === r.id) {


                    let select_order_status = document.getElementById(`${r.id}orderSelect`).value;

                    ajax({
                            url: '/send_email',
                            method: 'post',
                            contentType: 'application/json',
                            data: {
                                id: r.id,
                                uuid_no: r.uuid_no,
                                date_current: r.date_current,
                                client: JSON.parse(r.client),
                                product_detail: JSON.parse(r.product_detail),
                                status: select_order_status
                            }


                        })
                        .then(res => {
                            if (res.status === 'ok') {

                                console.log("hello")

                                fetch_all_orders_details();

                            }

                            if (res.status === 'no') {

                                console.log("no email sent");


                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });

                }

            })


        }


    })

    let sizeArrayFuntion = function() {
        document.getElementById("div_size_object").innerHTML = '';


        size_id_count = 0;
        array_size.filter(function(e) {

            let div_size_box = document.createElement('div');
            div_size_box.setAttribute('class', "div_size_box");
            div_size_box.textContent = e.size;
            div_size_box.id = `${size_id_count}sizeDiv`;

            var img_delete_size = document.createElement("INPUT");
            img_delete_size.setAttribute("type", "image");
            img_delete_size.setAttribute("src", "/system_img/wrong.png");
            img_delete_size.className = "size_wrong_image";
            img_delete_size.id = `${size_id_count}sizeImg`;

            div_size_box.append(img_delete_size);

            document.getElementById("div_size_object").append(div_size_box);
            size_id_count = size_id_count + 1;


        })


    }

    let tagsArrayFuntion = function() {
        document.getElementById("div_tags_object").innerHTML = '';


        tags_id_count = 0;
        array_tags.filter(function(e) {

            let div_tags_box = document.createElement('div');
            div_tags_box.setAttribute('class', "div_size_box");
            div_tags_box.textContent = e.tags;
            div_tags_box.id = `${tags_id_count}tagsDiv`;

            var img_delete_tags = document.createElement("INPUT");
            img_delete_tags.setAttribute("type", "image");
            img_delete_tags.setAttribute("src", "/system_img/wrong.png");
            img_delete_tags.className = "size_wrong_image";
            img_delete_tags.id = `${tags_id_count}tagsImg`;

            div_tags_box.append(img_delete_tags);

            document.getElementById("div_tags_object").append(div_tags_box);
            tags_id_count = tags_id_count + 1;


        })


    }
    let specificationArrayFuntion = function() {
        document.getElementById("div_specification").innerHTML = '';


        specification_id_count = 0;
        array_specification.filter(function(e) {

            let div_specification_box = document.createElement('div');
            div_specification_box.setAttribute('class', "div_size_box");
            div_specification_box.textContent = e.specification_name + ":" + e.specification_value;
            div_specification_box.id = `${specification_id_count}specDiv`;

            var img_delete_specification = document.createElement("INPUT");
            img_delete_specification.setAttribute("type", "image");
            img_delete_specification.setAttribute("src", "/system_img/wrong.png");
            img_delete_specification.className = "size_wrong_image";
            img_delete_specification.id = `${specification_id_count}specImg`;

            div_specification_box.append(img_delete_specification);

            document.getElementById("div_specification").append(div_specification_box);
            specification_id_count = specification_id_count + 1;


        })


    }

    document.getElementById("addCategoryButton").addEventListener('click', function() {

        newCategoryDisplay = 1;
        document.getElementById("newCategoryItem_div").style.display = "block"



    })


    document.getElementById("btn_addTags").addEventListener('click', function() {
        document.getElementById("div_tags_object").innerHTML = '';

        let tags_value = document.getElementById("item_tags_input").value

        array_tags.push({
            tags: tags_value
        })

        tagsArrayFuntion();




        document.getElementById("item_tags_input").value = '';


    })

    document.getElementById("btn_addSpecification").addEventListener('click', function() {
        document.getElementById("div_specification").innerHTML = '';

        let specification_name = document.getElementById("item_spec1_input").value
        let specification_value = document.getElementById("item_spec2_input").value

        array_specification.push({
            specification_name: specification_name,
            specification_value: specification_value
        })

        specificationArrayFuntion();




        document.getElementById("item_spec1_input").value = '';
        document.getElementById("item_spec2_input").value = '';


    })





    let input = document.getElementById("img_product");
    // let myfile_button = document.getElementById("myfile_button");
    // let myfile_div = document.getElementById("myfile_div");
    // let appendImage = document.getElementById("appendImage");




    document.querySelector('#img_product').addEventListener('change', function(event) {

        // changeImg(event);



        // myfile_button.style.display = "none";
        // input.style.display = "none";

        // document.querySelector(".myfile1").style.display = "block";

        handleImageUpload(event)

    });

    document.querySelector('#category_image_input').addEventListener('change', function(event) {

        // changeImg(event);



        // myfile_button.style.display = "none";
        // input.style.display = "none";

        // document.querySelector(".myfile1").style.display = "block";

        handleImageUpload(event)

    });
    // document.querySelector('#myfile1').addEventListener('change', function(event) {
    //     changeImg(event);
    //     handleImageUpload(event)


    // });

    // let changeImg = function(event) {
    //     // appendImage.innerHTML = "";

    //     let input1 = event.target.files[0];

    //     var image = document.createElement('img');
    //     image.src = window.URL.createObjectURL(input1);
    //     image.height = 50;
    //     image.width = 80;
    //     image.style.marginRight = "12px";
    //     // p2.appendChild(image);

    //     appendImage.appendChild(image);

    // }


    let handleImageUpload = function(event) {


        srcData = null;

        var file = event.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            srcData = fileLoadedEvent.target.result;
            var newImage = document.createElement('img');
            newImage.src = srcData;
            // nowAjax(srcData);
        }
        fileReader.readAsDataURL(file);



        // let nowAjax = function(srcData) {
        //     ajax({
        //             url: '/upload',
        //             method: 'post',
        //             contentType: 'application/json',
        //             data: {
        //                 srcData: srcData
        //             }
        //         })
        //         .then(res => {
        //             if (res.status === 'ok') {
        //                 console.log("ok image");

        //             }

        //             if (res.status === 'no') {

        //                 console.log("no image");


        //             }
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // }

    }


    document.getElementById("btn_addCategoryNav").addEventListener('click', function() {

        document.getElementById("container_addCategory").style.display = "block"
    })

    document.getElementById("close_form3").addEventListener('click', function() {


        //document.getElementById("container_orderView_item_div_table").innerHTML = '';
        //    document.getElementById("product_size_div_main").style.display ="none";

        document.getElementById("container_addCategory").style.display = "none";
        //     document.getElementById("class_addProducts").style.filter = "none";



    })




    //end
}