import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import colors from '../Colors';

export default class TodoModal extends React.Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;
    list.todos.push({ title: this.state.newTodo, completed: false });

    this.props.updateList(list);
    this.setState({ newTodo: "" });

    Keyboard.dismiss();
  };

  renderTodo = ({ item, index }) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Fontisto
            name={item.completed ? 'checkbox-active' : 'checkbox-passive'}
            size={24}
            color={item.completed ? colors.black : colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text style={[styles.todo, { textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? colors.gray : colors.black }]}>
          {item.title}
        </Text>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>

          <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={this.renderTodo}
              keyExtractor={item => item.title}
              ItemSeparatorComponent={this.renderSeparator}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={text => this.setState({ newTodo: text })}
              value={this.state.newTodo}
              placeholder="Add a task"
            />
            <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} 
                              onPress={() => this.addTodo()}>
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 64,
    right: 32,
    zIndex: 10,
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  addTodo: {
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    fontWeight: "700",
    fontSize: 16,
  },
  separator: {
    height: 8, // Adjust the height for the gap
  },
});
