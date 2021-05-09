$(document).ready(function () {
    if(localStorage.getItem("currentUser")!=null){
       displayGigs();
    }else{
        window.location.replace("mainpage.html");
    }
    $('#logoutform').submit(function(){
        logOut();
    });
    $('#edit').click(function(){
        document.location.href = "editprofile.html";
    });
});

function displayGigs(){
    
    if(localStorage.getItem('gigs')!=null){
        var gigs = JSON.parse(localStorage.getItem('gigs'));
        var outerFrame = document.createElement('div');

        for(var i = 0;i<gigs.length;i++){
    
            var innerFrame = document.createElement('article');
            innerFrame.classList.add("feedBox");
            var title = document.createElement('h3');
            var description = document.createElement('p');
            var owner = document.createElement('p');
            var contact = document.createElement('p');

            var contactInformation = fetchUserFromUsername(gigs[i].owner).mail;

            owner.style.textAlign = "right";
    
            title.innerHTML = gigs[i].title;
            title.classList.add("prettyColorText");
            contact.innerHTML = "Contact from: " + contactInformation;
            description.innerHTML = gigs[i].description;
            owner.innerHTML = "Requested by: " +gigs[i].owner;
            owner.appendChild(displayProfilePictureOnNotices(gigs[i].owner));
            owner.appendChild(contact);

            innerFrame.appendChild(title);
            innerFrame.appendChild(description);
            innerFrame.appendChild(owner);
            outerFrame.appendChild(innerFrame);
            
        }
        document.getElementById('feed').appendChild(outerFrame);
    
    }
}

