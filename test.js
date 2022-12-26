
function fetchUser() {
    var url = 'https://jsonplaceholder.typicode.com/users/1'
    return fetch(url).then(function(response) {
      return response.json();
    });
  }
  
  function fetchTodo() {
    var url = 'https://jsonplaceholder.typicode.com/todos/1';
    return fetch(url).then(function(response) {
      return response.json();
    });
  }


fetchUser();
fetchTodo();