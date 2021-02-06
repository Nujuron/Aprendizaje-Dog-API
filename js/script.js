/* eslint-disable no-undef */
var dogBtn = document.getElementsByTagName("button")[0];
dogBtn.style.display = "none";

const options = {
    method: "GET"
};
function deleteNodes(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
function createSelect(options) {
    let selectBreeds = document.createElement("select");
    for (var [key, value] of Object.entries(options)) {
        if (value.length >= 1) {
            value.forEach(element => {
                var option = document.createElement("option");
                option.text = element + " " + key;
                option.value = key + "/" + element;
                selectBreeds.add(option);
            });
        } else {
            var option = document.createElement("option");
            option.text = key;
            option.value = key;
            selectBreeds.add(option);
        }
    }
    deleteNodes(document.getElementById("radios").lastElementChild);
    document.getElementById("radios").lastElementChild.appendChild(selectBreeds);
}

//Fetch
async function getBreedsFetch() {
    var breeds = await fetch("https://dog.ceo/api/breeds/list/all", options)
        .then(response => response.text())
        .then(data => {
            const jsonBreeds = JSON.parse(data);
            return jsonBreeds.message;
        })
        .catch(error => {
            console.log(error);
        })
    createSelect(breeds);
}

async function showDogFetch() {
    var breed = document.getElementsByTagName("select")[0].value;
    var dogImgURL = await fetch("https://dog.ceo/api/breed/" + breed + "/images/random", options)
        .then(response => response.text())
        .then(data => {
            const jsonImg = JSON.parse(data);
            return jsonImg.message;
        })
        .catch(error => {
            console.log(error);
        })
    let img = document.getElementById("dogImg");
    img.src = dogImgURL;

}
//XML
async function getBreedsXML() {
    const client = new XMLHttpRequest();

    client.addEventListener("readystatechange", () => {
        if (client.readyState === 4 && client.status === 200)
            createSelect(JSON.parse(client.responseText).message);
    });

    client.open("GET", "https://dog.ceo/api/breeds/list/all");
    client.send();
}

async function showDogXML() {
    var breed = document.getElementsByTagName("select")[0].value;
    const client = new XMLHttpRequest();

    client.addEventListener("readystatechange", () => {
        if (client.readyState === 4 && client.status === 200) {
            let img = document.getElementById("dogImg");
            const jsonImg = JSON.parse(client.responseText);
            img.src = jsonImg.message;
        }

    });

    client.open("GET", "https://dog.ceo/api/breed/" + breed + "/images/random");
    client.send();
}

//Jquery
async function getBreedsJquery(){
    await $.get("https://dog.ceo/api/breeds/list/all", function (json){
        createSelect(json.message);
    });
}

async function showDogJquery(){
    var breed = document.getElementsByTagName("select")[0].value;
    await $.get("https://dog.ceo/api/breed/" + breed + "/images/random", function (json){
        let img = document.getElementById("dogImg");
        img.src = json.message;
    });
}

//Radio input change + eventlistener for btn
document.getElementById("fetch").addEventListener("change", function () {
    dogBtn.style.display = "inline-block";
    getBreedsFetch();
    dogBtn.removeEventListener("click",showDogXML);
    dogBtn.removeEventListener("click",showDogJquery);
    dogBtn.addEventListener("click", showDogFetch);
});
document.getElementById("xmlrequest").addEventListener("change", function () {
    dogBtn.style.display = "inline-block";
    getBreedsXML();
    dogBtn.removeEventListener("click",showDogFetch);
    dogBtn.removeEventListener("click",showDogJquery);
    dogBtn.addEventListener("click", showDogXML);
});
document.getElementById("jquery").addEventListener("change", function () {
    dogBtn.style.display = "inline-block";
    getBreedsJquery();
    dogBtn.removeEventListener("click",showDogFetch);
    dogBtn.removeEventListener("click",showDogXML);
    dogBtn.addEventListener("click", showDogJquery);
});



