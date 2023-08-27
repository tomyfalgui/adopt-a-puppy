'use client'

import {useState, useEffect} from 'react'
import {Puppy} from "@/types/puppy";

export default function Home() {
    const [data, setData] = useState<Puppy[]>([])

    useEffect(() => {
        fetch('http://localhost:5555/api/puppy')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Adopt A Puppy</h1>

            {data && data.length > 0 ?
                <ul>
                    {data.map((puppy, idx) => {
                        return (
                            // we keep index as key
                            <li key={idx}>
                                <img src={puppy.photoUrl} alt={`Puppy image of ${puppy.breed}`}/>
                                <p>{puppy.name}</p>
                            </li>
                        )
                    })}
                </ul>
                : null}
        </main>
    )
}
