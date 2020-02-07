import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

function searchHandler(){
	ReactDOM.render(document.getElementById("search").value+" "+document.getElementById("region").value,document.getElementById("output"));
}
// Fill in values here using scraping and myLists.push(value)
const myLists = ["A", "B", "C", "D", "E"]
//


const listitems = myLists.map((mylist)=><option value={mylist} />)
const input = (
	<div>
		<input type="text" id="search" placeholder="Search.."></input>
		<br />
		<input list="regionData" id="region" />
		<datalist id="regionData">
			{listitems}
		</datalist>
		<br />
		<button onClick={searchHandler}>Search</button>
		<div id="output"></div>
	</div>
)

ReactDOM.render(input,document.getElementById("root"))