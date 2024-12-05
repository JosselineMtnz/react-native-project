import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; 

const PacientesScreen = () => {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [editando, setEditando] = useState(false);
    const [pacienteId, setPacienteId] = useState(null);

    // Leer todos los pacientes al montar la pantalla
    useEffect(() => {
        obtenerPacientes();
    }, []);

    const obtenerPacientes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'pacientes'));
            const pacientesLista = [];
            querySnapshot.forEach((doc) => {
                pacientesLista.push({ ...doc.data(), id: doc.id });
            });
            setPacientes(pacientesLista);
        } catch (error) {
            console.error('Error al obtener pacientes: ', error);
        }
    };

    const agregarPaciente = async () => {
        if (nombre === '' || edad === '') {
            Alert.alert('Error', 'Por favor ingresa el nombre y la edad');
            return;
        }

        try {
            await addDoc(collection(db, 'pacientes'), { nombre, edad });
            Alert.alert('Paciente agregado', 'El paciente ha sido agregado con éxito');
            setNombre('');
            setEdad('');
            obtenerPacientes(); // Actualizar lista
        } catch (error) {
            console.error('Error al agregar paciente: ', error);
        }
    };

    const eliminarPaciente = async (id) => {
        try {
            await deleteDoc(doc(db, 'pacientes', id));
            Alert.alert('Paciente eliminado', 'El paciente ha sido eliminado con éxito');
            obtenerPacientes(); // Actualizar lista
        } catch (error) {
            console.error('Error al eliminar paciente: ', error);
        }
    };

    const editarPaciente = (paciente) => {
        setNombre(paciente.nombre);
        setEdad(paciente.edad);
        setPacienteId(paciente.id);
        setEditando(true);
    };

    const actualizarPaciente = async () => {
        try {
            await updateDoc(doc(db, 'pacientes', pacienteId), { nombre, edad });
            Alert.alert('Paciente actualizado', 'El paciente ha sido actualizado con éxito');
            setNombre('');
            setEdad('');
            setEditando(false);
            setPacienteId(null);
            obtenerPacientes(); // Actualizar lista
        } catch (error) {
            console.error('Error al actualizar paciente: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Pacientes</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Paciente"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                keyboardType="numeric"
                onChangeText={setEdad}
            />
            <Button
                title={editando ? "Actualizar Paciente" : "Agregar Paciente"}
                onPress={editando ? actualizarPaciente : agregarPaciente}
            />

            <FlatList
                data={pacientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.paciente}>
                        <Text>{item.nombre} - {item.edad} años</Text>
                        <Button title="Editar" onPress={() => editarPaciente(item)} />
                        <Button title="Eliminar" onPress={() => eliminarPaciente(item.id)} />
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
    paciente: {
        marginVertical: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});

export default PacientesScreen;
