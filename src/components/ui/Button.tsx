interface Props {

    children: React.ReactNode
    onClick?: () => void
  
  }
  
  export default function Button({children,onClick}:Props){
  
    return(
  
      <button
       onClick={onClick}
       className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
      >
  
        {children}
  
      </button>
  
    )
  
  }