import { Todo } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, MetaFunction } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ToDoCard } from "~/components/todocard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { globalPrisma } from "~/lib/prismaClient";

const prisma = globalPrisma;

export const meta: MetaFunction = () => {
  return [
    { title: "Do It" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const todos = await prisma.findAll();
  return typedjson(todos);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const body = formData.get("body");

  if (body) {
    prisma.create(body.toString());
  }

  return null;
}
export default function ToDos() {
  const todos: Todo[] = useTypedLoaderData<typeof loader>();
  return (
    <div className="flex-1 flex-col p-6  space-y-4 h-screen bg-background">
      <h1>ToDos</h1>
      <Form method="post" className="flex items-center space-x-2">
        <Input
          placeholder="Add a new todo..."
          name="body"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button size="sm" type="submit">
          Add
        </Button>
      </Form>
      <div className="space-y-1">
        {todos.map((todo: Todo) => {
          return <ToDoCard key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
}
