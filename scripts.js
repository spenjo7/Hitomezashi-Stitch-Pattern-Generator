const genGridArr = ( cols, rows, targetElement, size) => {
		// sub functions
	const rand = () =>{
		return Math.floor(Math.random() * 2)
	}

	const makeDiv = ( stitchBottom, stitchRight, targetElement, size) => {
		let div = document.createElement('div')
			div.style.height = `${size}px`
			div.style.width = `${size}px`
		
		if( stitchBottom ){
			div.classList.add('b_bottom') 
		}

		if( stitchRight ){ // rows should determine the 
			div.classList.add('b_right')
		} 

		section1.appendChild(div)
	}

	// column should determine the 'bottom' stitch to get a "_" but the offset should be on a row by row basis
	// row should determing the 'right' stich to get a "|" but the the offset should be on a column by column basis 
	
	const row_offsets = Array.from({ length: cols }, ()=> rand())

	// since the css grid goes left and then down, we need to have the rows contain the column	
	return Array.from({ length: rows}, (_,indR) =>{
		const col_offset = rand()
		
		return Array.from({ length: cols }, (_, indC)=>{
			// Can use %2 on indC or IndR to determine odd/even
			//const offR = row_offsets[indR] 
			const altR = indR%2
			const altC = indC%2
			const offC = col_offset // each column is offset (or not) based on the row it is in
			const modC = altC + offC
			const offR = row_offsets[indC] // each row is offset (or not) based on the column it is in
			const modR = altR + offR
		
			makeDiv(modC%2, modR%2, modR%2, size)

			return ({ indC, indR, altR, altC })
		})

	})
}

const init = ( targetElement, divSize) => {
	let rows = Math.floor( window.innerHeight * 0.9 / divSize ) 
	let cols = Math.floor( window.innerWidth * 0.9 / divSize ) 
		section1.style.gridTemplateColumns = `repeat(${cols}, ${divSize}px)`
	let grid = genGridArr(cols,rows, targetElement, divSize)
}


