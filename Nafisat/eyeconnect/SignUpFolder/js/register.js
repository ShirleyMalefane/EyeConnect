const apiEntry = "https://eyeconnect-api.onrender.com";
const nameInp = document.getElementById("name");
const emailInp = document.getElementById("email");
const passwordInp = document.getElementById("password");
const confirmPasswordInp = document.getElementById("confirm-password");
const signupBtn=document.getElementById("signup-button")

const register = () => {
    signupBtn.innerHTML="Loading ..."
    signupBtn.disabled=true
  const all_inputs = [nameInp, emailInp, passwordInp, confirmPasswordInp];
  const all_inputs_were_filled = all_inputs.every(
    (inp) => inp.value.length > 0
  );
  if (!all_inputs_were_filled) {
    alert("Completely fill out the form to proceed");
  } else {
    const passwords_do_not_match =
      passwordInp.value !== confirmPasswordInp.value;
    if (passwords_do_not_match) {
      alert("passwords did not match, try again");
    } else {
      fetch(`${apiEntry}/users/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInp.value,
          email: emailInp.value,
          password: passwordInp.value,
        }),
      }).then(res=>res.json()).then(data=>{
        console.log(data)
        if(data.success){
            alert("Successful")
            localStorage.setItem("eyeconnect_token", data.result.token)
            window.location.assign("../homepage/home.html")
        }
        else{
            alert("Operation failed, try with a different username or email")
            window.location.reload()
        }
      })
    }
  }
};

