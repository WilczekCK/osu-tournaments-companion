export default function TournamentPlaceholder({itemNum, loadCount}) {
    return (
        <div class="mx-auto w-full rounded-xl p-4 bg-container-tournament animate-fade">
            {(loadCount === 1 && itemNum <= 1) && (
                <div class="flex animate-pulse items-center h-[96px] w-[105.5%] mt-[-16px] ml-[-16px] pb-5">
                    <div class="flex-1">
                        <div class="col-span-2 h-20 bg-gray-300 rounded-xl rounded-b-none"></div>     
                    </div>
                </div>
            )}
            
            <div class="flex animate-pulse space-x-4 items-center">
                <div class="size-10 rounded-full bg-gray-300"></div>    
                <div class="flex-1 space-y-6 py-1">
                        <div class="space-y-3">
                            <div class="grid grid-cols-4 gap-4">
                                <div class="col-span-1 h-2 rounded bg-pink-900"></div>
                            </div>
                            <div class="grid grid-cols-4 gap-4">
                                <div class="col-span-2 h-2 rounded bg-gray-300"></div>     
                            </div>
                            <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-2 h-2 rounded bg-gray-300"></div>     
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}