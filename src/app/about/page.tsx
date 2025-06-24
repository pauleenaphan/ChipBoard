const About = () =>{
    return(
        <div className="w-[60%] mx-auto flex flex-col gap-12">
            <div>
                <h1 className="heading">About ChipBoard</h1>
                <p className="text-lg mt-[-25px]">
                    ChipBoard is a fun and simple platform where snack lovers rate, review, and explore their favorite chips.
                    Whether you’re into spicy, cheesy, crunchy, or weirdly flavored chips, this is your spot.
                </p>
            </div>
            
            <div>
                <h2 className="heading">Our Mission</h2>
                <p className="text-lg mt-[-25px]">
                    We believe chips deserve more than just shelf space—they deserve community. ChipBoard is built
                    for people who care way too much about flavor, crunch, and spice levels. Join us in documenting
                    the chip journey, one bag at a time.
                </p>
            </div>
            
            <div>
                <h3 className="heading">Features</h3>
                <ul className="list-disc pl-6 space-y-2 mt-[-25px]">
                    <li>Post your chip reviews with ratings and flavor notes</li>
                    <li>Browse entries from other users</li>
                    <li>Find new chips to try based on real opinions</li>
                </ul>
            </div>
            
        </div>
    )
}

export default About;