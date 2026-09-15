export function create_header(path){
    var header = `
    <header>
        <ol>
            <a href="index.html"><li>home</li></a>
            <a href="pages/aboutMe.html"><li>About Me</li></a>
            <a href="pages/projects.html"><li>My Projects</li></a>
            <a href="pages/tools.html"><li>My Tools</li></a>
        </ol>
    </header>
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