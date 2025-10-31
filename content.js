
document.querySelectorAll(".sectionButton").forEach(button => {
    button.addEventListener("click", async () => {
        let sectionId = button.value;
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tab.url && tab.url.includes("https://bulbapedia.bulbagarden.net/wiki/") && tab.url.endsWith("_(Pok%C3%A9mon)")) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: scrollToSection,
                args: [sectionId]
            });
        } else {
            alert("This is not a Pokemon Bulbapedia page.");
        }
    });
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("https://bulbapedia.bulbagarden.net/wiki/") && tab.url.endsWith("_(Pok%C3%A9mon)")) {
        chrome.action.setBadgeText({ text: "ON", tabId});
        chrome.action.setBadgeBackgroundColor({ color: "#4CAF50", tabId});
    } else {
        alert("This is not a Pokemon Bulbapedia page.");
    }
})

function scrollToSection(sectionName) {
    const section = document.querySelector(`#${sectionName}`);

    
    if(sectionName === "START"){
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if(section){
        section.scrollIntoView({ behavior: "smooth" });
    }
    else {
        alert("Error. Please try redownloading.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    /* let webTheme = JSON.parse(localStorage.getItem("theme")) || [];
    alert(webTheme);

    if(webTheme[0] === "light"){
        document.body.classList = [];
        document.body.classList.add("light");
    }
    else if(webTheme[0] === "dark"){
        document.body.classList = [];
        document.body.classList.add("dark");
    } */

    document.getElementById("toggleMode").addEventListener("click", toggleMode);

    

    //let lastChannels = JSON.parse(localStorage.getItem('lastWatchedChannels')) || [];
});
function toggleMode(){
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");

    /* let theme = document.body.classList;
    localStorage.setItem("theme", theme); */
}