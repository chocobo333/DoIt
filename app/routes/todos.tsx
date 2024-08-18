import { ToDo } from "@prisma/client";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ToDoCard } from "~/components/todocard";
import { globalPrisma } from "~/lib/prismaClient";

const prisma = globalPrisma;

export async function loader() {
  const todos = await prisma.findAll();
  return typedjson(todos);
}

export default function ToDos() {
  const todos: ToDo[] = useTypedLoaderData<typeof loader>();
  return (
    <div>
      <h1>ToDos</h1>
      <div>
        <ToDoCard todo={todos[0]} />
        <ToDoCard todo={todos[1]} />
        <ToDoCard todo={todos[2]} />
      </div>
    </div>
  );
}
