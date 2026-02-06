import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen plasma-bg">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
