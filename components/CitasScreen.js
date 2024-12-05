import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
  
  const CitasScreen = () => {
    const [paciente, setPaciente] = useState('');
    const [doctor, setDoctor] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar la visibilidad del calendario
    const [citas, setCitas] = useState([]);
    const [editando, setEditando] = useState(false);
    const [citaId, setCitaId] = useState(null);
  
    // Leer todas las citas al montar la pantalla
    useEffect(() => {
      obtenerCitas();
    }, []);
  
    const obtenerCitas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'citas'));
        const citasLista = [];
        querySnapshot.forEach((doc) => {
          citasLista.push({ ...doc.data(), id: doc.id });
        });
        setCitas(citasLista);
      } catch (error) {
        console.error('Error al obtener citas: ', error);
      }
    };
  
    const agregarCita = async () => {
      if (paciente === '' || doctor === '') {
        Alert.alert('Error', 'Por favor ingresa el paciente y el doctor');
        return;
      }
  
      try {
        await addDoc(collection(db, 'citas'), { paciente, doctor, fecha: fecha.toDateString() });
        Alert.alert('Cita agregada', 'La cita ha sido agregada con éxito');
        setPaciente('');
        setDoctor('');
        setFecha(new Date());
        obtenerCitas(); // Actualizar lista
      } catch (error) {
        console.error('Error al agregar cita: ', error);
      }
    };
  
    const eliminarCita = async (id) => {
      try {
        await deleteDoc(doc(db, 'citas', id));
        Alert.alert('Cita eliminada', 'La cita ha sido eliminada con éxito');
        obtenerCitas(); // Actualizar lista
      } catch (error) {
        console.error('Error al eliminar cita: ', error);
      }
    };
  
    const editarCita = (cita) => {
      setPaciente(cita.paciente);
      setDoctor(cita.doctor);
      setFecha(new Date(cita.fecha)); // Convertir la fecha de nuevo a formato Date
      setCitaId(cita.id);
      setEditando(true);
    };
  
    const actualizarCita = async () => {
      try {
        await updateDoc(doc(db, 'citas', citaId), { paciente, doctor, fecha: fecha.toDateString() });
        Alert.alert('Cita actualizada', 'La cita ha sido actualizada con éxito');
        setPaciente('');
        setDoctor('');
        setFecha(new Date());
        setEditando(false);
        setCitaId(null);
        obtenerCitas(); // Actualizar lista
      } catch (error) {
        console.error('Error al actualizar cita: ', error);
      }
    };
  
    const mostrarDatePicker = () => {
      setMostrarCalendario(true);
    };
  
    const onFechaSeleccionada = (event, selectedDate) => {
      if (selectedDate) {
        setFecha(selectedDate);
      }
      setMostrarCalendario(false); // Ocultar el DateTimePicker después de seleccionar una fecha
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Citas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Paciente"
          value={paciente}
          onChangeText={setPaciente}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Doctor"
          value={doctor}
          onChangeText={setDoctor}
        />
        
        {/* Botón para mostrar el calendario */}
        <Button title="Seleccionar Fecha" onPress={mostrarDatePicker} />
        <Text>Fecha seleccionada: {fecha.toDateString()}</Text>
  
        {/* Mostrar DateTimePicker solo si se activa con el botón */}
        {mostrarCalendario && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={onFechaSeleccionada}
          />
        )}
  
        <Button
          title={editando ? "Actualizar Cita" : "Agregar Cita"}
          onPress={editando ? actualizarCita : agregarCita}
        />
  
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cita}>
              <Text>{item.paciente} - {item.doctor} - {item.fecha}</Text>
              <Button title="Editar" onPress={() => editarCita(item)} />
              <Button title="Eliminar" onPress={() => eliminarCita(item.id)} />
            </View>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 10,
      width: '100%',
    },
    cita: {
      marginVertical: 10,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
    },
  });
  
  export default CitasScreen;
  
