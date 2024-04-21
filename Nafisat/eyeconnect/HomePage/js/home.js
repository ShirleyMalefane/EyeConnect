const apiEntry = "https://eyeconnect-api.onrender.com";
const userName= document.getElementById("userName")
const doctorsCon=document.getElementById("doctors")
const noAppointments= document.getElementById("no-appointments")
const appointmentSection=document.querySelector(".appointment-section")
const loadingCon=document.getElementById("loading")


// temporary and  global variables
let userId,time=""
let userDetails={}


const el=(elementName,className,text)=>{
    const new_element= document.createElement(elementName)
    if(className){new_element.setAttribute("class", className)}
    if(text){new_element.innerHTML=text}
    return new_element
}

fetch(`${apiEntry}/users/token`, {
    method:"post",
    headers:{
        "Content-Type":"application/json",
        token:localStorage.getItem("eyeconnect_token")
    }
}).then(res=>res.json()).then(data=>{
    console.log(data)
    if(data.success){
        const {result}= data
        userName.innerHTML=result.name
        userId=result._id
        userDetails=result
        // populate with details
        const {appointments}=userDetails
        if(appointments&&appointments.length>0){
            appointments.forEach(appointment=>{
                const appointmentCon=el("div","appointment-container")
                const picCon= el("div", "appointment-profile-picture")
                const appointmentDetailsCon= el("div", "appointment-details")
                const doctorsInfo=el("div", "doctors-info")
                const doctorsName=el("div", "doctors-name",appointment.doctor.name)
                const doctorsProfession=el("div", "doctors-name",appointment.doctor.profession)
                const videoIconCon=el("div", "video-call-icon",appointment.doctor.profession)
                const videoIcon=el("i", "fas fa-video")
                const appointmentDate=el("div","appointment-time", new Date(appointment.date).toDateString())
                videoIconCon.appendChild(videoIcon)
                    doctorsInfo.appendChild(doctorsName)
                    doctorsInfo.appendChild(doctorsProfession)

                 appointmentDetailsCon.appendChild(doctorsInfo)
                 appointmentDetailsCon.appendChild(videoIcon)
                 appointmentDetailsCon.appendChild(appointmentDate)
                    appointmentCon.appendChild(picCon)
                    appointmentCon.appendChild(appointmentDetailsCon)


                appointmentSection.appendChild(appointmentCon)
            })
        }
        else{
            noAppointments.style.display="block"
        }
    }
})
fetch(`${apiEntry}/doctors`).then(res=>res.json()).then(data=>{
    if(data.success){
        loadingCon.style.display="none";
      const  doctors= data.result;
      doctors.forEach(doctor=>{
        const doctorCon=el("div", "doctor-item")
        const doctorImgCon=el("div", "doctor-profile-picture")
        const doctorInfoCon=el("div", "doctor-info")
        
        
        // doctor info  should include the following:
        // doctor name
        // specialization 
        // location
        // reviews
        
        const docName= el("div", "doctor-name" ,doctor.name)
        const spec= el("div", "profession", doctor.position)
        const location= el("div", "profession", doctor.location)
        const ratings= el("div", "reviews")
        for(let i=0;i<Math.floor(doctor.rating);i++){
            const rate=el("i", "fas fa-star")
            ratings.appendChild(rate)
        }
        const  no_of_blank_stars= Math.ceil(5-doctor.rating)
        for (let i = 0; i <no_of_blank_stars; i++) {
          const rate = el("i", "far fa-star");
          ratings.appendChild(rate);
        }
// date
        const dateCon= el("div", "bookingtime")
        const label= el("label","", "pick a date")
        const input=el("input")
        input.addEventListener("change",(e)=>{setTime(e.target)})
        input.setAttribute("type", "date")
// date end


// doctor extras
        const extras=el("div", "doctor-extras")
        const distance= el("div","distance",`${(1+ Math.random()).toFixed(1)} km`)
        const fav=el("i", "far fa-heart")
        const reviewCount=el("div", "review-count",`${doctor.reviews} reviews`)
        extras.appendChild(distance)
        extras.appendChild(fav)
        extras.appendChild(reviewCount)
// doctor extras end

// book Button
const bookButton=el("button", "book-appointment", "Book Appointment")
bookButton.onclick=()=>{appoint(doctor._id,doctor.position,doctor.name)}
// book Button ends

        dateCon.appendChild(label)
        dateCon.appendChild(input)
        doctorInfoCon.appendChild(docName)
        doctorInfoCon.appendChild(spec)
        doctorInfoCon.appendChild(location)

        doctorInfoCon.appendChild(ratings)

doctorCon.appendChild(doctorImgCon)
doctorCon.appendChild(doctorInfoCon)
doctorCon.appendChild(dateCon)
doctorCon.appendChild(extras)
doctorCon.appendChild(bookButton)
doctorsCon.appendChild(doctorCon)

        
      })
    }
})
const appoint=(id,profession, name)=>{
    if(!time){
        alert("Please Select Time to Proceed")
    }
    if(!userId){
        alert("error fetching user details wait some seconds and try again")
    }
    if(time&&userId){
        const appointments = userDetails.appointments
          ? [...userDetails.appointments, { date: time, doctor: {id, profession,name} }]
          : [{ date: time, doctor: id }];
        fetch(`${apiEntry}/users/edit`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({...userDetails,appointments})

        }).then(res=>res.json()).then(data=>{
            console.log({update:data})
            window.location.reload()
        })
    }
}

const setTime=(el)=>{
    time=el.value;
    
}