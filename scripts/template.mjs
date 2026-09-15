import {create_header} from "./header.mjs";
import {create_footer} from "./footer.mjs";

document.addEventListener("DOMContentLoaded",(_)=>{
    let html = document.body.innerHTML;
    document.body.innerHTML = 
        create_header(window.origin+"/") + 
        html + 
        create_footer(window.origin+"/");
});