"use strict";

const PROJECTS_LIST_CLASS_NAME = "projects";

function initProjectList(projects, class_name){
    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("attempting to load projects...");
        let e = findProjectsElement(class_name);
        if (e == null){
            return;
        }
        const parser = new DOMParser();
        for(let c in projects){
            let project = projects[c];
            console.log(project)

            let idString = "";
            if (project.id !== undefined){
                idString = `id=\"${project.id}\"`;
            }

            let briefString = "";
            if (project.brief !== undefined){
                briefString = `<p>${project.brief}</p>`;
            }


            const project_element = parser.parseFromString(`
            <a href="${project.href}" ${idString}>
                <li style='background-image: url("${project.image}"); 
  background-repeat: no-repeat; background-size: cover;
  background-position: center; '>
                    <div>
                        ${project.title}
                        ${briefString}
                    </div>
                </li>
            </a>`,
            "text/html").body.children[0];
            e.appendChild(project_element);
        }
    });
}

function findProjectsElement(override_name){
    if(override_name == null){
        return document.getElementById(PROJECTS_LIST_CLASS_NAME);
    }
    return document.getElementById(override_name);
}