import React,  {useState, useEffect} from 'react';
import Room from './Room';

function Intro(props) {
	const levelIndex = props.levelIndex;
	const setGameModeToPreview = props.setGameModeToPreview;
//			<p>Zmáčkni START pro začátek hry</p>

	return(
		<div>
			<p>Výtej ve hře BLUDIŠTĚ, <br /> po zmáčknutí tlačítka START začne hra. <br /> Máš trochu času na zapamatování mapy.<br />Cíl jsou <u>křížky</u>.<br /><strong>Hodně štěstí</strong></p>

			<p>Level {levelIndex + 1}</p>
			<button onClick={setGameModeToPreview}>START</button>
		</div>
		);
}

export default Intro;