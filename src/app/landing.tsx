import Link from "next/link";
import { GiChipsBag } from "react-icons/gi";
import { FaPencilAlt, FaClipboard, FaUserTie, FaUserSecret, FaUserGraduate  } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";

export const LandingPage = () =>{
    return(
        <main className="flex flex-col gap-50">
            <section className="flex gap-5 flex-col w-[60%] mx-auto text-center">
                <h1 className="text-7xl"
                style={{ fontFamily: "'Luckiest Guy', cursive" }}> 
                <p className="yellow-underline">TRACK</p>, <p className="yellow-underline">RATE</p>, AND <p className="yellow-underline">EXPLORE </p> CHIPS. ALL IN ONE PLACE </h1>
                <p className="text-2xl">
                    Chipboard is a platform where you can log every chip you&apos;ve
                    tried. Love it or hate it? Use this site to rate it.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <Link href="/chipBoard" className="ctaBtn"> Get Started </Link>
                    <Link href="/browse" className="underline hover:text-black"> Browse Chips </Link>
                </div>
            </section>

            <section className="flex items-center flex-col w-[60%] mx-auto text-center">
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

            <section className="flex flex-col w-[60%] mx-auto justify-between">
                <h3 className="heading text-center"> Why use Chipboard? </h3>
                <p className="text-2xl mb-2">
                    We eat so many chips, we lose count. ChipBoard lets you keep track of every crunchy
                    bag — the good, the bad, and the cheesy. It’s just a fun way to log your favorites 
                    (and the ones you’ll never eat again).
                </p>
                <p className="font-bold text-2xl"> | Because every chip deserves a rating  </p>
            </section>

            <section className="w-[100%] bg-yellow-500 py-20">
                <div className="flex flex-col w-[60%] mx-auto justify-between">
                    <h4 className="heading text-center"> Real Takes, Real CHips </h4>
                    <div className="grid grid-cols-2 text-2xl w-[100%] gap-4">
                        <div className="flex flex-col border-4 rounded-2xl p-6 gap-4 justify-between">
                            <p> I used to forget which spicy chips I liked. Now I track every bag. It&apos;s addicting. I now munch and track for a living. </p>
                            <div className="flex flex-row items-center gap-4">
                                <FaUserTie className="text-6xl bg-gray-100 p-2 rounded-xl"/>
                                <div className="text-xl">
                                    <p className="font-bold"> Competitive Cruncher - Bob </p>
                                    <p> 4/5 chips </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-4 rounded-2xl p-6 gap-4 justify-between">
                            <p> Chipboard makes my work so much easier. Now I can track what my target has been munching on. I&apos;m always crunching on the job.</p>
                            <div className="flex flex-row items-center gap-4">
                                <FaUserSecret className="text-6xl bg-gray-100 p-2 rounded-xl"/>
                                <div className="text-xl">
                                    <p className="font-bold"> Private Investigator - Robert </p>
                                    <p> 5/5 chips </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-4 rounded-2xl p-6 gap-4 justify-between">
                            <p> I love chips, but I love tracking even more. Since chipboard came out, I been getting fatter and eating more chips. The moon can&apos;t hold me up. </p>
                            <div className="flex flex-row items-center gap-4">
                                <FaUserAstronaut className="text-6xl bg-gray-100 p-2 rounded-xl"/>
                                <div className="text-xl">
                                    <p className="font-bold"> Astronaut - Sarah </p>
                                    <p> 5/5 chips </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-4 rounded-2xl p-6 gap-4 justify-between">
                            <p> It&apos;s super easy to use and navigate through. With chipboard I been on a quest to try every single lays flavor. It has helped me relieve stress in college. </p>
                            <div className="flex flex-row items-center gap-4">
                                <FaUserGraduate className="text-6xl bg-gray-100 p-2 rounded-xl"/>
                                <div className="text-xl">
                                    <p className="font-bold"> Lays lover - Layla </p>
                                    <p> 5/5 chips </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col w-[50%] mx-auto text-center">
                <h5 className="heading text-center"> Start your Chip Log Today</h5>
                <div className="mb-4">
                    <p className="text-2xl">Track your progress. Crush your goals.</p>
                    <p className="italic"> You know you want to </p>
                </div>
                
                <Link href="/chipBoard" className="ctaBtn w-fit mx-auto"> Start Rating </Link>
            </section>
            
        </main>
    )
}