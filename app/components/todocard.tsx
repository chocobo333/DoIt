import { ToDo } from "@prisma/client";
import { SVGProps } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Form } from "@remix-run/react";

interface ToDoCardProps {
  todo: ToDo;
}

export function ToDoCard({ todo }: ToDoCardProps) {
  const { id, body, deadline } = todo;

  return (
    <div className="flex items-center justify-between px-4 py-2 rounded-md bg-card text-card-foreground shadow">
      <div className="flex items-center space-x-2">
        <Checkbox id={`check_${id}`} />
        <label htmlFor={`check_${id}`} className="text-sm font-medium">
          {body}
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-muted-foreground">{`Due: ${deadline}`}</div>
        <Form method="post" action={`/todos/${id}/delete`}>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted/50"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </Form>
      </div>
    </div>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
