import "../styles/globals.css";
import Layout from "../components/Layout";
import { populateKV } from "../modules/general";

export default function MyApp({ Component, pageProps }: any) {
  if (
    !process.env.NEXT_PUBLIC_NO_API &&
    process.env.NEXT_PUBLIC_HOST?.includes("localhost")
  )
    populateKV().catch((err) => console.log(err));

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
