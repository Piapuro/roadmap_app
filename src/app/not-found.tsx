import Link from "next/link";
import { ErrorMessage } from "@/client/components/common/ErrorMessage";

export default function NotFound() {
  return (
    <ErrorMessage
      code={404}
      action={
        <Link
          href="/"
          className="rounded-md bg-foreground px-4 py-2 text-sm text-background hover:bg-foreground/80"
        >
          トップへ戻る
        </Link>
      }
    />
  );
}
