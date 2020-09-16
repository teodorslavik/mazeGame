import React,  {useState, useEffect} from 'react';
import './App.css';
import Room from './Room';
import PreviewMap from './PreviewMap';
import ActionMap from './ActionMap';
import Intro from './Intro';

import Hotkeys from 'react-hot-keys';


const GAME_MODE_INTRO = "INTRO"; // zobrazeni informaci a play tlacitka
const GAME_MODE_PREVIEW = "PREVIEW"; // zobrazeni cele mapy
const GAME_MODE_GAME = "GAME"; // samotna hra

function App() {
  const isEmpty = " ";
  const hasPerson = "@";
  const theEnd = "X"
  const path = "#"
  const lava = "~"
  const enemy = "!"



  const [gameMap, setGameMap] = useState([[]]);
  const [actualPositionOfPersonX, setActualPositionOfPersonX] = useState(0);
  const [actualPositionOfPersonY, setActualPositionOfPersonY] = useState(0);

  const [actualPositionOfEnemyX, setActualPositionOfEnemyX] = useState(undefined);
  const [actualPositionOfEnemyY, setActualPositionOfEnemyY] = useState(undefined);
  const [randomNumber, setRandomNumber] = useState(null);

  const [gameMapWidth, setGameMapWidth] = useState(undefined);
  const [gameMapHeight, setGameMapHeight] = useState(undefined);
  const [positionOfEndX, setPositionOfEndX] = useState(null);
  const [positionOfEndY, setPositionOfEndY] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [positionOfLavaX, setPositionOfLavaX] = useState(null);
  const [positionOfLavaY, setPositionOfLavaY] = useState(null);
  const [lavasArray, setLavasArray] = useState([]);
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameMode, setGameMode] = useState(GAME_MODE_INTRO);
  const [showGameRestartButton, setShowGameRestartButton] = useState(false);
  const [gameOverSign, setGameOverSign]= useState(false);
  const [diedInLavaSign, setDiedInLavaSign] = useState(false);
  let signNextLevel = " ";
//document.querySelector("#audioMove").play();

// const gameArrayPlans = [
// `##@
// # X`,
// `@~ ###
// #### X`,
// `@`
// ];

const gameArrayPlans = [
// `#@#
// #X#
// ###`,
`##@
# X`,
`@# ###
#### X`,
`##@##
  # #
  #
  ###
 X#  `,
`#@ X
~###`,
`#@~#X
###~#
 ####
#####`,
`@`
];

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

const getContentInGameMap = (whereX, whereY) => {
   let ret = isEmpty;
    gameMap.map((rowItem, rowIndex) => {
      rowItem.map((cellItem, cellIndex) => {
        if (whereX === cellIndex && whereY === rowIndex){
          ret = cellItem;
        }
      });
    });

    return ret;
  }


    const findpostionOfEnd = (gameMap) => {
    gameMap.map((rowItem, rowIndex) => {
      rowItem.map((cellItem, cellIndex) => {

        if(cellItem === "X") {
          setPositionOfEndX(cellIndex);
          setPositionOfEndY(rowIndex);
        }
      });
    });
  }

  const findPositionOfPersonInGameMapAndSetToState = (gameMap) => {
    gameMap.map((rowItem, rowIndex) => {
      rowItem.map((cellItem, cellIndex) => {
        if(cellItem === "@") {
          setActualPositionOfPersonX(cellIndex);
          setActualPositionOfPersonY(rowIndex);
        }
      });
    });
  }

  const findPositionOfEnemyInGameMapAndSetToState = (gameMap) => {
    gameMap.map((rowItem, rowIndex) => {
      rowItem.map((cellItem, cellIndex) => {
        if(cellItem === "!") {
          setActualPositionOfEnemyX(cellIndex);
          setActualPositionOfEnemyY(rowIndex);
        }
      });
    });
  }

