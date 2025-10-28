const DefaultDiv = ({ children , isPadding = true , isHome = false, className = '' }: { children: React.ReactNode, isPadding?: boolean, isHome? : boolean, className?: string}) =>{
    return (
        <div className={`border overflow-auto relative min-h-[100vh] h-[100vh] m-auto bg-white font-sans w-full ${isPadding ? 'p-10 pb-[6rem]' : ''}  ${isHome ? 'default-img' : ''} ${className}`} style={{maxWidth:'400px'}}>
            {children}
        </div>
    )
}

export default DefaultDiv;