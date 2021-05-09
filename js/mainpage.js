$(document).ready(function () {
    $('#logout').hide();
    $('#profileButton').hide();
    $('#gigs').hide();
    if(localStorage.getItem("currentUser")!=null){
        $('#signinform').hide();
        $('#loginform').hide();
        $('#logout').show();
        $('#gigs').show();
        $('#profileButton').show();
        document.getElementById('userName').innerHTML = "Welcome back "+localStorage.getItem('currentUser') + "!";
        if(localStorage.getItem('gigs')==null){
            var gigs = [{
                "id":1,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":2,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":3,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":4,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":5,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":6,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":7,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },{
                "id":8,
                "title":"title here",
                "owner":"deneme",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            ]
            localStorage.setItem("gigs",JSON.stringify(gigs));
        }
        
        displayGigs();
    }
    $("#userreg").submit(function () {
        registerUser();
    });

    $("#loginform").submit(function () {
        logIn();
    });
    $('#logoutform').submit(function(){
        logOut();
    });

});
function registerUser(){
    var userInfo = getUserRegisterData();
    var exists = checkUsername(userInfo.username);
    if(!exists){
        storeUser(userInfo.mail, userInfo.username, userInfo.password, userInfo.name, userInfo.country);
        alert("Registration completed! You can now log in.");
    }
    else {
        alert("Username already exists! Pick another one.");
    }
}
function logIn(){
    var userInfo = getUserLoginData();
    if(localStorage.getItem('userList') != null){
        var user = fetchUserFromUsername(userInfo.username);
        var exists = checkUsername(userInfo.username);
        if(!exists || user.password != userInfo.password){
            alert("Cannot log in! Make sure you write the login information correctly.");
        }
        else{
            localStorage.setItem("currentUser",userInfo.username);
        }
    }
    else{
        alert("Cannot log in! Make sure you are signed up.")

    }
    
}
function logOut(){
    localStorage.removeItem("currentUser");
}
function storeUser(mail, username, password , name , country){

    if(localStorage.getItem('userList') != null){ //get the existing data and append new info to it
        var users = JSON.parse(localStorage.getItem('userList'));
        var userData = {
            "id": users[users.length-1].id + 1,
            "mail": mail,
            "username": username,
            "password":password,
            "name":name,
            "country":country
        }
    }
    else { //initiate the json array list for users registeration information
        var users = [];
        var userData = {
            "id": 1,
            "mail": mail,
            "username": username,
            "password":password,
            "name":name,
            "country":country
        }
    }
    users.push(userData);
    users = JSON.stringify(users);
    localStorage.setItem('userList', users);

}
function getUserRegisterData(){
    var mail = document.getElementById('mail').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var country = document.getElementById('country').value;

    return {
        mail,username,password,name,country
    };
}
function getUserLoginData(){
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;

    return {
        username,password
    };
}
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
    else{
            var innerFrame = document.createElement('h1');
            innerFrame.classList.add("feedBox");
            innerFrame.innerHTML = "No notices to show! Be the first one to create one!"
            document.getElementById('feed').appendChild(innerFrame);

    }
    
    
}