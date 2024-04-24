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
const emailInp = document.getElementById("email");
const otpBtn= document.getElementById("otp-button")

// generates a 6 digit code
const generateCode=()=>{
    const digits="0123456789"
    let resultString=""
    for(let i=0; i<6; i++){
        resultString+=digits[Math.floor(Math.random()*digits.length)]
    }
    return resultString
}

fetch(`${apiEntry}/users`).then(res=>res.json()).then(data=>{
    console.log(data)
    if(data.success){
    
        otpBtn.onclick=()=>{
            otpBtn.innerHTML="Loading ..."
            otpBtn.disabled=true;
            const email=emailInp.value
            const thisUser= data.result.find(user=>user.email===email)
            console.log(thisUser)
            const email_exists_in_database=thisUser!==undefined
            if(email_exists_in_database){
                const code=generateCode()
                const message=`Dear ${thisUser.name.toUpperCase()}, your confirmation code is ${code}`
                localStorage.setItem("resetCode",code)
                localStorage.setItem("resetemail",email)
                fetch(`${apiEntry}/sendmail`,{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email,
                        message
                    })
                }).then(res=>res.json()).then(data=>{
                    console.log(data)
                    if(data.sucess){
                        window.location.assign("./otp2.html")
                    }
                    else{
                        alert("failed to send ")}
                        // window.location.reload()
                })
            }
            else{
                alert("There is no such email in our records" )
                window.location.reload()
            }
        }

    }
});
