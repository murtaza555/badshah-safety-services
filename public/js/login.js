window.onload = function() {


document.getElementById("submitLoginButton").addEventListener('click',function(){

    if (document.getElementById("username_input").value === '') { 
        document.getElementById("username_input").style.border = "2px solid red";
        document.getElementById("username_input").placeholder = "Please Enter  UserName";
   
    }

   else if (document.getElementById("password_input").value === '') { 
    document.getElementById("password_input").style.border = "2px solid red";
    document.getElementById("password_input").placeholder = "Please Enter  Password";
}else{

let username = document.getElementById("username_input").value;
let password = document.getElementById("password_input").value ;

ajax({
    url: '/loginCheck',
    method: 'post',
    contentType: 'application/json',
    data: {
username: username,
password: password
    }
})
.then(res => {
    if (res.status === 'ok') {

       localStorage.setItem('adminPage', res.code);
       location.href = "admin";

    }

    if (res.status === 'no') {

document.getElementById("message_div").textContent = "Please Enter Valid UserName & Password";

    }
})
.catch(err => {
    console.log(err);
});


}


})


window.addEventListener('click',function(){
    document.getElementById("message_div").textContent = '';


})



// END
}