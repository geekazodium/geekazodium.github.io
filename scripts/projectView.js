"use strict";

const PROJECTS_LIST_CLASS_NAME = "projects";

function initProjectList(projects){
    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("attempting to load projects...");
        let e = findProjectsElement();
        if (e == null){
            return;
        }
        const parser = new DOMParser();
        for(let c in projects){
            let project = projects[c];
            console.log(project)
            const project_element = parser.parseFromString(`
            <a href="${project.href}">
                <li style='background-image: url("${project.image}"); 
  background-repeat: no-repeat; background-size: cover;
  background-position: center; '>
                    <div>
                        ${project.title}
                    </div>
                </li>
            </a>`,
            "text/html").body.children[0];
            e.appendChild(project_element);
        }
    });
}

function findProjectsElement(){
    return document.getElementById(PROJECTS_LIST_CLASS_NAME);
}