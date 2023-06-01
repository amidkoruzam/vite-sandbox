import { PageProps } from "./index.page.server";

export function Page(pageProps: PageProps) {
  return (
    <div>
      <pre>{JSON.stringify(pageProps.products, null, 4)}</pre>
    </div>
  );
}
