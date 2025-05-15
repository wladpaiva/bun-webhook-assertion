import { test, expect } from "bun:test";
import { server } from "./index";

test("This works", async () => {
  expect.hasAssertions();

  const ws = new WebSocket(`ws://localhost:${server.port}`);
  ws.addEventListener("open", () => {
    ws.send("test");
  });

  await new Promise((resolve) => {
    ws.addEventListener("message", (event: MessageEvent) => {
      expect(event.data).toBe("You said: test");
      ws.close();
      resolve(undefined);
    });
  });
});

test("This doesn't work", async () => {
  expect.hasAssertions();

  const ws = new WebSocket(`ws://localhost:${server.port}`);
  ws.addEventListener("open", () => {
    ws.send("test");
  });

  ws.addEventListener("message", (event: MessageEvent) => {
    expect(event.data).toBe("You said: test");
    ws.close();
  });
});
