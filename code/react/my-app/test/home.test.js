import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import Home from "../src/pages/home";

global.IS_REACT_ACT_ENVIRONMENT = true

let root = null;
let container = null;
beforeEach(() => {
    // 创建一个 DOM 元素作为渲染目标
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container)
});

afterEach(() => {
    // 退出时进行清理
    // root.unmount(container);
    container.remove();
    container = null;
});

it("渲染有或无名称", () => {
    act(() => {
        root.render(<Home />);
    });
    expect(container.textContent).toBe("Home");

    // 保存快照
    expect(
        pretty(container.innerHTML)).
        toMatchInlineSnapshot(`
"<div>
  <h1>Home</h1>
</div>"
`);
});