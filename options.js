document.querySelectorAll(".colorButton").forEach(button => {
    button.addEventListener("click", async () => {
        let color = button.value;
        localStorage.setItem("button_color", color);

        document.getElementById("main").classList = [color];
    });
})


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
});
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