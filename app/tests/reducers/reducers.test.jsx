var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Dog'
      };
      var response = reducers.searchTextReducer(df(''), df(action));

      expect(response).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var response = reducers.showCompletedReducer(df(false), df(action));

      expect(response).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abd234',
          text: 'Something to do',
          completed: false,
          createdAt: 1234
        }
      };
      var response = reducers.todosReducer(df(new Array), df(action));

      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(action.todo);
    });

    it('should update todo', () => {
      var todos = [{
        id: '123',
        text: 'something',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }];
      var updates = {
        completed: false,
        completedAt: null
      };
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };
      var response = reducers.todosReducer(df(todos), df(action));

      expect(response[0].completed).toEqual(updates.completed);
      expect(response[0].completedAt).toEqual(updates.completedAt);
      expect(response[0].text).toEqual(todos[0].text);
    });

    it('should add existing todos', () => {
      var todos = [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];
      var action = {
        type: 'ADD_TODOS',
        todos
      };
      var response = reducers.todosReducer(df([]), df(action));

      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(todos[0]);
    });

    it('should wipe todos on LOGOUT', () => {
      var todos = [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];
      var action = {
        type: 'LOGOUT'
      };
      var response = reducers.todosReducer(df(todos), df(action));

      expect(response.length).toEqual(0);
    });
  });

  describe('authReducer', () => {
    it('should store uid on LOGIN', () => {
      const action = {
        type: 'LOGIN',
        uid: '123abc'
      };
      const res = reducers.authReducer(undefined, df(action));

      expect(res).toEqual({
        uid: action.uid
      });
    });

    it('should wipe auth on LOGOUT', () => {
      const authData = {
        uid: '123abc'
      };
      const action = {
        type: 'LOGOUT'
      };
      const res = reducers.authReducer(df(authData), df(action));

      expect(res).toEqual({});
    });

  });
});