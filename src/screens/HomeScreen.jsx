import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AllItems from './AllItems'
import CreateScreen from './CreateScreen'


const HomeScreen = () => {
    const [view, setview] = useState(0)
    const [data, setData] = useState([
        { id: 1, name: "Item 1", stock: 10, unit: "kg" },
        { id: 2, name: "Item 2", stock: 20, unit: "kg" },
        { id: 3, name: "Item 3", stock: 5, unit: "kg" },
        { id: 4, name: "Item 4", stock: 40, unit: "kg" },
        { id: 5, name: "Item 5", stock: 8, unit: "kg" },
    ])
 
    return (
        <View style={styles.container}>
            <Text style={styles.title} >Dashboard</Text>

            <View style={styles.ButtonContainer}>
                <Pressable style={[styles.button, view === 0 ? { backgroundColor: "#4c956c" } : 0]} onPress={() => setview(0)}>
                    <Text style={[styles.btnText, view === 0 ? { color: "white" } : null]}>All Items</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 1 ? { backgroundColor: "#4c956c" } : 0]} onPress={() => setview(1)}>
                    <Text style={[styles.btnText, view === 1 ? { color: "white" } : null]}>Low Stock</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 2 ? { backgroundColor: "#4c956c" } : 0]} onPress={() => setview(2)}>
                    <Text style={[styles.btnText, view === 2 ? { color: "white" } : null]}>Create</Text>
                </Pressable>
            </View>
            {view === 0 && <AllItems data={data} />}
            {view === 1 && <AllItems data={data.filter((item)=>item.stock<20)} />}
            {view === 2 && <CreateScreen data={data} setData={setData}/>}

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: "4%",
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "333",
    },
    ButtonContainer: {
        flexDirection: "row",
        gap: 10,
        marginVertical: "10",
    },
    button: {
        paddingVertical: 3.5,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderColor: "#4c956c",
        borderWidth: 0.8,
    },
    btnText: {
        color: "green",
        fontSize: 12,
    },
})