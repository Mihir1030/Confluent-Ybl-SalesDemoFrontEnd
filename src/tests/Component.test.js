import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import uuid from "react-uuid";

import Carousel from "../components/CarouselComponent";
import Heading from "../components/HeadingComponent";
import DataGrid from "../components/GridComponent";
import Button from "../components/Button";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders", () => {
  act(() => {
    render(<Carousel />, container);
  });
  expect(container.textContent).toBe(
    "Fund Transfer APITransfer funds from your coorporate accountGet Status APIGet payment status in one clickPreviousNext"
  );
});

it("renders heading", () => {
  act(() => {
    render(<Heading title="" headingStyle="maintitle" />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(
      <Heading title="API Banking Services" headingStyle="maintitle" />,
      container
    );
  });
  expect(container.textContent).toBe("API Banking Services");
});

it("renders button", () => {
  act(() => {
    render(
      <Button
        text="test"
        buttonClick={() => {}}
        popoverContent={<p>content</p>}
      />,
      container
    );
  });
  expect(container.textContent).toBe("test");
});

it("renders datagrid", () => {
  act(() => {
    render(
      <DataGrid
        tableHeadingList={[<th key={uuid()}>number</th>]}
        tableRows={[
          <tr key={uuid()}>
            <td>1</td>
          </tr>,
        ]}
      />,
      container
    );
  });
  expect(container.textContent).toBe("number1");
});
