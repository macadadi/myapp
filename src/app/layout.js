import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-blue-500 p-4 text-white fixed w-full z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">
              <Link href="/" className="hover:underline ">
                My App
              </Link></h1>
            <nav className="flex space-x-4">
              <Link href="/" className="hover:underline hidden md:block">
                Home
              </Link>
              <Link href="/students" className="hover:underline">
                Students
              </Link>
              <Link href="/teachers" className="hover:underline">
                Teachers
              </Link>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
