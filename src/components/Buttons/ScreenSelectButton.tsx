import { IScreen } from "../../interface/ITheatreMovie";

interface IProps {
  screens: IScreen[];
  selectedScreen: string | null;
  handleChange: any;
}
const ScreenSelectButton = ({screens,handleChange,selectedScreen }: IProps) => {

  // const handleScreenSelect = (screenName: string) => {
  //   if(setSelectedScreen) {
  //     setSelectedScreen(screenName === selectedScreen ? null : screenName);
  //   }
  //   handleChange({ target: { name: 'selectedScreen', value: screenName } });
  // };



  return (
    <>
      <div className='gap-14 flex flex-row'>
      {screens?.map((screen, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleChange(screen?.screenName)}
            className={`rounded-lg border border-white px-3 py-2   ${selectedScreen === screen.screenName ? 'bg-green-400 text-white' : 'bg-transparent text-white hover:text-black hover:bg-white'}`}
          >
            {screen.screenName}
          </button>
      ))}
      </div>
    </>
  )
}

export default ScreenSelectButton