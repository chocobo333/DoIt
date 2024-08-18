import { ToDo } from "@prisma/client";

interface ToDoCardProps {
  todo: ToDo;
}
export function ToDoCard({ todo }: ToDoCardProps) {
  const { body } = todo;
  return <div>{body}</div>;
}
