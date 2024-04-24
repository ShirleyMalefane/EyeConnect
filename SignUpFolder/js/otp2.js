// Get the back button element
const backButton = document.getElementById("back-button");

// Add event listener to the back button
backButton.addEventListener("click", function() {
    // Navigate back in the browser's history
    window.history.back();
});

const counter=document.getElementById("counter")
const resendBtn=document.getElementById("resend-button")
const emailPlaceholder=document.getElementById("email-placeholder")
emailPlaceholder.innerHTML=localStorage.getItem("resetemail")

// counting function starts


const startCounter=()=>{
    // disable resend button for 30s
    
    resendBtn.disabled=true
    let count=30
    const countInterval=setInterval(()=>{
        if(count>0){

            count = count - 1;
            counter.innerHTML = count;
        } 
        else{
            
            clearInterval(countInterval)
            resendBtn.disabled=false
        }
        
    },1000)

}
startCounter()


// counting Function ends 

// focus next input element when one changes
const inps= ["inp1","inp2", "inp3", "inp4", "inp5", "inp6"]
inps.forEach((el,index)=>{
   const currentElement=document.getElementById(el)
   
   currentElement.addEventListener("input",(e)=>{
    const nextElement=document.getElementById(inps[index+1])
    
    if(nextElement){
        nextElement.focus()
    }

   })
   currentElement.addEventListener("keydown",(e)=>{
    if((e.key==="Backspace"||e.key==="Delete")&&e.target.value.length==0){
        const previousElement=document.getElementById(inps[index-1])
        if(previousElement){
            previousElement.focus()
        }
    }
   })
})
//
const verify=()=>{
    const input_code= inps.map(inp=>document.getElementById(inp).value).join("")
    console.log(input_code)
    const code_is_correct= input_code===localStorage.getItem("resetCode")
    if(code_is_correct){
        window.location.assign("./verification.html")
    }
    else{
        alert("incorrect");

    }
} 
