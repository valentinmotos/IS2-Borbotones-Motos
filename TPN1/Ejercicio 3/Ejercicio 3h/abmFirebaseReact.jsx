import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

function App() {
  const [elementos, setElementos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  const coleccionRef = collection(db, "items");

  // 1. LEER / OBTENER DATOS (READ)
  const obtenerElementos = async () => {
    const data = await getDocs(coleccionRef);
    setElementos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    obtenerElementos();
  }, []);

  // 2. CREAR O EDITAR ELEMENTO (CREATE / UPDATE)
  const guardarElemento = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !categoria.trim()) return;

    if (idEditando === null) {
      // Alta (Create)
      await addDoc(coleccionRef, { nombre, categoria });
    } else {
      // Modificación (Update)
      const elementoDoc = doc(db, "items", idEditando);
      await updateDoc(elementoDoc, { nombre, categoria });
      setIdEditando(null);
    }

    setNombre('');
    setCategoria('');
    obtenerElementos();
  };

  // Preparar formulario para edición
  const seleccionarParaEditar = (item) => {
    setIdEditando(item.id);
    setNombre(item.nombre);
    setCategoria(item.categoria);
  };

  // 3. ELIMINAR ELEMENTO (DELETE / BAJA)
  const eliminarElemento = async (id) => {
    const elementoDoc = doc(db, "items", id);
    await deleteDoc(elementoDoc);
    obtenerElementos();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>ABM en React con Firebase (Firestore)</h2>

      {/* Formulario de Alta / Modificación */}
      <form onSubmit={guardarElemento} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="text" 
          placeholder="Categoría" 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)} 
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {idEditando ? 'Guardar Cambios' : 'Agregar'}
        </button>
      </form>

      {/* Lista de Registros */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {elementos.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.categoria}</td>
              <td>
                <button onClick={() => seleccionarParaEditar(item)} style={{ marginRight: '5px' }}>
                  Editar
                </button>
                <button onClick={() => eliminarElemento(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;