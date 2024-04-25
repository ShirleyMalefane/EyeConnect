const apiEntry = "https://eyeconnect-api.onrender.com";
const appointmentsCon= document.querySelector(".appointments")
const videoIconSrc = "./majesticons_video-line.jpg";
const docImg = "./Rectangle 598.jpg";
const calendarImg = "Vector (1).jpg";
const clockSrc = "./carbon_time.jpg";
const loading=document.getElementById("loading");
const noAppointments= document.getElementById("no-appointments")

// temporary variables start

let userDetails={}

// temporary variables end

//  create an element with className

const el=(elementName, className, text)=>{
    const element= document.createElement(elementName)
    if(className){
        element.setAttribute("class", className)
    }
    if(text){
        element.innerHTML=text;
    }
    return element
}


const token = localStorage.getItem("eyeconnect_token");
console.log(token);
fetch(`${apiEntry}/users/token`,{
    method:"post",
    headers:{
        "Content-Type":"application/json",
        token
    }
}).then(res=>res.json()).then(data=>{
    console.log(data)
    if(data.success){
        userDetails=data.result
        loading.style.display="none"
        const {appointments}= userDetails
        console.log(appointments)
            if(appointments && appointments.length>0){
                //  display appointments ui
                appointments.forEach(appointment=>{
                    const appointmentCon=el("div", "Appointment-1")
                    const VidCon=el("div", "vid-icon")
                    const vidIconImg= el("img")
                    vidIconImg.setAttribute("src", videoIconSrc)
                    VidCon.appendChild(vidIconImg)
                    const doctorsImgCon=el("div","docs-img1")
                     const docImgUi = el("img");
                     docImgUi.setAttribute("src", docImg)
                     doctorsImgCon.appendChild(docImgUi)

                     const nameCon= el("div","name1")
                     const name=el("p", "name", appointment.doctor.name)
                     name.style.width="180px"
                     nameCon.appendChild(name)
                     const professionCon=el("div","proffesion1")
                     const profession=el("p", "proffesion", appointment.doctor.profession)
                     professionCon.appendChild(profession)
                     const eduLevelCon=el("div","edu-level1")
                     const eduLevel=el("div","edu-level","M.D eye")
                     eduLevelCon.appendChild(eduLevel)

                     const locationCon = el("div", "location1");
                     const location = el("div", "location", "Lagos Nigeria");
                     location.style.width="150px"
                     locationCon.appendChild(location);
                    const reviewsCon = el("div", "reviews1");
                    const reviews = el("div", "reviews", "4.5 reviews");
                    reviewsCon.appendChild(reviews);
                    const calendarCon=el("div", "calendar")
                    const calImg=  el("img", "calender-img")
                    calImg.setAttribute("src", calendarImg)
                    const date=el("p", "date", new Date(appointment.date).toDateString())
                    calendarCon.appendChild(calImg)
                    calendarCon.appendChild(date)
                    const clockCon = el("div", "clock");
                    const clockIcon = el("img", "clock-icon");
                    clockIcon.setAttribute("src",clockSrc)
                    const time= el("p", "time", "9:00 am")
                    clockCon.appendChild(clockIcon);
                    clockCon.appendChild(time);
                     const buttonsSection = el("div", "buttons-section");
                     const rescheduleBtn = el("button", "Reschedule-btn", "Reschedule");
                     const cancelBtn = el("button", "cancel-btn", "Cancel Appointment");
                     buttonsSection.appendChild(rescheduleBtn);
                     buttonsSection.appendChild(cancelBtn);




                    appointmentCon.appendChild(VidCon)
                    appointmentCon.appendChild(doctorsImgCon)
                    appointmentCon.appendChild(nameCon)
                    appointmentCon.appendChild(professionCon)
                    appointmentCon.appendChild(eduLevel)
                    appointmentCon.appendChild(locationCon)
                    appointmentCon.appendChild(reviewsCon)
                    appointmentCon.appendChild(calendarCon)
                    appointmentCon.appendChild(clockCon)
                    appointmentCon.appendChild(buttonsSection)

                    appointmentsCon.appendChild(appointmentCon)
                })
            }
            else{
                // indicate that user has no appoinments
                noAppointments.style.display="flex"
            }

    }
}).catch(err=>{
    console.log(err.message)
})
