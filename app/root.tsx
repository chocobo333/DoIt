import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="bg-primary text-primary-foreground py-4 px-6">
          <h1 className="text-3xl font-bold">Todo App</h1>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
