
import Link from "next/link";

export default function NotFound() {
  return (
     <div className="flex flex-col items-center justify-center h-80 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        Sorry, the page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
