import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/business")({
  component: BusinessPage,
});

function BusinessPage() {
  return (
    <div>
      <h1>List Your Business</h1>
      <p>Welcome to TheDehradun.com Business Listing</p>
    </div>
  );
}
