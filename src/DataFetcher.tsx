import { createRoot, type Root } from "react-dom/client";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

interface DataFetcherProps {
  url: string;
  baseURL?: string;
}

const DataFetcherComponent = ({ url, baseURL }: DataFetcherProps) => {
  const api = axios.create(baseURL ? { baseURL } : undefined);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchData", url],
    queryFn: async () => {
      const response = await api.get(url);

      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

const queryClient = new QueryClient();

const DataFetcherWithProvider = (props: DataFetcherProps) => (
  <QueryClientProvider client={queryClient}>
    <DataFetcherComponent {...props} />
  </QueryClientProvider>
);

class DataFetcherElement extends HTMLElement {
  private root: Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static observedAttributes = ["url", "base-url"];

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

    const url = this.getAttribute("url");
    const baseURL = this.getAttribute("base-url");

    if (!url) {
      this.mountPoint.innerHTML = "<div>No URL provided</div>";
      return;
    }

    this.root.render(
      <DataFetcherWithProvider url={url} baseURL={baseURL || undefined} />,
    );
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
      "react-data-fetcher": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url?: string;
        baseURL?: string;
      };
    }
  }
}

if (!customElements.get("react-data-fetcher")) {
  customElements.define("react-data-fetcher", DataFetcherElement);
}
