function geekaHeader(path){
    var header = `
    <div class="header">
        <ol>
            <a href="index.html"><li>home</li></a>
            <a href="pages/project.html"><li>About Me</li></a>
            <a href="pages/project.html"><li>My Projects</li></a>
        </ol>
    </div>
    `;
    var h;
    header.split('a href="').forEach(s => {
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
    document.body.innerHTML = geekaHeader("../".repeat(back))+html;
});