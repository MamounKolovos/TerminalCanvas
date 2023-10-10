const vec2 = require("./vec2");
const vec3 = require("./vec3");

function vec(...components){
    if (components.length == 2){
        return new vec2(components[0], components[1]);
    }else if (components.length == 3){
        return new vec3(components[0], components[1], components[2]);
    }else{
        throw new Error("vec: Invalid Number Of Components");
    }
}

module.exports = vec