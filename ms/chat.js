
function loadJSONfileAsChat(event) { //WORKS
    var currentFileName;
    var jsonObject;
    var input = event.target; //THE INPUT ELEMENT STORED!!
    currentFileName = input.value;
    var reader = new FileReader();
    var text;
    reader.onload = function () { //this is called after readAsText is DONE!
        text = reader.result;
        console.log(text);
        //now check if file EXTENSION is .json
        if (currentFileName.split('.').pop() == "json") {
            jsonObject = JSON.parse(text);
            var i;
            var tableBody = document.getElementById("message-table-body");
            try {
                for (i = 0; i < jsonObject.chats.length; i++) {
                    var rowElement = document.createElement("TR");
                    rowElement.setAttribute("class", "message-row");
                    rowElement.innerHTML =
                        "<td class='col1'><img class='ppic' src=" + jsonObject.chats[i].img + "></td>"
                        + "<td class='col2'><div class='username-left'>" + jsonObject.chats[i].username + "</div>"
                        + "<div class='content-left'>" + jsonObject.chats[i].content + "</div></td>";

                    tableBody.appendChild(rowElement);

                }
            } catch (err) {
                alert(err.message);
            }
        } else { alert("NOT A JSON FILE") }
    };

    reader.readAsText(input.files[0]);




}
var previousDate = new Date();
//var previousUser = "";

function clickSend() {
    var msg = document.getElementById('text-input').value;
    if (msg != '') {
        addMessage('POHEAD PENG', msg, "img/cool.jpg", new Date(), true);
        addMessage('John Doe', msg, "img/flowerwo.jpeg", new Date(), false)
    };
}
function saveToLocal(key, obj) {
    var str = JSON.stringify(obj);
    localStorage.setItem(key, str);
}
function loadFromLocal(key) {
    var str = localStorage.getItem(key);
    var obj = JSON.parse(str);
    return obj;
}
function saveToJSON(){

}
function loadFromJSON(){
    
}
function loadLocalStorageIntoPage() {
    var msgArray = loadFromLocal("messages");
    if (msgArray) {

        for (var i = 0; i < msgArray.length; i++) {
            var msg = msgArray[i];
            addMessage(msg.username, msg.content, msg.img, new Date(msg.time), msg.me);
            
        }
    }
}
function addMessage(currentUser, content, imgFile, currentDate, me) {

    var textareaElement = document.getElementById("text-input");
    if (content != "") {

        //test
        // if (textInputElement.value == "ATTACH") {
        //     var fileInputEl = document.getElementById("myFile");
        //     fileInputEl.click();
        // } TWAYESURDITFOYGPUH{IJ}OK
        //


        // message = message.replace(/</g, "&lt;");
        // message = message.replace(/>/g, "&gt;");
        content = content.replace(/\n/g, "<br>");
        var tableBody = document.getElementById("message-table-body");
        //if (areDatesOnSameMinute(d, previousDate) && previousUser == currentUser) {
        //   if(false){  var textNode = document.createTextNode(textInputElement.value);
        //     var elements = document.getElementsByClassName("content-right");
        //     var lastCRight = elements[elements.length - 1];
        //     lastCRight.appendChild(document.createElement("BR"));
        //     lastCRight.appendChild(textNode);

        var row = document.createElement("TR");
        row.setAttribute("class", "message-row");
        var ppicString = "<img class='ppic' src=" + imgFile + ">";
        row.innerHTML =
            "<td class='col1'>" + (!me ? ppicString : "") + "</td>"
            + "<td class='col2'><div class='username-" + (!me ? "left" : "right") + "'>" + currentUser + "</div>"
            + "<div class='content-" + (!me ? "left" : "right") + "'>" + content + "</div></td>"
            + "<td class='col3'>" + (me ? ppicString : "") + "</td>";

        //if (!areDatesOnSameMinute(currentDate, previousDate)) {
        var timeRow = document.createElement("TR");
        timeRow.innerHTML = "<td class='time-td' colspan='3'><div class='timestamp'>" + formatDate(currentDate) + "</div></td>";
        tableBody.appendChild(timeRow);
        //}
        tableBody.appendChild(row);

        previousDate = currentDate;
        //previousUser = currentUser;
        textareaElement.value = "";
        window.scrollTo(0, document.body.scrollHeight);
    }

    var messageObject = {
        username: currentUser,
        content: content,
        img: imgFile,
        time: currentDate.getTime(),
        me: me
    };

    messages.push(messageObject)
    saveToLocal("messages", messages);
}

var messages = [];


function formatDate(date) {
    return date.toDateString() + " at " + date.toLocaleTimeString();
}
function attachFile(event) {
    //Images
    var input = event.target; //THE INPUT ELEMENT STORED!!
    var file = input.files[0];
    var imgSrc = "";
    alert(file.name);
    var ext = file.name.split('.').pop().toLowerCase();

    // if( ext=="json"){

    //     return;
    // }

    if (ext == "png" || ext == "jpg" || ext == "jpeg") { //IMAGES.
        var reader = new FileReader();
        reader.onload = function (e) {
            imgSrc = e.target.result;
            /* alert(e); //ProgressEvent
             alert(e.target); //FileReader
             alert(e.target.result); //base64 encoded image source */
            var tableBody = document.getElementById("message-table-body");
            var row = document.createElement("TR");
            row.setAttribute("class", "message-row");
            row.innerHTML =
                "<td class='col1'></td>"
                + "<td class='col2'><div class='username-right'>" + "ANDREWPENG" + "</div>"
                + "<img class='img-content-right' src='" + imgSrc + "'></td>"
                + "<td class='col3'><img class='ppic' src=" + 'questionmark.jpg' + "></td>";
            tableBody.appendChild(row);
        }
        reader.readAsDataURL(file);
    } else { alert("NOT A supported attachment") }
    input.value = "";

    return file;
}

function addIncomingAttachment(file) {
    var imgSrc = "";
    alert(file.name);
    var ext = file.name.split('.').pop().toLowerCase();
    if (ext == "png" || ext == "jpg") { //IMAGES.
        var reader = new FileReader();
        reader.onload = function (e) {
            imgSrc = e.target.result;
            /* alert(e); //ProgressEvent
             alert(e.target); //FileReader
             alert(e.target.result); //base64 encoded image source */
            var tableBody = document.getElementById("message-table-body");
            var row = document.createElement("TR");
            row.setAttribute("class", "message-row");
            row.innerHTML =
                "<td class='col1'><img class='ppic' src=" + 'questionmark.jpg' + "></td>"
                + "<td class='col2'><div class='username-left'>" + "idk" + "</div>"
                + "<img class='img-content-left' src='" + imgSrc + "'></td>"
                + "<td class='col3'></td>";
            tableBody.appendChild(row);
        }
        reader.readAsDataURL(file);
    } else { alert("NOT A supported attachment") }
}

function areDatesOnSameMinute(a, b) {
    if (a.getFullYear() == b.getFullYear())
        if (a.getMonth() == b.getMonth())
            if (a.getDate() == b.getDate()) //THE DAY OF MONTH
                if (a.getHours() == b.getHours())
                    if (a.getMinutes() == b.getMinutes()) {
                        return true;
                    }
    return false;
}

function setupEnter() {
    var input = document.getElementById("text-input");
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            //input.value += "<br>";
            //document.getElementById("send-button").click();
        }
    });
}