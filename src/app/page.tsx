import Image from "next/image";
import Link from "next/link";

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
        <section className="p-40 gap-15 container">
          <div className="item">
            <Image src='https://media.architecturaldigest.com/photos/65e7bfaf9257bd9a533e18eb/1:1/w_2399,h_2399,c_limit/0350E&J.jpg' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://www.southernliving.com/thmb/_DTHAquZBLEHKLIgPi_C3fFIhNo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-929904308-aeeb687413714dacace50062cece530a.jpg' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdbiUOGR6BN61bED3b1LOPphxF7AflIRAhA&s' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://www.eleganza.co.uk/uploads/images/products/1900/94e5dc10_4e25_4692_a335_e1563d231f10.webp?w=740' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://www.brides.com/thmb/Drx8BL_uJXvolhPv7k0yYVVUtA0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/guests-at-reception-toasting-logal-cole-photography-recirc-0923-60cb1c61779a48bc95dd61e42a5d2b06.jpg' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://people.com/thmb/7X8pl5iE5Y9YyM5fx8XzT0gtD0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/celebrity-photographer-stanley-babb-tout-011724-09889e0ac36046b5901450fec74f2870.jpg' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLk4jYhFCFULg2oF-uSIKXcEXqY4YrvjJ_bQ&s' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
          <div className="item">
            <Image src='https://www.brides.com/thmb/hfDh7xrf4WXxUBy-4hCtVpir_t0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Wedding-Anxiety-Getty-Images-Main-4fc60ea752c24e1698b0def6f3218525.jpg' alt="imagen subida por usuario" width={500} height={500} className="max-width" />
          </div>
        </section>
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
      <footer className="center-text p-10">
        <p>Powered by <Link href='https://luisrrleal.com' className="black-text">@luisrrleal</Link></p>
      </footer>
    </div>
  );
}
