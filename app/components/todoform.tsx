import { Form, FormProps } from "@remix-run/react";
import { RefAttributes } from "react";
import { JSX } from "react/jsx-runtime";
import { z } from "zod";

export function TodoForm(
  form: JSX.IntrinsicAttributes & FormProps & RefAttributes<HTMLFormElement>
) {
  return <Form {...form}></Form>;
}
