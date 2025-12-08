window.addEventListener("DOMContentLoaded",event=>{
    contentLoaded = true;
    setTimeout(()=>{
        tooLate = true;
        if(clickedTimes>6){
            easterEgg();
        }
    },2000);
});

window.addEventListener("mousedown",event=>{
    if(contentLoaded && !tooLate){
        clickedTimes++;
    }
});

var tooLate = false;
var contentLoaded = false;
var clickedTimes = 0;
var triggered = false;

function easterEgg(htmlElement){
    if(htmlElement == undefined){
        const content = document.body;
        easterEgg(content);
        return;
    }
    htmlElement.childNodes.forEach(node=>{
        easterEgg(node);
    });
    if(htmlElement instanceof Text){
        htmlElement.textContent = convertToFurrySpeak(htmlElement.textContent);
    }
}

function convertToFurrySpeak(string){
    return string
    .replaceAll("ll","ww")
    .replaceAll("ra","wa")
    .replaceAll("rr","ww")
    .replaceAll("."," uwu")
    .replaceAll(" o"," owo")
    .replaceAll("ie","wie");
}