const loadActualLevel = () => {
  setGameIsOver(false);
  setGameMode(GAME_MODE_INTRO);

//console.log("AAAAAAA");
  let gamePlanInString = gameArrayPlans[levelIndex];

  let tempGameMap = gamePlanInString.split("\n");
  tempGameMap = tempGameMap.map(rowItem => {
    return rowItem.split("");
  });



  let tempHeight = 0;
  let tempWidth = 0;
  setGameMapWidth(tempGameMap[0].length);
  setGameMapHeight(tempGameMap.length);
  findpostionOfEnd(tempGameMap);
//  findPositionOfDeadlyLava(tempGameMap);
  findPositionOfPersonInGameMapAndSetToState(tempGameMap);
  findPositionOfEnemyInGameMapAndSetToState(tempGameMap);
  setGameMap(tempGameMap);
  getLavasMap(tempGameMap);
}

const runNextLevel = () => {
  setGameIsOver(false);
  if (positionOfEndX === actualPositionOfPersonX && positionOfEndY === actualPositionOfPersonY){
    setLevelIndex(levelIndex + 1)
  }
  return
 }

   useEffect(() => {
     loadActualLevel();
    }, [levelIndex]);

  const handleMovePerson = (rowIndexToChecked, cellIndexToChecked, cellItem) => {
    if(!isAllowedMove(rowIndexToChecked, cellIndexToChecked, cellItem)) {return;}
    const newGameMap = gameMap.map((rowItem, rowIndex) => (
      rowItem.map((cellItem, cellIndex) => {
        if(rowIndexToChecked === rowIndex && cellIndexToChecked === cellIndex) {
          return hasPerson;

          }
           else if (cellItem === "@") {return "#"}
           else  {return cellItem}
      })
    ));
   setGameMap(newGameMap);
   setActualPositionOfPersonX(cellIndexToChecked);
   setActualPositionOfPersonY(rowIndexToChecked);
   document.querySelector("#audioMove").play();

  }

  const findDirectWayToPlayer = () => {
    if (actualPositionOfPersonX === actualPositionOfEnemyX && actualPositionOfPersonY < actualPositionOfEnemyY) {
      console.log("s");
      return "s";
    } else if (actualPositionOfPersonX > actualPositionOfEnemyX && actualPositionOfPersonY === actualPositionOfEnemyY) {
      console.log("v");
      return "v";
    } else if (actualPositionOfPersonX === actualPositionOfEnemyX && actualPositionOfPersonY > actualPositionOfEnemyY) {
      console.log("j")
      return "j";
    } else if (actualPositionOfPersonX < actualPositionOfEnemyX && actualPositionOfPersonY === actualPositionOfEnemyY) {
      console.log("z")
      return "z";
    } else if ((actualPositionOfPersonX > actualPositionOfEnemyX) && (actualPositionOfPersonY < actualPositionOfEnemyY)) {
      console.log("sv");
      return "sv";
    } else if ((actualPositionOfPersonX > actualPositionOfEnemyX) && (actualPositionOfPersonY > actualPositionOfEnemyY)) {
      console.log("jv");
      return "jv";
    } else if ((actualPositionOfPersonX < actualPositionOfEnemyX) && (actualPositionOfPersonY > actualPositionOfEnemyY)) {
      console.log("jz");
      return "jz";
    } else if ((actualPositionOfPersonX < actualPositionOfEnemyX) && (actualPositionOfPersonY < actualPositionOfEnemyY)) {
      console.log("sz");
      return "sz";
    }
  }
