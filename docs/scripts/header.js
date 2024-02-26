function geekaHeader(path){
    var header = `
    <div class="header">
        <ol>
            <a href="index.html"><li>home</li></a>
            <a href="pages/aboutMe.html"><li>About Me</li></a>
            <a href="pages/projects.html"><li>My Projects</li></a>
            <a href="pages/graduationportfolio/portfolio.html"><li>Graduation Portfolio</li></a>
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
    let origin = getOrDefault(window.location.href.match(/(https?:\/\/[a-zA-Z0-9:]+?\/(docs\/)?)/)?.[0],"https://geekazodium.github.io/");
    document.body.innerHTML = geekaHeader(origin)+html;
});