import { Urls } from './enums';
import './index.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <nav className="sticky top-0 z-50 w-full border-b px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href={Urls.Home}>
            <h1>State Affairs</h1>
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="container mx-auto">{children}</div>
      </main>

      <footer className="border-t px-4 py-6">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} State Affiars. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
