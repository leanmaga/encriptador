function encryptDecrypt(shift) {
    //Recoger texto del campo textarea
    let input = document.getElementById('input').value;
    let output = "";
    for( let i=0; i<input.length; i++ ){
        let c = input.charCodeAt(i);
        if( c >= 65 && c <= 90 ){
            output += String.fromCharCode( (c - 65 + shift ) % 26 + 65 );
        }else if ( c >= 97 && c <= 122){
            output += String.fromCharCode( (c - 97 + shift ) % 26 + 97 );
        }else if ( c >= 128 && c <= 255){
            output += String.fromCharCode( (c - 128 + shift ) % 128 + 128);
        }else if ( c === 32 ) {
            output += " ";
        }else if ((c >= 32 && c <= 47) || (c >= 58 && c <= 64) || (c >= 91 && c <= 96) || (c >= 123 && c <= 126) || (c >= 48 && c <= 57) || (c === 44) || (c === 46) || (c === 59) || (c === 63) || (c === 33) || (c === 34) || (c === 39) || (c === 45) || (c === 95)){
            output += String.fromCharCode(c);
        }else {
            output += String.charAt(i);
        }
    }
    //Actualizar el contenido del elemento div
    document.getElementById("output").innerHTML = output;
}



function encrypt() {
    encryptDecrypt(7);
}

function decrypt(){
    document.getElementById("output").innerHTML = "";
    let input = document.getElementById('input').value;
    let output = "";
    input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    for (let i = 0; i < input.length; i++) {
        let c = input.charCodeAt(i);
        if( c >= 65 && c <= 90 ){
            output += String.fromCharCode( (c - 65  - 7 + 26) % 26 + 65 );
        }else if ( c >= 97 && c <= 122){
            output += String.fromCharCode( (c - 97 - 7 + 26) % 26 + 97 );
        }else if ( c >= 128 && c <= 255){
            output += String.fromCharCode( (c - 128 - 7 + 128) % 128 + 128);
        }else if ( c === 32 ) {
            output += " ";
        }else if ((c >= 32 && c <= 47) || (c >= 58 && c <= 64) || (c >= 91 && c <= 96) || (c >= 123 && c <= 126) || (c >= 48 && c <= 57) || (c === 44) || (c === 46) || (c === 59) || (c === 63) || (c === 33) || (c === 34) || (c === 39) || (c === 45) || (c === 95)){
            output += String.fromCharCode(c);
        }else {
            output += String.charAt(i);
        }
    }
    document.getElementById("output").innerHTML = output;
    document.getElementById("input").value = output;

}


document.getElementById("input").addEventListener("keyup", encrypt);

document.getElementById("encryptBtn").addEventListener("click", function(){
    resetOutput();
    encrypt();
});
document.getElementById("decryptBtn").addEventListener("click", function(){
    resetOutput();
    decrypt();
});

function copyEncrypted() {
    var text = document.getElementById("output").innerHTML;
    navigator.clipboard.writeText(text).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
}

function pasteEncrypted() {
    navigator.clipboard.readText().then(function(text) {
        document.getElementById("input").value = text;
    }).catch(function(err) {
        console.error('Failed to paste text: ', err);
    });
}

function resetText() {
    document.getElementById("input").value = "";
    document.getElementById("output").innerHTML = "";
}

function resetOutput(){
    document.getElementById("output").innerHTML = "";
}
