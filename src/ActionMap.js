import React,  {useState, useEffect} from 'react';
import Room from './Room';

function ActionMap(props) {
  const levelIndex = props.levelIndex;
  const gameMap = props.gameMap;
  const actualPositionOfPersonX = props.actualPositionOfPersonX;  
  const actualPositionOfPersonY = props.actualPositionOfPersonY;
  const gameMapWidth = props.gameMapWidth;
  const gameMapHeight = props.gameMapHeight;


  return (<>
	   <p><strong>Bludiště {levelIndex + 1}</strong></p>
      {gameMap.map((rowItem, rowIndex) => (<div key={rowIndex}>
        {rowItem.map((cellItem, cellIndex) => (
          (actualPositionOfPersonX === cellIndex && actualPositionOfPersonY === rowIndex)
          ? 
            <Room
              key={cellIndex}
              roomItem={{
                content: cellItem,
                positionX: cellIndex,
                positionY: rowIndex,
              }}
              {...{gameMap, gameMapWidth, gameMapHeight}}
            />

          : null
        ))}


      </div>   
      ))}

    </>);
}


export default ActionMap;



/*

      {gameMap.map((rowItem, rowIndex) => (<div key={rowIndex}>
        {rowItem.map((cellItem, cellIndex) => (
          (actualPositionOfPersonX === cellIndex && actualPositionOfPersonY === rowIndex)
          ? 
            <Room
              key={cellIndex}
              roomItem={{
                content: cellItem,
                positionX: cellIndex,
                positionY: rowIndex,
              }}
              {...{gameMap, gameMapWidth, gameMapHeight}}
            />

          : null
        ))}

*/