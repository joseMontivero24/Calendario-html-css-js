
const fechaActual = document.querySelector('.fecha-actual');
const diasTag = document.querySelector('.dias');
const iconsCambiar = document.querySelectorAll('.icons span');
const btnCambiarModo = document.querySelector('#btn-cambiar-modo');
const body = document.querySelector('body');
let modoOscuro = false;
// obteniendo nuevo año, mes y fecha actual
let fecha = new Date();
let yearActual = fecha.getFullYear();
let mesActual = fecha.getMonth();


btnCambiarModo.addEventListener('click', () =>{// para el dark mode
    modoOscuro = !modoOscuro;// cambio la variable a true

    if (modoOscuro) {
        body.classList.add('dark-mode');

    }else{
        body.classList.remove('dark-mode');
    }
    
});




// nombres de los meses del arrays
const nombreMeses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const rederCalendar = () =>{

    let primerDiaMes = new Date(yearActual, mesActual, 1).getDay();// obtener el primer dia del mes
    let ultimaFechaMes = new Date(yearActual, mesActual + 1, 0).getDate();// obtener la última fecha del mes
    let ultimoDiaMes = new Date(yearActual, mesActual, ultimaFechaMes).getDay();// obtener el último día del mes
    let ultimoDiaMesAnte = new Date(yearActual, mesActual, 0).getDate(); //obtener la última fecha del mes anterior
    let liTag = "";

    for (let i = primerDiaMes; i > 0; i--) {
        liTag += `<li class="inactive">${ultimoDiaMesAnte - i + 1}</li>`;
        
    }

    for (let i = 1; i <= ultimaFechaMes; i++) {
        let isToday = i === fecha.getDate() && mesActual === new Date().getMonth()
            && yearActual === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
        
    }

    for (let i = ultimoDiaMes; i < 6; i++) {
        
        liTag += `<li class="inactive">${i - ultimoDiaMes + 1}</li>`;
    }

    fechaActual.innerText = `${nombreMeses[mesActual]} ${yearActual}`;
    diasTag.innerHTML = liTag;
}
rederCalendar();

iconsCambiar.forEach(icon =>{// obtener iconos anterior y siguiente
    icon.addEventListener("click", () =>{// agregando evento de click en ambos íconos para que cambien a siguiente o anterior
        
        // si el icono en el que se hizo clic es el icono anterior, disminuya el mes actual en 1; de lo contrario, increméntelo en 1
        mesActual = icon.id === "prev" ? mesActual - 1 : mesActual + 1;

        if (mesActual < 0 || mesActual > 11) {
            fecha = new Date(yearActual, mesActual);
            yearActual = fecha.getFullYear();
            mesActual = fecha.getMonth();
        }else{
            fecha = new Date();
        }

        rederCalendar();
        
    });
});