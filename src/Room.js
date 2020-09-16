import React from 'react';
	
import './App.css';

function Room({roomItem, gameMap, gameMapWidth, gameMapHeight, actualPositionOfPlayerX, actualPositionOfPlayerY, positionOfLavaX, positionOfLavaY, tempGameMap, findPositionOfDeadlyLava, setGameMap}) {

	// zjistit vlastnosti mistnost
	// kde jsou dvere?

const northRoomPositionX = roomItem.positionX;
const northRoomPositionY = roomItem.positionY - 1;

const southRoomPositionX = roomItem.positionX;
const southRoomPositionY = roomItem.positionY + 1;

const eastRoomPositionX = roomItem.positionX + 1;
const eastRoomPositionY = roomItem.positionY;

const westRoomPositionX = roomItem.positionX - 1;
const westRoomPositionY = roomItem.positionY;


	let hasDoorInNorth = false;
	let hasDoorInSouth = false;
	let hasDoorInEast = false;
	let hasDoorInWest = false;
	
	
	const imRoomAndSetToMeDoors = () => {
		gameMap.map((rowItem, rowIndex) => {
			rowItem.map((cellItem, cellIndex) => {
				if (
					rowIndex === northRoomPositionY
					&& cellIndex === northRoomPositionX
					&& isRoom(cellItem)
					&& rowIndex >= 0
				){
					hasDoorInNorth = true;
					}
				if (
					rowIndex === southRoomPositionY
					&& cellIndex === southRoomPositionX
					&& isRoom(cellItem) 
					&& rowIndex <= gameMapHeight
				){
					hasDoorInSouth = true;
				}
				if (
					rowIndex === eastRoomPositionY
					&& cellIndex === eastRoomPositionX
					&& isRoom(cellItem)
					&& cellIndex <= gameMapWidth
				){
					hasDoorInEast = true;
				}
				if (
					rowIndex === westRoomPositionY
					&& cellIndex === westRoomPositionX
					&& isRoom(cellItem)
					&& cellIndex >= 0
				){
					hasDoorInWest = true;
				}
			});
		});

	}

	const isRoom = (content) => {
		if(content !== " ") {
			return true
		} else { return false}
	};

	if (roomItem.content !== " ") {imRoomAndSetToMeDoors()}
	else {}
	
	return (
		<div>
			<div className="noWrap">
				{hasDoorInNorth ? <HorizontalWithDoor /> : <HorizontalWithoutDoor />}
			</div>
			<div style={{display: "flex", }}>
				<span className="noWrap">
					{hasDoorInWest ? <VerticalWithDoor /> : <VerticalWithoutDoor />}
				</span>
				<span className="noWrap">
					{
						(roomItem.content === "@") ? <PlayerInRoom /> 
						: (roomItem.content === "†") ? <PlayerInLava />
						: (roomItem.content === "#") ? <PlayerIsNotInRoom />
						: (roomItem.content === "X") ? <TreasureRoom />
						: (roomItem.content === "~") ? <LavaRoom />
						: (roomItem.content === "!") ? <EnemyInRoom />
						: <NotRoom />
					}
				</span>
				<span className="noWrap">
					{hasDoorInEast ? <VerticalWithDoor /> : <VerticalWithoutDoor />}
				</span>
			</div>
			<div>
				{hasDoorInSouth ? <HorizontalWithDoor /> : <HorizontalWithoutDoor />}
			</div>
{/*
			{roomItem.content},<br />
			pozice mistnosti: {roomItem.positionX}, {roomItem.positionY}<br />
			pozice mistnosti na severu: {northRoomPositionX}, {northRoomPositionY}<br />
			<strong>mam na severu dvere? {hasDoorInNorth ? <span>ano</span> : <span>ne</span>}</strong><br />
			mam na jihu dvere? {hasDoorInSouth ? <span>ano</span> : <span>ne</span>}<br />
			mam na vychodu dvere? {hasDoorInEast ? <span>ano</span> : <span>ne</span>}<br />
			mam na zapade dvere? {hasDoorInWest ? <span>ano</span> : <span>ne</span>}
*/}

		</div>

	)

}

function HorizontalWithoutDoor (){
	return (<>###############</>);
}
function HorizontalWithDoor (){
	return (<>#####<em>.....</em>#####</>);
}
function VerticalWithoutDoor (){
	return (<>#<br />
#<br />
#<br />
#<br />
#</>);
}
function VerticalWithDoor (){
	return (<>#<br />
<em>.<br />
.<br />
.</em><br />
#</>);
}
function PlayerInRoom (){
	return (<><em>.............</em><br />     
<em>......</em>o<em>......</em><br />
<em>.....</em>-|-<em>.....</em><br />
<em>.....</em>/<em>.</em>\<em>.....</em><br />
<em>.............</em></>);
}
function PlayerIsNotInRoom (){
	return (<><em>.............<br />
.............<br />
.............<br />
.............<br />
.............</em></>);
}
function NotRoom (){
	return (<>#############<br />     
#############<br />
#############<br />
#############<br />
#############</>);
}
function TreasureRoom (){
	return (<><em>.............</em><br />     
<em>.....</em>xxx<em>.....</em><br />
<em>.....</em>xXx<em>.....</em><br />
<em>.....</em>xxx<em>.....</em><br />
<em>.............</em></>);
}
function LavaRoom (){
	return (<><rtd><strong>~~~~~~~~~~~~~<br />
~~~~~~~~~~~~~<br />
~~~~~~~~~~~~~<br />
~~~~~~~~~~~~~<br />
~~~~~~~~~~~~~<br /></ strong></rtd></>);
}
function PlayerInLava (){
	return (<><rtd>~~~~~~~~~~~~~<br />
~~~~~~o~~~~~~<br />
~~~~~-|-~~~~~<br />
~~~~~/~\~~~~~<br />
~~~~~~~~~~~~~<br /></rtd></>);
}
function EnemyInRoom (){
	return (<><rtd><em>..</em>nepritel!<em>..</em><br />
<em>......</em>o<em>.</em>|<em>....</em><br />
<em>.....</em>-|-+<em>....</em><br />
<em>.....</em>/<em>.</em>\<em>.....</em><br />
<em>.............</em><br /></rtd></>);
}


	
export default Room;