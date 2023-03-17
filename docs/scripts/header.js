function geekaHeader(){
    var header = `
    <div class="header">
        <ol>
            <a href="index.html"><li>home</li></a>
            <a href="index.html"><li>About Me</li></a>
            <a href="index.html"><li>My Projects</li></a>
        </ol>
    </div>
    `;
    return header;
}

document.addEventListener("DOMContentLoaded",(event)=>{
    var html = document.body.innerHTML;
    document.body.innerHTML = geekaHeader()+html;
});