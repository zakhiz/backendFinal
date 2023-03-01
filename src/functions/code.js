let numeros = "0123456789";
let letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
let simbolos = ".?%·&'´çÇ:_[{}]><!&/)=¡¿";
let all = numeros + letras + simbolos;
//! recibe una longitud desde el dto de añadir productos
export const codeAlt = (long)=>{
    let password = "";  
    for(let i = 0 ; i<long; i++){
        let aleatorio = Math.floor(Math.random()* all.length);
        password += all.charAt(aleatorio);  
    }
    return password
}