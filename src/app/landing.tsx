import Link from "next/link";
import { GiChipsBag } from "react-icons/gi";
import { FaPencilAlt, FaClipboard } from "react-icons/fa";

export const LandingPage = () =>{
    return(
        <main className="flex flex-col gap-30">
            <section className="flex gap-5 flex-col w-[50%] mx-auto text-center">
                <h1 className="text-7xl"
                style={{ fontFamily: "'Luckiest Guy', cursive" }}> 
                <p className="yellow-underline">TRACK</p>, <p className="yellow-underline">RATE</p>, AND <p className="yellow-underline">EXPLORE </p> CHIPS. ALL IN ONE PLACE </h1>
                <p className="text-2xl">
                    Chipboard is a platform where you can log every chip you've
                    tried. Love it or hate it? Use this site to rate it.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <Link href="/chipBoard" className="ctaBtn"> Get Started </Link>
                    <Link href="/browse" className="underline hover:text-black"> Browse Chips </Link>
                </div>
            </section>

            <section className="flex items-center flex-col w-[50%] mx-auto text-center">
                <h2 className="heading"> How it Works </h2>
                <div className="flex justify-between w-[100%]">
                    <div className="border-4 flex items-center flex-col p-10 rounded-2xl w-[32%] justify-center">
                        <p className="text-2xl mb-5"> 1. Try a chip </p>
                        < GiChipsBag className="text-8xl"/>
                    </div>
                    <div className="border-4 flex items-center flex-col p-10 rounded-2xl w-[32%] justify-center">
                        <p className="text-2xl mb-5"> 2. Log and rate it </p>
                        <FaPencilAlt className="text-7xl"/>
                    </div>
                    <div className="border-4 flex items-center flex-col p-10 rounded-2xl w-[32%] justify-center">
                        <p className="text-2xl mb-5"> 3. Build a board </p>
                        <FaClipboard className="text-7xl"/>
                    </div>
                </div>
            </section>

            <section className="flex flex-col w-[50%] mx-auto justify-between">
                <h3 className="heading text-center"> Why use Chipboard? </h3>
                <p className="text-2xl mb-2">
                    We eat so many chips, we lose count. ChipBoard lets you keep track of every crunchy
                    bag — the good, the bad, and the cheesy. It’s just a fun way to log your favorites 
                    (and the ones you’ll never eat again).
                </p>
                <p className="font-bold"> | Because every chip deserves a rating  </p>
            </section>
        </main>
        

    )
}