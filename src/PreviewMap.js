import React,  {useState, useEffect} from 'react';
import Room from './Room';


function PreviewMap(props) {

	const gameMap = props.gameMap;
	const handleMovePerson = props.handleMovePerson;
	const gameMapWidth = props.gameMapWidth;
	const gameMapHeight = props.gameMapHeight;
	const setPrewiewMode = props.setPrewiewMode
	const prewiewMode = props.prewiewMode
	const setGameModeToGame = props.setGameModeToGame
//	        <button onClick={handleChangeToActionMap}>ZAČÍT</button>


useEffect(() => {
   const timer = setTimeout(() => {
	setGameModeToGame();
   }, 1400);
   return () => clearTimeout(timer);
  }, []);



	return (
		<div>
	        <table>
	          <tbody>
	            {gameMap.map((rowItem, rowIndex) => (<tr key={rowIndex}>
	              {rowItem.map((cellItem, cellIndex) => (
	                <td
	                  key={cellIndex}
	                  onClick={e=>handleMovePerson(rowIndex, cellIndex, cellItem)}
	                >
	                  <Room
	                    roomItem={{
	                      content: cellItem,
	                      positionX: cellIndex,
	                      positionY: rowIndex,
	                    }}
	                    {...{gameMap, gameMapWidth, gameMapHeight}}
	                  />
	                </td>
	              ))}
	            </tr>
	            ))}
	          </tbody>
	        </table>
	        <button onClick={setGameModeToGame}>ZAČÍT</button>

    	</div>
	);
}

export default PreviewMap;