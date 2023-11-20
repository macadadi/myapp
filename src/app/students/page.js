'use client'
import mockFetch from '@/api/mock'
import { dateFormart } from '@/utils/dateFormater'
import React from 'react'
import useSWR from 'swr'

function page() {

    const { data, error, isLoading } = useSWR('/api', fetcher)

    if (error) return <div className='mt-43 pt-12'>failed to load {console.log(error)}</div>
    if (isLoading) return <div className='mt-43 pt-12'>loading...</div>

    return (
        <div className='mt-43 pt-12'>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Surname</th>
                        <th className="py-2 px-4 border-b text-left">National ID</th>
                        <th className="py-2 px-4 border-b text-left">Student No.</th>
                        <th className="py-2 px-4 border-b text-left">D.O.B</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, index) => (
                        <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-100  hover:bg-blue-200' : 'bg-white hover:bg-blue-200'}>
                            <td className="py-2 px-4 border-b">{row.name}</td>
                            <td className="py-2 px-4 border-b">{row.surname}</td>
                            <td className="py-2 px-4 border-b">{row.nationalID}</td>
                            <td className="py-2 px-4 border-b">{row.Studentnumber}</td>
                            <td className="py-2 px-4 border-b">{dateFormart(row.dateOfBirth)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default page


const fetcher = async () => {
    try {
        const dataResponse = await mockFetch('/api', { method: 'GET' });
        const data = await dataResponse.json();
      const filtered = data.filter(data=> !data.hasOwnProperty('title'))
        return filtered
    } catch (error) {
        console.log('Teachers:', error)
        throw error
    }
}