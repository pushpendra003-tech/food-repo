import SearchBar from "../search/SearchBar"

export default function Hero(){

 return(

  <div className="bg-orange-500 text-white">

   <div className="max-w-7xl mx-auto px-4 py-20 text-center">

    <h1 className="text-4xl md:text-5xl font-bold mb-6">

     Discover the best food near you

    </h1>

    <p className="mb-8 text-lg opacity-90">

     Order from top restaurants in your city

    </p>

    <div className="max-w-xl mx-auto">
     <SearchBar/>
    </div>

   </div>

  </div>

 )

}