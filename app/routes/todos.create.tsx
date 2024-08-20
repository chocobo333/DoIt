import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { redirect, typedjson } from "remix-typedjson";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { SheetClose } from "~/components/ui/sheet";
import { globalPrisma } from "~/lib/prismaClient";

const prisma = globalPrisma;

const RoutePath = "/todos/create";
const ActionTodoCreate = typeof action;

const schema = z.object({
  body: z.string(),
  // deadline: z.date(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });
  const body = formData.get("body");

  if (submission.status !== "success") {
    return typedjson({
      lastResult: submission.reply(),
    });
  }

  if (body) {
    prisma.create(body.toString());
  }

  return redirect("/todos");
}

interface TodoFormProps {
  setOpen?: any;
}
export default function TodoForm({ setOpen }: TodoFormProps) {
  const lastResult = useActionData<typeof action>();
  console.log(lastResult);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
  });
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Form
      method="post"
      id={form.id}
      onSubmit={(event) => {
        if (setOpen) {
          setOpen(false);
        }
        form.onSubmit(event);
      }}
      className="flex items-center space-x-2"
      action={RoutePath}
    >
      <div className="flex-1">
        <Input
          placeholder="Add a new todo..."
          name="body"
          type=""
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <div>{fields.body.errors}</div>
      </div>
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      /> */}
      {/* <SheetClose asChild> */}
      <Button size="sm" type="submit">
        Add
      </Button>
      {/* </SheetClose> */}
    </Form>
  );
}
