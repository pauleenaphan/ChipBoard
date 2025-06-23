import { FaComputer } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

export const Footer = () =>{
    return(
        <main className="flex flex-col gap-30 bg-stone-900 text-white mt-40 px-30 py-20">
            <div className="flex flex-row justify-between">
                <div className="flex gap-12">
                    <section>
                        <h1 className="font-bold underline"> Company </h1>
                        <p> About </p>
                        <p> Browse </p>
                    </section>

                    <section>
                        <h2 className="font-bold underline"> Customer </h2>
                        <p> FAQ </p>
                        <p> Boards </p>
                        <p> Support </p>
                    </section>
                </div>
                
                <section className="flex flex-col gap-4 text-2xl">
                    <FaComputer />
                    <IoMdMail />
                    <FaLinkedin />
                    <FaGithubSquare />
                </section>
            </div>
            
            <section className="flex justify-between">
                <p> Copyright @ Pauleena Phan 2025 </p>
                <p>Powered by <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="underline">Netlify</a></p>
            </section>
        </main>
    )
}