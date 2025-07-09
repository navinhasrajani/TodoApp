export const todoReducer = (state, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return action.payload;

        case "ADD_TODO":
            return [...state, action.payload];

        case "DELETE_TODO":
            return state.filter(todo => todo._id !== action.payload);

        case "UPDATE_TODO":
            return state.map(todo =>
                todo._id === action.payload._id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );

        case "TOGGLE_TODO":
            return state.map(todo =>
                todo._id === action.payload._id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );

        default:
            return state;
    }
};