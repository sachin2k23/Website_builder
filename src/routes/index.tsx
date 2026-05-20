import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX file from ported project
import App from "../App.jsx";

export const Route = createFileRoute("/")({
  component: App,
});
