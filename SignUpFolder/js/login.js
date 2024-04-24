// Add the screen size restriction code here
window.onload = function() {
    var screenWidth = window.innerWidth;
    if (screenWidth > 768) {
        var errorMessage = document.createElement('div');
        errorMessage.innerHTML = "<p>Sorry, this content is only available on small screens like Android and iOS devices (iPhone).</p>";
        errorMessage.style.color = "red";
        errorMessage.style.textAlign = "center";
        document.body.appendChild(errorMessage);
        return; // Stop further execution of the script on larger screens
    }
};

const apiEntry = "https://eyeconnect-api.onrender.com";

const loginBtn= document.getElementById("login-button")
const emailInp=document.getElementById("email")
const passwordInp=document.getElementById("password")

const login=()=>{
    loginBtn.innerHTML="Loading..."
    loginBtn.disabled=true
    const all_inputs=[emailInp,passwordInp];
    const all_inputs_were_filled=all_inputs.every(inp=>inp.value.length>0)
    if(!all_inputs_were_filled){
        alert("Completely fill out all fields to continue")
    }
    else{
        fetch(`${apiEntry}/users/login`, {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:emailInp.value,
                password:passwordInp.value
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                console.log(data.result)
                const {token}=data.result
                localStorage.setItem("eyeconnect_token", token)
                alert( `successful login, youre now logged in as ${data.result.name}`)
                 window.location.assign("../HomePage/home.html")            
}
             else{
                alert(data.result)
                window.location.reload()
            }
        })
    }
}