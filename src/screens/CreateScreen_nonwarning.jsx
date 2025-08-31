import { FlatList, Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'

const CreateScreen = ({ data, setData }) => {

    const [item, setItem] = useState('')
    const [stock, setStock] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editItemId, setEditItemId] = useState(null)

    const addItemHandler = () => {
        const newItem = {
            id: Date.now(),
            name: item,
            stock: stock,
            unit: "kg"
        }
        setData([...data, newItem])
        setItem("")
        setStock("")
        Keyboard.dismiss()  // Dismiss the keyboard after submitting
    }

    const deleteItemHandler = (id) => {
        return () => {
            setData(data.filter((item) => item.id !== id))
        }
    }

    const editItemHandler = (item) => {
        return () => {
            setIsEdit(true)
            setItem(item.name)
            setStock(item.stock.toString())
            setEditItemId(item.id)
        }
    }

    const updateItemHandler = () => {
        setData(data.map((item) =>
            item.id === editItemId ? { ...item, name: item.name, stock: stock } : item
        ));
        setItem("")
        setStock("")
        setIsEdit(false)
        Keyboard.dismiss()  // Dismiss the keyboard after updating
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.container}>
                {/* Input Fields */}
                <TextInput
                    style={styles.input}
                    placeholder="Item Name"
                    placeholderTextColor="#666"
                    value={item}
                    onChangeText={(text) => setItem(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Stock"
                    placeholderTextColor="#666"
                    value={stock}
                    onChangeText={(text) => setStock(text)}
                    keyboardType="numeric"
                />
                <Pressable style={styles.button} onPress={isEdit ? updateItemHandler : addItemHandler}>
                    <Text style={styles.addButton}>
                        {isEdit ? 'Update Item' : 'Add Item'}
                    </Text>
                </Pressable>

                {/* FlatList for the Items */}
                <View style={styles.itemsList}>
                    <Text style={styles.headingText}>All Items in Stock</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#ff5a5f" : "#a4ac86" }]}>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemStock}>{item.stock} {item.unit}</Text>
                                </View>
                                <View style={styles.itemActions}>
                                    <Pressable onPress={editItemHandler(item)} style={styles.actionButton}>
                                        <Text style={styles.actionText}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={deleteItemHandler(item.id)} style={styles.actionButton}>
                                        <Text style={styles.actionText}>Delete</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{ gap: 10 }}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default CreateScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: "4%",
        paddingHorizontal: 15,
        backgroundColor: "#f7f7f7",
        gap: 15,
    },
    input: {
        height: 50,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: "#4c956c",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    addButton: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    headingText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 10,
    },
    itemsList: {
        flex: 1, // Allow this part to grow and take remaining space
        marginTop: 15,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 3, // Adds shadow for Android
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        elevation: 3, // Adds shadow for Android
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
    itemStock: {
        fontSize: 16,
        color: "#555",
    },
    itemActions: {
        flexDirection: "row",
        gap: 10,
    },
    actionButton: {
        backgroundColor: "#a68a64",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    actionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
})
