const aboutThis = [
    [
        ["index.html","Home"],
        ["pages/aboutMe.html","About Me"],
        ["pages/projects.html","My Projects"]
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
    var end = `<div class = "pageEnd"><b>`;
    aboutThis.forEach((column)=>{
        end = end + "<ol>";
        column.forEach((item)=>{
            end = end + "<a href=\""+ item[0] +"\"><li>" + item[1] + "</li></a>";
        });
        end = end + "</ol>";
    });
    end = end+`</b></div>`;
    var h;
    end.split('a href="').forEach(s => {
        if(h == undefined){
            h = s;
        }else{
            h = h.concat('a href="'+path,s);
        }
    });
    return h;
}

document.addEventListener("DOMContentLoaded",(event)=>{
    var html = document.body.innerHTML;
    var path = window.location.href.split("geekazodium.github.io/");
    var d = 1;
    if(!(path[0].includes("http://")||path[0].includes("https://"))){
        d = 2;
    }
    var back = path[1].split("/").length-d;
    document.body.innerHTML = html + geekaAbout("../".repeat(back));
});