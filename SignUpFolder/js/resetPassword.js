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
const passwordInp = document.getElementById("password");
const rePasswordInp = document.getElementById("repeat-password");
const submitBtn = document.getElementById("comfirm-pass");

const resetPassword = () => {
  submitBtn.innerHTML = "Loading...";
  const allInputs = [passwordInp, rePasswordInp];
  const all_inputs_were_filled = allInputs.every((inp) => inp.value.length > 0);
  if (all_inputs_were_filled) {
    const passwords_match = passwordInp.value === rePasswordInp.value;
    // only fetch the data if passwords are confirmed
    if (passwords_match) {
      const email = localStorage.getItem("resetemail");
      const password = passwordInp.value;
      fetch(`${apiEntry}/users/edit`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
      }).then(res=>res.json()).then(data=>{     
        console.log(data)
        const {success,result}=data
        if(success){
            alert("password changed successfully")
            window.location.assign("login.html")

        }
        else{
            alert(result)
        }
      })
    }
  } else {
    alert("Completely fill out the from to continue");
    window.location.reload()
  }
};
