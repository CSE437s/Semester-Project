import DefUserImg from '../public/AnonUser.png'
import Image from "next/image"
export default function Profile(Sidebar){ 

    
    return (
        
        <div className="profile">
        <Image
            src={DefUserImg}
            alt="purpleDot"
            layout="fixed"
            onClick={}
        />
        </div>
    )
    
}