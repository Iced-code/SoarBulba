
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
    document.getElementById("toggleMode").addEventListener("click", toggleMode);
});
function toggleMode(){
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
}