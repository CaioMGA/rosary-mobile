const baseUrl = "https://www.youtube.com/embed/";

const mysteries = {
    "joyful": "2BTDtzoidGc",
    "sorrowful": "B9P1_jDdYgk",
    "glorious": "uNsz-Frm2YI",
    "luminous": "qw8HVkFqWt8"
};

function LoadPage() {
    SelectMysteryOfTheDay();
}

function loadJson(jsonName, callback) {
    fetch('./descriptions/' + jsonName + '.json')
        .then((response) => response.json())
        .then((json) => callback(json));
}

function UpdatePageTitle(weekDay, mysteryOfTheDay = false) {
    // gozosos = seg e sab
    // dolorosos = ter e sex
    // gloriosos = qua e dom
    // luminosos = qui

    var titles = document.getElementsByClassName("page-title");
    var txt = "";

    switch (weekDay) {
        case 1: //seg
        case 6: //sab
            txt = mysteryOfTheDay ? "Terço do Dia: Mistérios Gozosos" : "Mistérios Gozosos";
            break;
        case 2: //ter
        case 5: //sex
            txt = mysteryOfTheDay ? "Terço do Dia: Mistérios Dolorosos" : "Mistérios Dolorosos";
            break;
        case 3: //qua
        case 0: //dom
            txt = mysteryOfTheDay ? "Terço do Dia: Mistérios Gloriosos" : "Mistérios Gloriosos";
            break;
        case 4: //qui
        default:
            txt = mysteryOfTheDay ? "Terço do Dia: Mistérios Luminosos" : "Mistérios Luminosos";
    }
    titles[0].innerText = txt;
    titles[1].innerText = txt;
}

function GetCurrentMysteryCode() {
    const weekDay = new Date().getDay();
    // gozosos = seg e sab
    // dolorosos = ter e sex
    // gloriosos = qua e dom
    // luminosos = qui

    return GetMysteryByWeekday(weekDay);
}

function GetMysteryByWeekday(weekDay) {
    switch (weekDay) {
        case 1: //seg
        case 6: //sab
            return mysteries.joyful;
        case 2: //ter 
        case 5: //sex
            return mysteries.sorrowful;
        case 3: //qua
        case 0: //dom
            return mysteries.glorious;
        case 4: //qui
        default:
            return mysteries.luminous;

    }
}

function GetMysteryDescriptionsByWeekday(weekDay) {
    switch (weekDay) {
        case 1: //seg
        case 6: //sab
            return loadJson("joyful-mysteries", UpdateDescriptions);
        case 2: //ter 
        case 5: //sex
            return loadJson("sorrowful-mysteries", UpdateDescriptions);
        case 3: //qua
        case 0: //dom
            return loadJson("glorious-mysteries", UpdateDescriptions);
        case 4: //qui
        default:
            return loadJson("luminous-mysteries", UpdateDescriptions);
    }
}

function SelectMystery(weekDay) {
    console.log(weekDay);
    UpdatePageTitle(weekDay);
    var url = baseUrl + GetMysteryByWeekday(weekDay);
    document.getElementsByClassName('video-iframe')[0].src = url;
    GetMysteryDescriptionsByWeekday(weekDay);
    hideMenu();
}

function SelectMysteryOfTheDay() {
    const weekDay = new Date().getDay();
    console.log(weekDay);
    UpdatePageTitle(weekDay, true);
    var url = baseUrl + GetCurrentMysteryCode();
    GetMysteryDescriptionsByWeekday(weekDay);
    document.getElementsByClassName('video-iframe')[0].src = url;
    hideMenu();
}

function showMenu() {
    var menu = document.getElementById("overlay-menu");
    menu.classList.remove("hidden");
}

function hideMenu() {
    var menu = document.getElementById("overlay-menu");
    menu.classList.add("hidden");
}

function openLink(url) {
    window.open(url, '_blank').focus();

}

function UpdateDescriptions(data) {
    console.log(data);
    var desc = document.getElementById("mysteries-descriptions");
    desc.innerHTML = "<h1>" + data.name + "</h1>";
    let i = 1;
    data.mysteries.forEach(m => {
        desc.innerHTML += '<p class="mystery-title">' + i + 'º ' + data.prefix + ': ' + m.title + '</p>';
        desc.innerHTML += "<p>" + m.description + "</p>";
        desc.innerHTML += "<br>"
        i++;
    });
    desc.innerHTML += "<a class='source' target='_blank' href='" + data.source + "'>Fonte</a>"
    desc.scrollTop = 0;

}