/*
  const getNewPositionForEnemy = () => {
    const whereIsPlayer = findDirectWayToPlayer();

    let newPositionX = actualPositionOfEnemyX;
    let newPositionY = actualPositionOfEnemyY;
    if (whereIsPlayer === "s") {
      newPositionY = newPositionY - 1;
      console.log("chci na sever");
    } else if (whereIsPlayer === "v") {
      newPositionX = newPositionX + 1;
      console.log("chci na vychod");
    } else if (whereIsPlayer === "j") {
      newPositionY = newPositionY + 1;
      console.log("chci na jih");
    } else if (whereIsPlayer === "z") {
      newPositionX = newPositionX - 1;
      console.log("chci na zapad");
    } else if (whereIsPlayer === "sv") {
      setRandomNumber = randomInt(1, 2);
      if (randomNumber === 1) {
        newPositionX = newPositionX + 1;
        console.log("chci na v");
      } else {
        newPositionY = newPositionY - 1;
        console.log("chci na s");
      }
    } else if (whereIsPlayer === "jv") {
      setRandomNumber = randomInt(1, 2);
      if (randomNumber === 1) {
        newPositionX = newPositionX + 1;
        console.log("chci na v");
      } else {
        newPositionY = newPositionY + 1;
        console.log("chci na j");
      }
    } else if (whereIsPlayer === "jz"); {
      setRandomNumber = randomInt(1, 2);
      if (randomNumber === 1) {
        newPositionX = newPositionX - 1;
        console.log("chci na z");
      } else {
        newPositionY = newPositionY + 1;
        console.log("chci na j");
      }
    } else if (whereIsPlayer === "sz") {
      setRandomNumber = randomInt(1, 2);
      if (randomNumber === 1) {
        newPositionX = newPositionX - 1;
        console.log("chci na z");
      } else {
        newPositionY = newPositionY - 1;
        console.log("chci na s");
    }
  }

*/



  console.log({gameMap, actualPositionOfEnemyX, actualPositionOfEnemyY})

useEffect(() => {
    const isPersonInLava = lavasArray.some(lavaItem => (
      lavaItem.cellIndex === actualPositionOfPersonX
      && lavaItem.rowIndex === actualPositionOfPersonY
    ));

    if (isPersonInLava) {
        setGameIsOver(true);
        const tempGameMap = gameMap.map((rowItem, rowIndex) => (
          rowItem.map((cellItem, cellIndex) => {
            if (cellItem === "@") {
              return "†";
            } else {return cellItem;}
          })
        ));
        setGameMap(tempGameMap);

    }
  }, [actualPositionOfPersonX, actualPositionOfPersonY]);
const getLavasMap = (gameMap) => {
  let tempLavasMap = [];
  gameMap.map((rowItem, rowIndex) => {
    rowItem.map((cellItem, cellIndex) => {
      if (cellItem === "~") {
        tempLavasMap.push({cellIndex, rowIndex});
      }

    });
  });
setLavasArray(tempLavasMap);
}


// const isLavaInPosition = (positionX, positionY, lavasArray) => {

