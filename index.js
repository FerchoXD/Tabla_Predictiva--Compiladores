const tablaAnalisisPredictivo = {
  R: { mientras: ["mientras", "C"] },
  C: { "(": ["(", "E", "O", ")"] },
  E: { "[a-z]": ["V", "OP", "V"] },
  V: { "[a-z]": ["L", "RE"] },
  RE: { "[a-z]": ["L", "RE"] },
  L: { "[a-z]": ["[a-z]"] },
  OP: { operadores : [ "operadores" ] },
  O: { opciones : [ "opciones" ]  },
};

class Pila {
    constructor() {
        this.elementos = []; // Almacena los elementos de la pila
    }

    // Añade un elemento al final de la pila
    push(elemento) {
        this.elementos.push(elemento);
    }

    // Remueve y devuelve el último elemento de la pila
    pop() {
        if (this.estaVacia()) {
            throw new Error("La pila está vacía");
        }
        return this.elementos.pop();
    }

    // Devuelve el último elemento de la pila sin removerlo
    peek() {
        if (this.estaVacia()) {
            throw new Error("La pila está vacía");
        }
        return this.elementos[this.elementos.length - 1];
    }

    // Verifica si la pila está vacía
    estaVacia() {
        return this.elementos.length === 0;
    }

    // Devuelve el tamaño de la pila
    tamaño() {
        return this.elementos.length;
    }

    // Imprime los elementos de la pila
    imprimir() {
        console.log(this.elementos);
    }

    copiaUltimoElemento() {
        return this.peek();
    }
}
// Terminales y no terminales del lenguaje
const terminales = ['mientras', '(', ')', 'operadores', "[a-z]", "opciones"];
const noTerminales = ['R', 'C', 'E', 'V', 'RE', 'L', 'OP', 'O', 'LO'];

// Función que separa la entrada en tokens
function separarEntrada(entrada) {
    const patron = /\(|\)|===|!=|==|<=|>=|<|>|[a-z]+/gi;
    return entrada.match(patron);
}

function parser(){
    let pila =  new Pila();
    // Obtiene el valor del elemento HTML con id 'string', lo separa en tokens y los almacena en la variable tokens
   const tokens = separarEntrada(document.getElementById('string').value);
    console.log(tokens);
     // Inicializa la pila con un símbolo de final de pila '$' y el estado inicial 'R'
    pila.push('$');
    pila.push('R')
    // Inicializa el índice de posición de los tokens a 0
    let pos = 0;

    //mientras el símbolo en la cima de la pila no sea '$'
    do {
        // Obtiene el símbolo en la cima de la pila
        X = pila.copiaUltimoElemento();
        // Si el símbolo en la cima de la pila es un terminal
        if(terminales.includes(X)){
            // Si el símbolo en la cima de la pila es igual al token actual
            if(X == tokens[pos]){
                pila.pop();
                pos++;
            }else{
                console.log("Objeto no esperado");
                // Comprobaciones especiales para diferentes tipos de terminales como caracteres, operadores y opciones
                if(X == "[a-z]"){
                    if (/^[a-z]+$/.test(tokens[pos])) {
                        pila.pop();
                        pila.pop()
                        pos++;
                    }else{
                        console.log("Objeto no esperado");
                        break;
                    }
                } else if(X == "operadores") {
                    if(tokens[pos] == '==='){
                        break;
                    }
                    if(/^(<|>|==|!=|<=|>=)$/.test(tokens[pos])){
                        pila.pop();
                        pos++;
                    }else{
                        console.log("Objeto no esperado");
                        break;
                    }
                } else if(X == "opciones"){
                    if(/^(or|and)$/.test(tokens[pos])){
                        console.log("Paso la regex");
                        pila.pop();
                        pos++;
                        pila.push("E")
                    }else{
                        pila.pop();
                        console.log("Objeto no esperado in 90");
                    }
                } else {
                    console.log("Error en 98");
                    console.log(tokens[pos]);
                    pila.imprimir()
                    break;
                }
            }
            console.log(pila)
        // Si el símbolo en la cima de la pila es un no terminal
        }else if(noTerminales.includes(X)){
            // Obtiene el valor de la tabla de análisis predictivo para el símbolo en la cima de la pila y el token actual
            M = Object.values(tablaAnalisisPredictivo[X]);
            pila.pop()
            M[0] = M[0].slice().reverse();
            M[0].forEach(element => pila.push(element));
        // se alcanzó el final de la pila
        }else if(X == "$"){
            console.log("Se termino la pila")
            console.log(pila)
        }else{
            console.log("Error");
            console.log(pila)
            break;
        }
    }while(X != '$');
    pila.pop();
    // Si la pila está vacía y no hay más tokens por leer, la cadena es válida
    let result;
    if(pila.estaVacia() && tokens[pos] === undefined){
        result = "La cadena es valida";
        console.log(result)
    }else{
        result = "La cadena no es valida";
        console.log(result)
    }
    document.getElementById("areaTexto").textContent = result;
}