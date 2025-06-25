import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" class="dark">
      <Head />
      <body>
        <div class="bg-white text-black dark:text-white dark:bg-gray-700">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
