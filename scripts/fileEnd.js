const aboutThis = [
    [
        ["index.html","Home"],
        ["pages/aboutMe.html","About Me"],
        ["pages/projects.html","My Projects"]
    ],
    [
        ["pages/tools.html", "Tools I've Made"],
        ["redirects/itch.html","My Itch.io"],
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
    let html = document.body.innerHTML;
    document.body.innerHTML = html + geekaAbout(window.origin+"/");
});