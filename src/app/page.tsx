import Image from "next/image";
import Link from "next/link";
import MemoriesLayout from './components/MemoriesLayout';

export default function Home() {

  return (
    <div>
      <main className="black-text center-text">
        <Image src="/img/logo.png" alt="logo boda" width={200} height={200} className="mt-50" />
        <h1 className="f-size-30 mt-20">YAMILLY & JUAN CARLOS</h1>
        <div className="flex align-center f-size-30 justify-content gap-15 mt-20">
          <p>Oct</p>
          <hr />
          <p>19</p>
          <hr />
          <p>2024</p>
        </div>
        <MemoriesLayout />
        <Link href='/upload' className="p-10 ph-40 bg-white black-text f-size-14" style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          marginTop: "50px",
          position: "fixed",
          bottom: "20px",
        }}>
          <h2>Agregar momento</h2>
        </Link>
      </main>
      <footer className="center-text p-10 mt-50">
        <p>Powered by <Link href='https://luisrrleal.com' className="black-text">@luisrrleal</Link></p>
      </footer>
    </div>
  );
}
