import BottomNav from './NavBar';

const DefaultDiv = ({ children }: { children: React.ReactNode}) =>{
    return (
        <div className="border relative min-h-[100vh] h-[100vh] m-auto bg-white font-sans dark:bg-gray-700 flex flex-col" style={{width:'400px'}}>
            <div className="flex-1 overflow-auto p-10">
                {children}
            </div>
            <BottomNav />
        </div>
    )
}

export default DefaultDiv;