export interface Todo {
    _id?: string;
    description: string;
    priority: number;
    hashtags: string[];
    done: boolean;
    duration: number;
}
