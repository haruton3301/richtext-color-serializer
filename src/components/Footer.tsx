export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-800 text-amber-100 py-8 px-4 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {currentYear}{' '}
          <a
            href="https://github.com/haruton3301"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 underline"
          >
            haruton3301
          </a>
          . All rights reserved.
        </p>
        <p className="text-xs text-amber-300 mt-2">
          <a
            href="https://github.com/haruton3301/richtext-color-serializer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 underline"
          >
            View on GitHub
          </a>{' '}
          | Rich Text Color Serializer
        </p>
      </div>
    </footer>
  );
}