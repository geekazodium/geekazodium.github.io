const aboutThis = [
    [
        ["index.html","Home"],
        ["pages/aboutMe.html","About Me"],
        ["pages/projects.html","My Projects"],
        ["pages/graduationPortfolio/portfolio.html","Graduation Portfolio"]
    ],
    [
        ["pages/underConstruction.html","Under Construction"],
    ],
    [
        ["pages/contacts.html","Contact Me"]
    ],
    [
    ],
    [
    ]
];

function geekaAbout(path){
    let end = `<div class = "pageEnd"><b>`;
    aboutThis.forEach((column)=>{
        end = end + "<ol>";
        column.forEach((item)=>{
            end = end + "<a href=\""+ path + item[0] +"\"><li>" + item[1] + "</li></a>";
        });
        end = end + "</ol>";
    });
    end = end+`</b></div>`;
    return end;
}

document.addEventListener("DOMContentLoaded",(event)=>{
    let html = document.body.innerHTML;
    let origin = getOrDefault(window.location.href.match(/(https?:\/\/[a-zA-Z0-9:]+?\/(docs\/)?)/)?.[0],"https://geekazodium.github.io/");
    document.body.innerHTML = html + geekaAbout(origin);
});

function getOrDefault(nullable,_default){
    return (nullable === undefined||nullable === null)?_default:nullable;
}