const formulario = document.getElementById("formularioRegistro");
const formularioInicio = document.getElementById("formularioInicio");
const mensajeResultado = document.getElementById("mensajeResultado");
const pestanaRegistro = document.getElementById("pestanaRegistro");
const pestanaInicio = document.getElementById("pestanaInicio");
const usuarioGuardado = "usuarioRegistrado";

function mostrarError(id, mensaje) {
	document.getElementById(id).textContent = mensaje;
}

function limpiarErrores() {
	document.querySelectorAll(".error").forEach((elemento) => {
		elemento.textContent = "";
	});
	mensajeResultado.textContent = "";
	mensajeResultado.className = "mensaje";
}

function mostrarFormulario(formularioActivo) {
	const esRegistro = formularioActivo === formulario;
	formulario.classList.toggle("oculto", !esRegistro);
	formularioInicio.classList.toggle("oculto", esRegistro);
	pestanaRegistro.classList.toggle("activa", esRegistro);
	pestanaInicio.classList.toggle("activa", !esRegistro);
	pestanaRegistro.setAttribute("aria-selected", esRegistro);
	pestanaInicio.setAttribute("aria-selected", !esRegistro);
	document.getElementById("tituloFormulario").textContent = esRegistro ? "Crear una cuenta" : "Bienvenido nuevamente";
	document.getElementById("descripcionFormulario").textContent = esRegistro ? "Completá tus datos para registrarte." : "Ingresá tus datos para iniciar sesión.";
	limpiarErrores();
}

function validarEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

formulario.addEventListener("submit", (evento) => {
	evento.preventDefault();
	limpiarErrores();

	const nombre = document.getElementById("nombre").value.trim();
	const email = document.getElementById("emailRegistro").value.trim();
	const password = document.getElementById("passwordRegistro").value;
	const confirmarPassword = document.getElementById("confirmarPassword").value;
	const aceptaTerminos = document.getElementById("aceptaTerminos").checked;
	let formularioValido = true;

	if (nombre.length < 3) {
		mostrarError("errorNombre", "Ingresá tu nombre completo.");
		formularioValido = false;
	}

	if (!validarEmail(email)) {
		mostrarError("errorEmailRegistro", "Ingresá un correo electrónico válido.");
		formularioValido = false;
	}

	if (password.length < 6) {
		mostrarError("errorPasswordRegistro", "La contraseña debe tener al menos 6 caracteres.");
		formularioValido = false;
	}

	if (password !== confirmarPassword) {
		mostrarError("errorConfirmarPassword", "Las contraseñas no coinciden.");
		formularioValido = false;
	}

	if (!aceptaTerminos) {
		mostrarError("errorTerminos", "Debés aceptar los términos y condiciones.");
		formularioValido = false;
	}

	if (formularioValido) {
		localStorage.setItem(usuarioGuardado, JSON.stringify({ email, password }));
		mensajeResultado.textContent = "¡Registro completado correctamente!";
		mensajeResultado.className = "mensaje exito";
		formulario.reset();
	}
});

formularioInicio.addEventListener("submit", (evento) => {
	evento.preventDefault();
	limpiarErrores();

	const email = document.getElementById("emailInicio").value.trim();
	const password = document.getElementById("passwordInicio").value;
	const usuario = JSON.parse(localStorage.getItem(usuarioGuardado));
	let formularioValido = true;

	if (!validarEmail(email)) {
		mostrarError("errorEmailInicio", "Ingresá un correo electrónico válido.");
		formularioValido = false;
	}

	if (!password) {
		mostrarError("errorPasswordInicio", "Ingresá tu contraseña.");
		formularioValido = false;
	}

	if (formularioValido && (!usuario || usuario.email !== email || usuario.password !== password)) {
		mensajeResultado.textContent = "El correo o la contraseña son incorrectos.";
		mensajeResultado.className = "mensaje errorSesion";
		return;
	}

	if (formularioValido) {
		mensajeResultado.textContent = "¡Inicio de sesión exitoso!";
		mensajeResultado.className = "mensaje exito";
		formularioInicio.reset();
	}
});

pestanaRegistro.addEventListener("click", () => mostrarFormulario(formulario));
pestanaInicio.addEventListener("click", () => mostrarFormulario(formularioInicio));
