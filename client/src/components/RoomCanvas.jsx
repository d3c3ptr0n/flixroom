import Controls from "./Controls";
import MembersVideos from "./MembersVideos";
function RoomCanvas() {
  	return (
    	<div className="artboard flex flex-col">
      		<div className="mt-auto w-full p-6 mb-1">
        		<MembersVideos />
        		<Controls />
      		</div>
    	</div>
  );
}

export default RoomCanvas;
