import { Todo } from "../models/Todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const AUTO_TAGS = process.env.NEXT_PUBLIC_AUTO_TAGS || "";
const TODO_JSON_FILE = process.env.TODO_JSON_FILE || "";
const LOCAL_STORAGE_KEY = 'todos';

export const getTodos = async () => {
    const url = `${API_URL}/todo/get`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const todos = await response.json();
            // データをローカルストレージに保存
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
            return todos;
        }
    } catch (error) {
        console.error(error);
    }
}

export const postTodos = async (todos: Todo[]) => {
    if (!todos) return;
    const url = `${API_URL}/todo/add`;
    const data = JSON.stringify(todos);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (response.ok) {
            // APIから返されたデータはないため、何も返さない

            // データをローカルストレージに保存
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        }
    } catch (error) {
        console.error(error);
    }
}

// ローカルストレージからTODOデータを取得
export const getLocalTodos = () => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
}