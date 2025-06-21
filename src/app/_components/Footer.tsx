export const Footer = () =>{
    return(
        <main className="flex flex-col gap-20 bg-stone-900 text-white">
            <div className="flex flex-row justify-between">
                <div className="flex gap-8">
                    <section>
                        <h1> Company </h1>
                        <p> About </p>
                        <p> Browse </p>
                    </section>

                    <section>
                        <h2> Customer </h2>
                        <p> FAQ </p>
                        <p> Boards </p>
                        <p> Support </p>
                    </section>
                </div>
                
                <section className="flex flex-col gap-4">
                    <p> website portfolio </p>
                    <p> email </p>
                    <p> Linkedin </p>
                    <p> github </p>
                </section>
            </div>
            
            <section className="flex justify-between">
                <p> Copyright @ Pauleena Phan </p>
                <p> Powered by Netlifty </p>
            </section>
        </main>
    )
}