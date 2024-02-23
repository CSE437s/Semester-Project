import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Profile from '../components/profile';

export default function Dashboard() {

    
    
    return (
        <>
        <Head>
            <title>Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Profile/>
            
        </main>
        </>
    )

    

}