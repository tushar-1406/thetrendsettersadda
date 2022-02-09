function loggedIn(){
    fetch("http://localhost:3000/loggedIn").then((response)=>{
        return response.text();
    }).then((data)=>{
        if(data==="true")
        {
            const logout=document.getElementById("logout");
            const account=document.getElementById("account");
            logout.style.display="block";
            account.style.display="none";
        }
    })
}
loggedIn();




