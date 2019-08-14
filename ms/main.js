//wo.
var randomobjectw = {
    adksfhasdf: "WOWOWOWO",
    "TheWorldsBestKey": 5
}

function addElement(imgSrc, username, content, dateObject) {
    var row = document.createElement("TR");
    row.className = "my-row";
    row.setAttribute("onclick","window.location.assign('chat.html')")
    row.innerHTML="<td class='col1'><img class='ppic' src='"+imgSrc+"'></td>"
    +"<td class='col2'><div class='username'>"+username+"</div>"
    +"<div class='content'>"+content+"</div></td>"
    +"<td class='col3'><div class='timestamp'>"+formatDateObject(dateObject)+"</div>"
    +"<i class='fa fa-bell-slash-o status-icon'></i></td>";

    var tableBody=document.getElementById("my-table-body");
    tableBody.appendChild(row);
    console.log("WOOOOOOOO");
}
function formatDateObject(date){
    var now = new Date();
    console.log(now.getTime()-date.getTime());
    if(now.getFullYear()==date.getFullYear())
        if(now.getMonth()==date.getMonth())
            if(now.getDate()==date.getDate()){
                var s = date.toLocaleTimeString().split(':');
                return s[0]+":"+s[1]+s[2].slice(2);
            }
            else if(now.getTime()-date.getTime() < 86400*1000)
                return "Yesterday";
    var k = date.toDateString().split(" ");
    return date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear().toString().slice(2);
}

function loadWebFile(dir) { //CANNOT LOAD LOCAL FILES THRU CHROME.
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("demo").innerHTML = xhttp.responseText;
        }
    };
    xhr.open("GET", dir, true);
    xhr.send();
}

var nameOfUser; //this is the banner for chat.html

function loadJSONfile(event) { //WORKS
    var currentFileName;
    var input = event.target; //THE INPUT ELEMENT STORED!!
    currentFileName = input.value;
    var reader = new FileReader();
    var text;
    reader.onload = function () { //this is called after readastext is DONE!
        text = reader.result;

        document.getElementById('output').innerText = text;
        console.log(text);

        //now check if file EXTENSION is .json
        if (currentFileName.split('.').pop() == "json") {
            var jsonObject = JSON.parse(text);
    var i;

    var list = document.getElementById("myList");
    try {
        for (i = 0; i < jsonObject.users.length; i++) {
            var listElement = document.createElement("LI");
            listElement.setAttribute("onclick", "window.location.assign('chat.html')");
            nameOfUser = jsonObject.users[i].username;
            listElement.innerHTML =
                "<img class = 'ppic' src=" + jsonObject.users[i].img + ">"
                + "<span class='username'>" + nameOfUser + "</span>"
                + "<span class='time'>" + jsonObject.users[i].time + "</span><br>"
                + "<span class='content'>" + jsonObject.users[i].content + "</span>"
                + "<i class='" + jsonObject.users[i].icon + " status-icon'></i>";
            list.appendChild(listElement);
        }
    } catch (err) {
        alert(err.message);
    }
        } else { alert("NOT A JSON FILE") }
    };

    reader.readAsText(input.files[0]);




}
function gotoTab(tab){
    var tabs = document.getElementById("bottom-row").children;
    for(var i = 0; i < tabs.length; i++)
        tabs[i].style.backgroundColor="white";
    var element = document.getElementById(tab);
    element.style.backgroundColor="lightgreen";

}