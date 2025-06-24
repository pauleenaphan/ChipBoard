import Image from 'next/image';

export const Loading = () =>{
    return(
        <div className="flex items-center justify-center h-screen">
            <Image src="/chipSpinner.gif" alt="loading" className="w-[20%]" width={200} height={200}/>
        </div>
    )
}