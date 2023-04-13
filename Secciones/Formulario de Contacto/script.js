const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const summary = document.querySelector("#summary");


function avanzarAsistente(){
  // recopilar datos del primer paso
  let nombre = document.querySelector("#nombre").value;
  let apellido = document.querySelector("#apellido").value;
  let tel = document.querySelector("#tel").value;
  let usuario = document.querySelector("#email").value;
  let contra = document.querySelector("#pass").value;
  
  // mostrar resumen en el segundo paso
  summary.innerHTML = `Nombre: ${nombre}<br>Apellido: ${apellido}<br>Telefono: ${tel}<br>Usuario: ${usuario}<br> Contraseña: ${contra}<br>`;
  
  // ocultar el primer paso y mostrar el segundo paso
  step1.style.display = "none";
  step2.style.display = "block";
}

function validarFormulario(){
  const form = document.querySelector('#step-1');
  if (form.checkValidity()) {
		avanzarAsistente();
  } else {
		return false;
  }
}