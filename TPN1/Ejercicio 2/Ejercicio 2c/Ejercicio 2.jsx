import { useState } from "react";

function Encabezado({ usuario }) {
	return (
		<header>
			<h1>Ejemplo básico de React</h1>
			<p>Hola, {usuario}. Este componente reúne funciones principales del lenguaje.</p>
		</header>
	);
}

function Ejercicio2() {
	const [tareas, setTareas] = useState([
		{ id: 1, texto: "Aprender componentes", completada: true },
		{ id: 2, texto: "Practicar useState", completada: false }
	]);
	const [nuevaTarea, setNuevaTarea] = useState("");
	const [mostrarCompletadas, setMostrarCompletadas] = useState(true);

	function agregarTarea(evento) {
		evento.preventDefault();
		const texto = nuevaTarea.trim();

		if (!texto) {
			return;
		}

		setTareas([
			...tareas,
			{ id: Date.now(), texto, completada: false }
		]);
		setNuevaTarea("");
	}

	function cambiarEstado(id) {
		setTareas(
			tareas.map((tarea) =>
				tarea.id === id
					? { ...tarea, completada: !tarea.completada }
					: tarea
			)
		);
	}

	function eliminarTarea(id) {
		setTareas(tareas.filter((tarea) => tarea.id !== id));
	}

	const tareasVisibles = mostrarCompletadas
		? tareas
		: tareas.filter((tarea) => !tarea.completada);
	const cantidadCompletadas = tareas.filter((tarea) => tarea.completada).length;

	return (
		<main>
			<Encabezado usuario="estudiante" />

			<section>
				<h2>Lista de tareas</h2>
				<p>
					Completadas: {cantidadCompletadas} de {tareas.length}
				</p>

				<form onSubmit={agregarTarea}>
					<label htmlFor="nuevaTarea">Nueva tarea</label>
					<input
						id="nuevaTarea"
						type="text"
						value={nuevaTarea}
						onChange={(evento) => setNuevaTarea(evento.target.value)}
						placeholder="Escribí una tarea"
					/>
					<button type="submit">Agregar</button>
				</form>

				<label>
					<input
						type="checkbox"
						checked={mostrarCompletadas}
						onChange={(evento) => setMostrarCompletadas(evento.target.checked)}
					/>
					Mostrar tareas completadas
				</label>

				{tareasVisibles.length === 0 ? (
					<p>No hay tareas para mostrar.</p>
				) : (
					<ul>
						{tareasVisibles.map((tarea) => (
							<li key={tarea.id}>
								<span>{tarea.completada ? "✅" : "⬜"} {tarea.texto}</span>
								<button type="button" onClick={() => cambiarEstado(tarea.id)}>
									{tarea.completada ? "Desmarcar" : "Completar"}
								</button>
								<button type="button" onClick={() => eliminarTarea(tarea.id)}>
									Eliminar
								</button>
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}

export default Ejercicio2;
