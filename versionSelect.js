const newestVersion = "v2";

function showSiteVersion(version){
    window.location.href = `/${version}`;
    localStorage.setItem('siteVersion', version);
}

function showNewestVersion(){
    showSiteVersion(newestVersion);
}

function solveVersion(){
    console.log("Loading version");
    const version = localStorage.getItem('siteVersion');
    if(version == null){
        showNewestVersion();
        return;
    }

    showSiteVersion(version);
}