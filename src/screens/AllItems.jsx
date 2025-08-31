import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AllItems = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#ff5a5f" : "#a4ac86" }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemStock}>{item.stock} {item.unit}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default AllItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#f7f7f7",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ddd',
  },
  headingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
    paddingLeft: 30,

  },
  itemStock: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
    textAlign: "right",
    paddingRight: 30,
  },
  listContainer: {
    paddingBottom: 20,
  },
})
