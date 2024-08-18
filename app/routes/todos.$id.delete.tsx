import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { redirect } from "remix-typedjson";
import { globalPrisma } from "~/lib/prismaClient";

const prisma = globalPrisma;

export async function action({ params }: ActionFunctionArgs) {
  if (params.id) await prisma.delete(parseInt(params.id));
  return redirect("/todos");
}
