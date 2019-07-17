<template>
  <div id="app">
    <form>
      <label>
        New Todo:
        <input v-model="newTodo" type="text"/>
        <button type="submit" @click.prevent="addTodo()">Add</button>
      </label>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <label v-if="currentlyEditing !== todo.id">
            <input 
              type="checkbox" 
              v-model="todo.completed" 
              @change="updateTodo(todo)">
              {{todo.text}}
          </label>
        <div v-if="currentlyEditing !== todo.id">
          <button
            @click="editTodo(todo)">
            <img src="./assets/pencil.png" alt="Edit todo">
            </button>
          <button
            @click="deleteTodo(todo)">
            <img src="./assets/trash.png" alt="Delete todo">
          </button>
        </div>
        <form v-else>
            <label>
              Edit:
              <input type="text" v-model="todoEditText">
            </label>
            <button 
              type="submit" 
              @click.prevent="updateTodoText()">
              Save
            </button>
          </form>
      </li>
    </ul>
  </div>
</template>

<script>
import { todosCollection } from './firebase';
export default {
  name: 'app',
  data () {
    return {
      newTodo: '',
      todos: [],
      currentlyEditing: null,
      todoEditText: ''
    }
  },
  firestore() {
    return {
      todos: todosCollection.orderBy('createdAt', 'desc')
    }
  },
  methods: {
    addTodo() {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        createdAt: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.newTodo = '';
    },

    updateTodo(todo) {
      todosCollection.doc(todo.id).update({...todo})
      .then(function(docRef) {
        console.log("Updated document with ID: ", todo.id);
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
    },

    deleteTodo(todo) {
      todosCollection.doc(todo.id).delete();
    },

    editTodo(todo) {
      this.currentlyEditing = todo.id
      this.todoEditText = todo.text
    },
    updateTodoText() {
      todosCollection.doc(this.currentlyEditing).update({
        text: this.todoEditText
      })
      .then(function(docRef) {
        console.log("Updated document text with ID: ", todo.id);
      })
      .catch(function(error) {
        console.error("Error updating document text: ", error);
      });
      this.currentlyEditing = null;
      this.todoEditText = '';
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
