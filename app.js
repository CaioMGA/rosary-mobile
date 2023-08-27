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

function UpdatePageTitle(weekDay, mysteryOfTheDay = false) {
    // gozosos = seg e sab
    // dolorosos = ter e sex
    // gloriosos = qua e dom
    // luminosos = qui

    if (mysteryOfTheDay) {
        document.getElementById("page-title").innerText = "Terço do Dia:";
    }

    switch (weekDay) {
        case 1: //seg
        case 6: //sab
            document.getElementById("page-title").innerText = mysteryOfTheDay ? "Terço do Dia: Mistérios Gozosos" : "Mistérios Gozosos";
            break;
        case 2: //ter
        case 5: //sex
            document.getElementById("page-title").innerText = mysteryOfTheDay ? "Terço do Dia: Mistérios Dolorosos" : "Mistérios Dolorosos";
            break;
        case 3: //qua
        case 0: //dom
            document.getElementById("page-title").innerText = mysteryOfTheDay ? "Terço do Dia: Mistérios Gloriosos" : "Mistérios Gloriosos";
            break;
        case 4: //qui
        default:
            document.getElementById("page-title").innerText = mysteryOfTheDay ? "Terço do Dia: Mistérios Luminosos" : "Mistérios Luminosos";
            break;
    }
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

function SelectMystery(weekDay) {
    console.log(weekDay);
    UpdatePageTitle(weekDay);
    var url = baseUrl + GetMysteryByWeekday(weekDay);
    document.getElementById('video-iframe').src = url;
    hideMenu();
}

function SelectMysteryOfTheDay() {
    const weekDay = new Date().getDay();
    console.log(weekDay);
    UpdatePageTitle(weekDay, true);
    var url = baseUrl + GetCurrentMysteryCode();
    document.getElementById('video-iframe').src = url;
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