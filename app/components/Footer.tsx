export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto border-t border-t-neutral-200 mt-16">
      <div className="px-4 sm:px-8 lg:px-12 py-6">
        <span className="text-neutral-500 text-xs">
          Copyright &copy; {new Date().getFullYear()} Better Wallpapers. All
          Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
