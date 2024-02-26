document.addEventListener("DOMContentLoaded",()=>{
    const viewport = document.getElementById("window3d");
    /** @type {WebGL2RenderingContext} */
    const gl = getDrawContext(viewport);
    
    function getDrawContext(canvas){
        let errors = [];
        try{
            return canvas.getContext("webgl2");
        }catch(e){
            console.log("device does not support webgl 2");
            errors.push(e);
        }
        // try{
        //     return canvas.getContext("webgl");
        // }catch(e){
        //     console.log("okay cool, this doesn't even support webgl1, what are you using? a browser from 1942?");
        //     errors.push(e);
        // }
        console.log(errors);
        // throw new Error("DEVICE DOESN'T SUPPORT WEBGL, PLEASE GET HELP.");
    }
    
    const windowVerticies = [
        -1,-1,
        1,-1,
        -1,1,
    
        1,1,
        -1,1,
        1,-1,
    ];
    
    const windowsVertexShaderSrc = `#version 300 es
    precision mediump float;

    uniform mat4 transformMatricies;
    uniform mat4 projectionMatricies;
    in vec2 initialPosition;
    
    void main(){
        gl_Position = projectionMatricies*transformMatricies*vec4(initialPosition,0.0,1.0);
    }
    
    `;

    const windowsFragmentShaderSrc = `#version 300 es
    precision mediump float;
    
    out vec4 outputColor;

    void main(){
        outputColor = vec4(1.0,1.0,1.0,1.0);
    }
    `
    
    const windowsVertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(windowsVertexShader,windowsVertexShaderSrc);
    compileShader(gl,windowsVertexShader);

    const windowsFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(windowsFragmentShader,windowsFragmentShaderSrc);
    compileShader(gl,windowsFragmentShader);

    const windowsShaderProgram = linkProgram(gl,windowsVertexShader,windowsFragmentShader)
    
    function drawStencilWindow(transform,rotation,projection){
        gl.depthMask(false);
        gl.enable(gl.DEPTH_TEST);

        gl.useProgram(windowsShaderProgram);
        



        gl.depthMask(true);
    }

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);

});


function compileShader(gl,shader){
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!'+ gl.getShaderInfoLog(shader));
        return;
    }
}
/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLShader} vertex 
 * @param {WebGLShader} fragment 
 * @returns 
 */
function linkProgram(gl,vertex,fragment){
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!' + gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!' + gl.getProgramInfoLog(program));
        return;
    }
    return program;
}
/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program 
 * @param {String} name 
 */
function getAttributeLocation(gl,program,name){
    let attributeLocation = gl.getAttribLocation(program,name);
    if(attributeLocation===null){
        console.error("Failed to get attribute location for "+name);
    }
    return attributeLocation;
}
/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program 
 * @param {String} name 
 */
function getUniformLocation(gl,program,name){
    let uniformLocation = gl.getUniformLocation(program,name);
    if(uniformLocation===null){
        console.error("Failed to get uniform location for "+name);
    }
    return uniformLocation;
}

class ShaderProgram{
    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {*} vertexSrc 
     * @param {*} fragmentSrc 
     */
    constructor(gl,vertexSrc,fragmentSrc){
        if(!(gl instanceof WebGL2RenderingContext))throw new Error("invald argument 0 gl should be type: WebGl2RenderingContext");
        this.gl = gl;
        this.vertexShader = this.compile(vertexSrc,gl.VERTEX_SHADER);
        this.fragmentShader = this.compile(fragmentSrc,gl.FRAGMENT_SHADER);
        this.program = this.linkProgram(this.vertexShader,this.fragmentShader);
    }
    compile(src,type){
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader,src);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling shader!'+ this.gl.getShaderInfoLog(shader));
            return;
        }
        return shader;
    }
    /**
     * 
     * @param {WebGL2RenderingContext} this.gl 
     * @param {WebGLShader} vertex 
     * @param {WebGLShader} fragment 
     * @returns 
     */
    linkProgram(vertex,fragment){
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vertex);
        this.gl.attachShader(program, fragment);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('ERROR linking program!' + this.gl.getProgramInfoLog(program));
            return;
        }
        this.gl.validateProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!' + this.gl.getProgramInfoLog(program));
            return;
        }
        return program;
    }
    /**
     * 
     * @param {WebGL2RenderingContext} this.gl 
     * @param {WebGLProgram} program 
     * @param {String} name 
     */
    getAttributeLocation(name){
        let attributeLocation = this.gl.getAttribLocation(this.program,name);
        if(attributeLocation===null){
            console.error("Failed to get attribute location for "+name);
        }
        return attributeLocation;
    }
    /**
     * 
     * @param {WebGL2RenderingContext} this.gl 
     * @param {WebGLProgram} program 
     * @param {String} name 
     */
    getUniformLocation(name){
        let uniformLocation = this.gl.getUniformLocation(this.program,name);
        if(uniformLocation===null){
            console.error("Failed to get uniform location for "+name);
        }
        return uniformLocation;
    }
    use(){
        this.gl.useProgram(this.program);
    }
}