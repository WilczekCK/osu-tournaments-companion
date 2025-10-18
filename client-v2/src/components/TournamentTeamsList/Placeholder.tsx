export default function TournamentTeamsListPlaceholder() {
    const MemberPlaceholder = () => {
        return (
            <>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-full flex flex-row gap-3 items-center relative text-white cursor-pointer text-lg shadow-red-500/50 inset-shadow-2xs z-10 col-span-5 bg-gray-300 h-[50px]"
                >
                    <div className="absolute inset-0 z-0">
                    <div className="h-full w-full bg-gray-300"></div>
                    </div>
                </a>
    
            </>
        );
      };
      

    return (
        <div className="flex animate-pulse mt-2 items-center w-full pb-2">
            <div className="flex-1 space-y-6 py-1">
                <div className="grid grid-cols-10 gap-4 px-6">
                    <div className="col-span-4 h-3 ml-10 bg-gray-300 rounded"></div>    
                    <div className="col-span-2 h-2"></div>      
                    <div className="col-span-4 h-3 mr-12 bg-gray-300 rounded"></div>     
                </div>

                <div className="grid grid-cols-10 gap-4 px-1">
                    <MemberPlaceholder />
                    <MemberPlaceholder />
                    <MemberPlaceholder />
                    <MemberPlaceholder />
                </div>
            </div>
        </div>
    )
}