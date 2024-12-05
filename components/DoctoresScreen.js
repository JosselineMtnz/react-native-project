import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const DoctoresScreen = () => {
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [doctores, setDoctores] = useState([]);
    const [editando, setEditando] = useState(false);
    const [doctorId, setDoctorId] = useState(null);

    // Leer todos los doctores al montar la pantalla
    useEffect(() => {
        obtenerDoctores();
    }, []);

    const obtenerDoctores = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'doctores'));
            const doctoresLista = [];
            querySnapshot.forEach((doc) => {
                doctoresLista.push({ ...doc.data(), id: doc.id });
            });
            setDoctores(doctoresLista);
        } catch (error) {
            console.error('Error al obtener doctores: ', error);
        }
    };

    const agregarDoctor = async () => {
        if (nombre === '' || especialidad === '') {
            Alert.alert('Error', 'Por favor ingresa el nombre y la especialidad del doctor');
            return;
        }

        try {
            await addDoc(collection(db, 'doctores'), { nombre, especialidad });
            Alert.alert('Doctor agregado', 'El doctor ha sido agregado con éxito');
            setNombre('');
            setEspecialidad('');
            obtenerDoctores(); // Actualizar lista
        } catch (error) {
            console.error('Error al agregar doctor: ', error);
        }
    };

    const eliminarDoctor = async (id) => {
        try {
            await deleteDoc(doc(db, 'doctores', id));
            Alert.alert('Doctor eliminado', 'El doctor ha sido eliminado con éxito');
            obtenerDoctores(); // Actualizar lista
        } catch (error) {
            console.error('Error al eliminar doctor: ', error);
        }
    };

    const editarDoctor = (doctor) => {
        setNombre(doctor.nombre);
        setEspecialidad(doctor.especialidad);
        setDoctorId(doctor.id);
        setEditando(true);
    };

    const actualizarDoctor = async () => {
        try {
            await updateDoc(doc(db, 'doctores', doctorId), { nombre, especialidad });
            Alert.alert('Doctor actualizado', 'El doctor ha sido actualizado con éxito');
            setNombre('');
            setEspecialidad('');
            setEditando(false);
            setDoctorId(null);
            obtenerDoctores(); // Actualizar lista
        } catch (error) {
            console.error('Error al actualizar doctor: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Doctores</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Doctor"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialidad"
                value={especialidad}
                onChangeText={setEspecialidad}
            />
            <Button
                title={editando ? "Actualizar Doctor" : "Agregar Doctor"}
                onPress={editando ? actualizarDoctor : agregarDoctor}
            />

            <FlatList
                data={doctores}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.doctor}>
                        <Text>{item.nombre} - Especialidad: {item.especialidad}</Text>
                        <Button title="Editar" onPress={() => editarDoctor(item)} />
                        <Button title="Eliminar" onPress={() => eliminarDoctor(item.id)} />
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
    doctor: {
        marginVertical: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});

export default DoctoresScreen;
