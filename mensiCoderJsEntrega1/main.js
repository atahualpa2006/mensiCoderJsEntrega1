
// se crea funcion, se declaran variables y se inicializan
const comprarMercaderias = () => {
    let mercaderia = '';
    let cantidad = 0;
    let valor = 0;
    let totalCompra = 0;
    let seguirComprando = false;

    //Se validan datos ingresados y luego se realiza la compra por detalle y unidades 
    do {
        mercaderia = prompt ("¿Que desea comprar? Un teclado, monitor o mouse?", "Ej: mouse");
        cantidad = parseInt(prompt ("¿Cantidad a comprar?"));

        let cantidadValidada = validarCantidad(cantidad);

    switch (mercaderia) {
        case "teclado":
            valor = 3300;
            break;
        case "monitor":
            valor = 11800;
            break;
        case "mouse":
            valor = 1400;
            break;
        default:
            alert("Alguno de los datos ingresados son incorrectos");
            valor= 0;
            cantidad= 0;
    }

    totalCompra += valor * cantidadValidada;
    seguirComprando = confirm("¿Desea agregar otra mercaderia?");

    } while (seguirComprando)

    const totalConDescuento = aplicarDescuento(totalCompra);
    const totalConEnvio = calcularEnvio(totalConDescuento);

    return totalConEnvio;
}

// Se verifica que los datos sean correctos para ir sumando las unidades de mercaderia
const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('agregue un número por favor.')
        } else {
            alert('Debe agregar un número no debe ser cero.')
        }
        cantidad = parseInt(prompt ("¿Cuántos desea adquirir?"));
    }

    return cantidad;
};

// Se aplica un descuento en el envio de un 20% si supera valor de $10000
const aplicarDescuento = (totalCompra) => {
    let totalConDescuento = 0;

    if (totalCompra >= 10000) {
        totalConDescuento = totalCompra * 0.80;
        return totalConDescuento;
    } else {
        return totalCompra;
    }
}

// Se calcula en valor del envio y se verifica si es gratis cuando supera los $5000
const calcularEnvio = (totalCompra) => {
    let tieneEnvioADomicilio = false;

    tieneEnvioADomicilio = confirm("¿Le gustaria envío a domicilio?");

    if (tieneEnvioADomicilio && totalCompra >= 5000) {
      alert("Envio gratis!!! El total de la compra es $" + totalCompra);
    } else if (tieneEnvioADomicilio && totalCompra < 2000 && totalCompra !== 0) {
      totalCompra += 700;
      alert("El envío yiene un costo de $1000. El total de su compra es $" + totalCompra);
    } else {
      alert("El total de su compra es $" + totalCompra);
    }

    return totalCompra;
}

// Se realiza calculo de cuotas
function calcularCantidadDeCuotas() {
    let cuotas = 0;
    let tieneCuotas = false;

    tieneCuotas = confirm("¿Querés pagar en cuotas?");

    if(tieneCuotas) {
        cuotas = parseInt(prompt("¿En cuántas cuotas querés pagar?"));
        if (cuotas === 0){
            cuotas = 1;
        }else if (Number.isNaN(cuotas)){
            calcularCantidadDeCuotas();
        }
    }else {
        cuotas = 1;
    }

    return cuotas;
};

// Se calculan intereses segun cantidad de cuotas
function calcularIntereses (cuotas) {
    let tasa = 11.7;
    let sinIntereses = 0;
    let tasaTotal = 0;
    let interesesTotales = 0;

    if (cuotas === 1){
        return sinIntereses;
    }else{
        tasaTotal = tasa + cuotas * 20.2;
        interesesTotales = tasaTotal * cuotas;
        return interesesTotales;
    }
}

// Se crea funcion con los totales a abonar segun corresponda y se muestran al usuario
function calcularTotalAPagar (totalCompra, cuotas, intereses) {
    totalCompra = (totalCompra + intereses)
    let valorCuota = totalCompra / cuotas;
    alert ("El total a pagar es $"+totalCompra+" en "+cuotas+" cuotas de $"+valorCuota.toFixed(2));
}

const totalCompra = comprarMercaderias();

const cuotas = calcularCantidadDeCuotas();

const intereses = calcularIntereses(cuotas);


calcularTotalAPagar(totalCompra, cuotas, intereses);