function geekaHeader(path){
    var header = `
    <div class="header">
        <ol>
            <a href="index.html"><li>home</li></a>
            <a href="pages/aboutMe.html"><li>About Me</li></a>
            <a href="pages/projects.html"><li>My Projects</li></a>
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
    let html = document.body.innerHTML;
    document.body.innerHTML = geekaHeader(window.origin+"/")+html;
});