export default function Profile(){

 const email = localStorage.getItem("email")

 return(

 <div className="max-w-xl mx-auto py-10">

 <h2 className="text-2xl font-bold mb-4">

 Profile

 </h2>

 <p>Email: {email}</p>

 </div>

 )

}
