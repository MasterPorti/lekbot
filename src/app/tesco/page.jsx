import { createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export default async function Page() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const data = await supabase.from("Posts").select("*");
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
