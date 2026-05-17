import { createRoot, type Root } from "react-dom/client";

const Greeting = ({ name }: { name: string }) => <p>Hello, {name}!</p>;

class GreetingElement extends HTMLElement {
  private root: Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static observedAttributes = ["name"];

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.mountPoint);
    this.root = createRoot(this.mountPoint);
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    if (!this.root || !this.mountPoint) return;

    const name = this.getAttribute("name") || "World";
    this.root.render(<Greeting name={name} />);
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
    this.mountPoint = null;
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "react-greeting": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
      };
    }
  }
}

if (!customElements.get("react-greeting")) {
  customElements.define("react-greeting", GreetingElement);
}
