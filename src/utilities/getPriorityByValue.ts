import { todoPriorities } from "../constants/todo";

export const getPriorityByValue = (priorityValue: number) =>
    todoPriorities.find((priority) => priority.value === priorityValue);
