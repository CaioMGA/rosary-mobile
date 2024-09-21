const baseUrl = "https://www.youtube.com/embed/";
var selectedMystery = -1;
var mysteryOfTheDay = -1;

const mysteries_data = [
    {"name":"Mistérios Gozosos"},
    {"name":"Mistérios Dolorosos"},
    {"name":"Mistérios Gloriosos"},
    {"name":"Mistérios Luminosos"},

]

function LoadPage() {
    mysteryOfTheDay = GetCurrentDayMysteryIndex();
    updateMysteryOfTheDayButton();
}

function selectMystery(mysteryIndex){
    selectedMystery = mysteryIndex;
    updateMysteryContent(mysteryIndex);
    hidePreSelection();
    showMysteryContent();
}


function selectMysteryOfTheDay() {
    selectMystery(mysteryOfTheDay);
}

function updateMysteryContent(mysteryIndex, isMysteryOfTheDay = false) {
    const txt = mysteries_data[mysteryIndex].name;

    document.querySelector("#header_mistery_name").innerText = txt;

    if(isMysteryOfTheDay){
        document.querySelector(".daily_set>span").innerText = `(${txt})`;
    }
}

function updateMysteryOfTheDayButton(){
    const txt = mysteries_data[mysteryOfTheDay].name;
    document.querySelector(".daily_set>span").innerText = `(${txt})`;
}

function GetCurrentDayMysteryIndex() {
    const weekDay = new Date().getDay();
    // gozosos = seg e sab
    // dolorosos = ter e sex
    // gloriosos = qua e dom
    // luminosos = qui

    return GetMysteryIndexByWeekday(weekDay);
}

function GetMysteryIndexByWeekday(weekDay) {
    switch (weekDay) {
        case 1: //seg
        case 6: //sab
            return 0;
        case 2: //ter 
        case 5: //sex
            return 1;
        case 3: //qua
        case 0: //dom
            return 2;
        case 4: //qui
        default:
            return 3;

    }
}

function hidePreSelection(){
    console.log("hide pre-selection");
    document.querySelector("header").classList.remove("hidden");
    document.querySelector(".pre-selection").classList.add("hidden");
}

function showMysteryContent(){
    console.log("show mystery content");
    document.querySelector(".mystery-content").classList.remove("hidden");
}