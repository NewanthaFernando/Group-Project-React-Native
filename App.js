import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';  // Ensure Colors.js exists
import tempData from './tempData'; // Ensure tempData.js exists
import TodoList from './components/TodoList'; // Ensure TodoList.js exists
import AddListModal from './components/AddListModal'; // Ensure AddListModal.js exists

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists:tempData,
  };

  toggleAddTodoModal = () => {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  };

  renderlist = list =>{
    return <TodoList list = {list} updateList={this.updateList}/>
  };

  addList = list => {
    this.setState({lists:[...this.state.lists, {...list,id:this.state.lists.length +1, todos:[]}]});
  };

  updateList = list =>{
    this.setState({
      lists:this.state.lists.map(item =>{
        return item.id === list.id ? list : item
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal 
            closeModal={() => this.toggleAddTodoModal()} 
            addList = {this.addList}
             
          />
        </Modal>
        
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity 
            style={styles.addList} 
            onPress={this.toggleAddTodoModal}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList 
            data={this.state.lists}  
            keyExtractor={item => item.name} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            renderItem={({ item }) =>this.renderlist(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  }
});
