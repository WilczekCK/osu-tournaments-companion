type Content = 'players' | 'matches';

export default function InformationSwitchMenu({displayContent, setDisplayContent}) {

    return (
        <div className={"bg-main w-[100%] text-white z-10 flex justify-around rounded-b-xl"}>   
            <div 
                className={"p-6 cursor-pointer transition-colors duration-300 ease-in-out font-semibold "+ (displayContent === 'players' && 'text-pink-900')}
                onClick={() => setDisplayContent('players')}
                >
                    Players
            </div>
            <div 
                className={"p-6 cursor-pointer transition-colors duration-300 ease-in-out font-semibold "+ (displayContent === 'matches' && 'text-pink-900')}
                onClick={() => setDisplayContent('matches')}
                >
                    Matches
            </div>
        </div>
    )
}