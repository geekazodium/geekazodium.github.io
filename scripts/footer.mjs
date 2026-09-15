const page_footer_links = [
    [
        ["index.html","Home"],
        ["pages/aboutMe.html","About Me"],
        ["pages/projects.html","My Projects"]
    ],
    [
        ["pages/tools.html", "Tools I've Made"],
        ["redirects/itch.html","My Itch.io"],
        ["pages/graphicsPortfolio.html", "Technical Art Portfolio"]
    ],
    [
        ["pages/contacts.html","Contact Me"]
    ],
    [
    ],
    [
    ]
];

export function create_footer(path){
    var end = `<footer><b>`;
    page_footer_links.forEach((column)=>{
        end = end + "<ol>";
        column.forEach((item)=>{
            end = end + "<a href=\""+ item[0] +"\"><li>" + item[1] + "</li></a>";
        });
        end = end + "</ol>";
    });
    end = end+`</b></footer>`;
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
