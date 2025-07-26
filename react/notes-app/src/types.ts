export type Note = {
    id: string;
    title: string;
    priority: 'low' | 'medium' | 'high'
    category: 'work' | 'ideas' | 'personal'
    description: string;
}