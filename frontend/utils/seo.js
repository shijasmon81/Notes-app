import Head from "next/head";

export default function SEO({ title, description, keywords, image, url }) {
  return (
    <Head>
      <title>{title || "Notes App"}</title>
      <meta name="description" content={description || "Manage your notes efficiently"} />
      <meta name="keywords" content={keywords || "notes, productivity, todo, task"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title || "Notes App"} />
      <meta property="og:description" content={description || "Manage your notes efficiently"} />
      <meta property="og:image" content={image || "/favicon.ico"} />
      <meta property="og:url" content={url || "http://localhost:3000"} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Notes App"} />
      <meta name="twitter:description" content={description || "Manage your notes efficiently"} />
      <meta name="twitter:image" content={image || "/favicon.ico"} />
      
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
