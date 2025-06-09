import Link from "next/link"

export const Navbar = () =>{
    return(
        <nav>
            <h1> CHIPBOARD </h1>
            <div>
                <Link href="/"> Home </Link>
                <Link href="/about"> About </Link>
                <Link href="/browse"> Browse </Link>
                <Link href="/chipBoard"> Board </Link>
            </div>
            <div>
                <Link href="/login"> Login </Link>
                <Link href="/signUp"> Sign Up </Link>
            </div>
        </nav>
    )
}