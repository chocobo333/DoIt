import { Todo } from "@prisma/client";
import { MetaFunction } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ToDoCard } from "~/components/todocard";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { globalPrisma } from "~/lib/prismaClient";
import TodoForm from "./todos.create";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useState } from "react";

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

export default function ToDos() {
  const todos: Todo[] = useTypedLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1 flex-col p-6  space-y-4 h-screen bg-background">
      <h1>ToDos</h1>
      <div className="space-y-1">
        {todos.map((todo: Todo) => {
          return <ToDoCard key={todo.id} todo={todo} />;
        })}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>New Todo</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>New Todo</SheetTitle>
          </SheetHeader>
          <div className="px-4 py-2">
            <TodoForm setOpen={setOpen} />
          </div>
          {/* <SheetFooter>
            <SheetClose asChild>
              <Button>Cancel</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
}
