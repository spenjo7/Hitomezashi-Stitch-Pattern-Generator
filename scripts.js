const genGridArr = ( cols, rows, targetElement, size) => {
		// sub functions
	const rand = () =>{
		return Math.floor(Math.random() * 2)
	}

	const isEven = ( n ) => {
		return (n%2 === 0)
	}

	const makeDiv = ( stitchBottom, stitchRight, stitchDiag, targetElement, size) => {
		let div = document.createElement('div')
			div.style.height = `${size}px`
			div.style.width = `${size}px`
		
		if( stitchBottom ){
			div.classList.add('b_bottom') 
		}

		if( stitchRight ){ // rows should determine the 
			div.classList.add('b_right')
		} 

		if( stitchDiag ){ // rows should determine the 
			div.classList.add('b_diag_l')
		} 

		targetElement.appendChild(div)
	}

	// column should determine the 'bottom' stitch to get a "_" but the offset should be on a row by row basis
	// row should determing the 'right' stich to get a "|" but the the offset should be on a column by column basis 
	
	const row_offsets = Array.from({ length: cols }, ()=> rand())
	const diag_offsets = Array.from({ length: cols + rows }, ()=> rand()) // length + width should give us enough elements
	const diag_reverse_offsets = Array.from({ length: cols + rows }, ()=> rand()) // length + width should give us enough elements


	// since the css grid goes left and then down, we need to have the rows contain the column	
	return Array.from({ length: rows}, (_,indR) =>{
		const col_offset = rand() // specific +0 or +1 for the column
		
		return Array.from({ length: cols }, (_, indC)=>{
			// just need to know if the row/col index + the row/col offset is odd or even

			const stitch_bottom = isEven(indC + col_offset) 
			const stitch_right = isEven(indR + row_offsets[indC]) 

			const indD = indC + indR 
			// const adjD = diag_offsets[indD]
			const stitch_diag = isEven(indC +  diag_offsets[indD])
	
			return makeDiv(stitch_bottom, stitch_right, stitch_diag, targetElement, size)
		})

	})
}

const init = ( targetElement, divSize) => {
	let rows = Math.floor( window.innerHeight * 0.9 / divSize ) 
	let cols = Math.floor( window.innerWidth * 0.9 / divSize ) 
		section1.style.gridTemplateColumns = `repeat(${cols}, ${divSize}px)`
	let grid = genGridArr(cols,rows, targetElement, divSize)
}


