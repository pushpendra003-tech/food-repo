import Navbar from "./Navbar"
import Footer from "./Footer"

interface Props{
 children: React.ReactNode
}

export default function MainLayout({children}:Props){

 return(

 <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

   <Navbar/>

   <main className="flex-1 pb-20">
    {children}
   </main>

   <Footer/>

  </div>

 )

}