// }
  const handleMoveUp = (e) => {
    if(gameIsOver) {return;}
    handleMovePerson(actualPositionOfPersonY - 1, actualPositionOfPersonX, getContentInGameMap(actualPositionOfPersonX, actualPositionOfPersonY - 1));
  }
  const handleMoveDown = (e) => {
    if(gameIsOver) {return;}
    handleMovePerson(actualPositionOfPersonY + 1, actualPositionOfPersonX, getContentInGameMap(actualPositionOfPersonX, actualPositionOfPersonY + 1));
  }
  const handleMoveRight = (e) => {
    if(gameIsOver) {return;}
    handleMovePerson(actualPositionOfPersonY, actualPositionOfPersonX + 1, getContentInGameMap(actualPositionOfPersonX + 1, actualPositionOfPersonY));
  }
  const handleMoveLeft = (e) => {
    if(gameIsOver) {return;}
    handleMovePerson(actualPositionOfPersonY, actualPositionOfPersonX - 1, getContentInGameMap(actualPositionOfPersonX - 1, actualPositionOfPersonY));
  }

  const isAllowedMove = (rowIndexToChecked, cellIndexToChecked, cellItem, pr) => {
      document.querySelector("#audioMove").play();
    return (
      isAcceptedDirectToMove(rowIndexToChecked, cellIndexToChecked)
      && ( cellItem === "#" || cellItem === "X" || cellItem === "~" || cellItem === "!")
      && !( actualPositionOfPersonX === positionOfEndX && actualPositionOfPersonY === positionOfEndY)
      && !( actualPositionOfPersonX === positionOfLavaX && actualPositionOfPersonY === positionOfLavaY)
      && (gameMode === GAME_MODE_GAME)
    );
  }

  const isAcceptedDirectToMove = (rowIndexToChecked, cellIndexToChecked) => {

    return (
    (
        ( actualPositionOfPersonX - 1 === cellIndexToChecked || actualPositionOfPersonX + 1 === cellIndexToChecked )
        && ( actualPositionOfPersonY === rowIndexToChecked )
      )
      || (
        ( actualPositionOfPersonY - 1 === rowIndexToChecked || actualPositionOfPersonY + 1 === rowIndexToChecked )
        && ( actualPositionOfPersonX === cellIndexToChecked )
        )

      )

  }

  const setGameModeToPreview = () => {
    setGameMode(GAME_MODE_PREVIEW);
  }
  const setGameModeToGame = () => {
    setGameMode(GAME_MODE_GAME);
  }

  const handlePlaySound = (e) => {
    document.querySelector("#audioMove").play();
  }

  useEffect(() => {
    if (
      (gameMode === GAME_MODE_GAME)
      && !(
        actualPositionOfPersonX === positionOfEndX
        && actualPositionOfPersonY === positionOfEndY
        )
      && !(levelIndex === gameArrayPlans.length)
      ) {
        setShowGameRestartButton(true);
//        signRestart = "Zmáčkni E pro restart bludiště";
    }else {
        setShowGameRestartButton(false);
    }

 }, [gameMode, actualPositionOfPersonY, actualPositionOfPersonX]);

      if (actualPositionOfPersonX === positionOfEndX && actualPositionOfPersonY === positionOfEndY){
        signNextLevel = "Zmáčkni R pro další bludiště";
        document.querySelector("#audioEnd").play();
    }else {
        signNextLevel = " ";
    }
  // useEffect(() => {
  //   console.log("skoro")
  //     if (actualPositionOfPersonX === positionOfLavaX && actualPositionOfPersonY === positionOfLavaY) {
  //       setDiedInLavaSign(true)
  //       console.log("BbBBBBBBBBB")
  //   }else {
  //       setDiedInLavaSign(false)
  //   }
  //     }, [actualPositionOfPersonX, actualPositionOfPersonY]);

useEffect(() => {
    if ((levelIndex + 1 === gameArrayPlans.length) && (gameMode === GAME_MODE_GAME)) {
  setGameOverSign(true)
}
   }, [gameMode]);


//      <Hotkeys keyName="k" onKeyDown={getNewPositionForEnemy} />
  return (
    <div className="App">
      <Hotkeys keyName="up,w" onKeyDown={handleMoveUp} />
      <Hotkeys keyName="down,s" onKeyDown={handleMoveDown} />
      <Hotkeys keyName="right,d" onKeyDown={handleMoveRight} />
      <Hotkeys keyName="left,a" onKeyDown={handleMoveLeft} />
      <Hotkeys keyName="e" onKeyDown={loadActualLevel} />
      <Hotkeys keyName="r" onKeyDown={runNextLevel} />
      <Hotkeys keyName="l" onKeyDown={findDirectWayToPlayer} />

      {gameMode === GAME_MODE_INTRO && <Intro
            {...{levelIndex, setGameModeToPreview}}
          />}
      {gameMode === GAME_MODE_PREVIEW && <PreviewMap
            {...{gameMap, handleMovePerson, gameMapHeight, gameMapWidth, gameMode, setGameModeToGame}}
          />}
      {gameMode === GAME_MODE_GAME && <ActionMap
            {...{levelIndex, gameMap, actualPositionOfPersonX, actualPositionOfPersonY, gameMapWidth, gameMapHeight}}
          />
      }
              {diedInLavaSign && <p><strong>Uhořel jsi v lávě</strong></p>}
              {gameOverSign && <p><strong>No Výborně, <br /> dohrál jsi mou hru.</strong></p>}
              {showGameRestartButton && <p>Zmáčkni E pro restart bludiště</p>}
              <p><strong>{signNextLevel}</strong></p>
              <p><a href="https://teo.jacon.cz/index.php/9905">zpet na uvodni stranku</a></p>

              <button onClick={handleMoveUp}>ˆ</br >|</button>

            <audio src="move.mp3" id="audioMove" />
            <audio src="end.mp3" id="audioEnd" />
    </div>
  );
}


export default App;
