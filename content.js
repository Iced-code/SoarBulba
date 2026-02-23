document.addEventListener("DOMContentLoaded", () => {
    let webTheme = localStorage.getItem("theme") || "light";
    document.body.classList = [webTheme];

    if(webTheme === "dark"){
        document.getElementById("toggleMode").innerHTML = "&#x1F319;";
    }
    else {
        document.getElementById("toggleMode").innerHTML = "&#128161;";
    }

    let buttonColor = localStorage.getItem("button_color") || "green";
    document.getElementById("main").classList = [buttonColor];
    
    document.getElementById("toggleMode").addEventListener("click", toggleMode);

    document.getElementById("options").addEventListener("click", editOptions);
});

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

document.querySelectorAll(".colorButton").forEach(button => {
    button.addEventListener("click", async () => {
        let color = button.value;
        localStorage.setItem("button_color", color);

        document.getElementById("main").classList = [color];
    });
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

function toggleMode(){
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");

    let theme = "";
    if(document.body.classList.contains("light")){
        document.getElementById("toggleMode").innerHTML = "&#128161;";
        theme = "light";
    }
    else {
        document.getElementById("toggleMode").innerHTML = "&#x1F319;";
        theme = "dark";
    }

    localStorage.setItem("theme", theme);
}

function editOptions(){
    document.getElementById("colorSelect").classList.toggle("option-mode");
}