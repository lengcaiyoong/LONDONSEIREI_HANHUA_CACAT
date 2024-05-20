//All codes needed



	// Get Position index
	
		//this code do skip line
			//start from 0th 1st 2nd -> 64th 65th 66th...


		function findCorrespondingRow(element) {
			// The number of elements in each group, except possibly the last one
			const groupSize = 21;

			// The number of rows in each big row
			const bigRowSize = 12;

			// Calculate the group number
			let group = Math.ceil(element / groupSize);

			// Calculate the starting row of the corresponding big row
			let startRow = (group - 1) * bigRowSize + 1;

			// Calculate the corresponding row in the 2112-row table
			let correspondingRow = startRow * 2 - 1;

			return correspondingRow;
		}



		function normalizeValue(value) {
			let normalizedValue = value % 21;
			if (normalizedValue === 0) {
				normalizedValue = 21;
			}
			return normalizedValue;
		}



		var list0 = [];

		function processNumber(a) {

			list0 = []

			for(let i = 0; i < 12; i++) {
				if(i > 0) {
					a = a - 2 + 32 + 32;
				}

				list0.push(a);

				a = a + 1;
				list0.push(a);

				a = a + 1;
				list0.push(a);
			}

			return list0;
		}






		function getPosition(v){
			processNumber(
				(findCorrespondingRow( v ) - 1) * 32 + [ ( normalizeValue( v ) ) - 1 ] * 3
				)
		}


		//?? range 1 till 1830
		//getPosition(1830)
		console.log(list0)


		// list0.filter((_, index) => index % 2 === 0);
			//list out every 2nd element
			
			
		// list0.map((element, index) => (index % 2 === 0) ? element + 1 : element);
			//list out every 2nd element from beginning, and manipulate





	//function of hex to decimal
	function hexToDecimal(hexString) {
		return parseInt(hexString, 16);
	}



	//function to modify nibble
		//modifyNibble(3,'f')
		
	function modifyNibble(indexno, value_insert) {
		var buffer_dec = buffer[Math.floor(indexno / 2)];	//nibbles in dec
			console.log(buffer_dec);	//ori buffer
		var temp_buffer = (indexno % 2 === 0) ? ((parseInt(value_insert, 16) * 16) + ( buffer_dec % 16 )) : ((buffer_dec & 0xF0) + parseInt(value_insert, 16)) 
			//console.log(temp_buffer);
			evenODD = (indexno % 2 === 0) ? "modified front - even" : "modified back - odd"
			console.log(evenODD);
		buffer[Math.floor(indexno / 2)] = temp_buffer
			console.log(buffer[Math.floor(indexno / 2)]);  //after modified buffer
		
	}



	
	//view list0 easily with 3 x 12
	function createMatrix(numRows, numColumns, dataList) {
	  const matrix = [];
	  for (let i = 0; i < numRows; i++) {
		matrix.push(dataList.slice(i * numColumns, (i + 1) * numColumns));
	  }
	  console.log(matrix)
	}



	// (READ) function to read bin file
	const fs = require('fs');

	// Specify the full path to your binary file
		//var binFilePath = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/London Seirei Tanteidan (Japan).bin'
			//var binFilePath = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/fnt'
		// Read the binary file into a Buffer
			//var buffer = fs.readFileSync(binFilePath);



	// (Save) write the buffer to another binary file
		var save_binFilePath_iso = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/modified London Seirei Tanteidan (Japan).bin'
			//fs.writeFileSync(save_binFilePath_iso, buffer);
		var save_binFilePath_fnt = 'C:/Users/HONG/Desktop/psx translation project (desktop)/tools/TileMolester 0.19/modified_fnt'
			//fs.writeFileSync(save_binFilePath_fnt, buffer);

	


// END CODES Needed
















// Run codes below
			//?? range 1 till 1830
			//buffer[1].toString(16)
			//buffer[1].toString(16).padStart(2, '0') 
			//list0.map((element, index) => (index % 2 === 0) ? element + 1 : element);
			//list0.filter((_, index) => index % 2 === 0);	//get every second element
			//createMatrix(12, 3, list0);
	
	
	//Normal editing fnt file
		// getPosition(1)
		// console.log(list0)
		// buffer[Math.floor(list0[3]/2)]
		// buffer[Math.floor(list0[4]/2)].toString(16)
			//modifyNibble(list0[4],'c')
			//modifyNibble(list0[3],'b')
			//listm.map(el => modifyNibble(el, 'd') )
			//var save_binFilePath = 'C:/Users/HONG/Desktop/psx translation project (desktop)/tools/TileMolester 0.19/modified_fnt'
				//fs.writeFileSync(save_binFilePath, buffer);
	
	
	
	// Editing iso file
	

			// from 0th, move how many intervals
				//originalArray is list0/listm
				//startIndex is the starting point from list0/listm, from 0th
					//default is 0
				//stepSize is how many intervals between each element in list0/listm
					//default is 1
				//hexValue is the hex value to insert to buffer
					//if different hex value, can just insert a list ['a','v'...] which match the length of list0/listm2
				//save_path is the path to save
				//bin_startMarker is where the hex nibbles to start, for iso the edited hex may not be 0th
					//fnt are at iso 3076440 OR  0x2ef158

				

				
			function editBin(originalArray, startIndex, stepSize, hexValue, save_path, bin_startMarker = 0 ) {
			  
			  var listm2 =  originalArray.map((element, index) => {
				if (index >= startIndex && (index - startIndex) % stepSize === 0) {
				  return element;
				}
			  }).filter(element => element !== undefined && element !== null);
			  
			  //debug check
				//return listm2;
			  
			  //turn hexValue into Array if needed
				hexValue = Array.isArray(hexValue)? hexValue : listm2.map(() => hexValue);

			  //debug check
			  (hexValue.length == listm2.length) ? console.log('hex.length = listm2.length') :  console.log('hex.length =/= listm2.length')
 
			  //Edit hex value
			  listm2.map( (el,ind) => modifyNibble(el + (bin_startMarker * 2), hexValue[ind])  )

			  //Save buffer
			  fs.writeFileSync(save_path, buffer);

			}





			

				var binFilePath_iso = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/CD data/isos/london seirei/London Seirei Tanteidan (Japan).bin'
				var binFilePath_fnt = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/fnt'

	//iso (example)
			//var buffer = fs.readFileSync(binFilePath_iso);
			//getPosition(6)	//can refer londonSEIREI.TBL
			//console.log(list0)
			//listm = list0
			//createMatrix(12,3,listm)
			//editBin(listm,0,1, 1, save_binFilePath_iso, 0x2ef158)	//hexValue can refer fnt analysis
			
			
			
			
			//getPosition(39)	//can refer londonSEIREI.TBL
			//console.log(list0)
			//listm = list0
			//createMatrix(12,3,listm)
			//editBin(listm,0,1, 2, save_binFilePath_iso, 0x2ef158)	//hexValue can refer fnt analysis
			
			
			
			
	//fnt (example)	
			//var buffer = fs.readFileSync(binFilePath_fnt);
			//getPosition(1)
			//listm = list0
			//editBin(listm,0,1, 9, save_binFilePath_fnt)
			
			//getPosition(39)
			//listm = list0
			//editBin(listm,0,1, 2, save_binFilePath_fnt)
			
			
	

 

			
			























//get list of [ kanji ,  hex , modified_kanji , pinyin ]
			
	//get texts from txt
	
	var filepath_kanji = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/oriKanji.txt"
	var filepath_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/hexs.txt"
	var filepath_pykanji = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/merge texts/python_Kanji.txt'
	var filepath_pyhexs ="C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/merge texts/python_Kanjihexs.txt"
	var filepath_pintexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/mbaidutexts.txt"
	var filepath_pin = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/baidupinyin.txt"

		
	var kanji = fs.readFileSync(filepath_kanji, 'utf8').split('\r\n');
	var hexs = fs.readFileSync(filepath_hexs, 'utf8').split('\r\n');
	var pykanji = fs.readFileSync(filepath_pykanji, 'utf8').split('\n');
	var pyhexs = fs.readFileSync(filepath_pyhexs, 'utf8').split('\n');
	var pintexts = fs.readFileSync(filepath_pintexts, 'utf8').split('\n');
	var pin = fs.readFileSync(filepath_pin, 'utf8').split('\r\n');
	
	
	ori = kanji.map((value, index) => [value, hexs[index]]);
	ori2 = kanji.map((value, index) => [value, hexs[index]]);
	pyk = pykanji.map((value, index) => [value, pyhexs[index]]);
	pinyin = pintexts.map((value, index) => [value, pin[index]]);
	
	//(ori2.map( el => el[1])).indexOf(pyk.map(el => el[1])[1] )
		//get ori2 element == pyk index, change the last [1] to fav element in pyk

	// merge ori2 and pyk
	var new_ori2 = ori2.map(item1 => {
		var item2 = pyk.find(item => item[1] === item1[1]);
		if (item2) {
			return [item2[0], item1[1]];
		} else {
			return item1;
		}
	});


		// merge kanji + hexs + modified_kanji
		var kanjihexs = kanji.map((value, index) => [value, hexs[index] , new_ori2[index][0]] );


	// get texts and pinyin
	var upinyin = pinyin.reduce((acc, [key, value]) => {
		var found = acc.find(([k,]) => k === key);
		if (found) {
			found[1].push(value);
		} else {
			acc.push([key, [value]]);
		}
		return acc;
	}, []);


		//check if the length is the same
			//unique pinyin_texts == merged pinyin_texts
			// [...new Set(pinyin.map(el => el[0]))].length == upinyin.length
			
		
	
	// merge upinyin and kanjihexs
	kanjihexs.map(item1 => {
		var item2 = upinyin.find(item => item[0] === item1[2]);
		if (item2) {
			item1.push(item2[1]);
		} 
	});
	
	
	
	
// Final Output list to Take notes
	// kanjihexs
	// pinyin
	// findhex
		// check certain texts in kanjihexs
		// kanjihexs.filter( el => el[0] == '臓')
		// kanjihexs.filter( el => el[2] == '啊')
		// kanjihexs.map( el => el[2]).indexOf('公')
		
		
		
		//find texts from pinyin
			//return the list, so use [0] get text
			//pinyin.find( el => el[1] === 'a1')[0]
		
		// use pinyin 'a1' find the hex values
			kanjihexs.find(el => el[2] ==  pinyin.find( el => el[1] === 'a1')[0])[1]
				// OR
				// the code below is the same, but the filter codes will give all instead the first found
					// kanjihexs.filter( el => el.length > 3).find(list => list.some(item => item.includes('pan1')))
					// kanjihexs.filter( el => el.length > 3).filter(list => list.some(item => item.includes('pan1')));
					
					
			//create a function to get hex value easily
			function findhex(piny){
				return kanjihexs.find(el => el[2] ==  pinyin.find( el => el[1] === piny)[0])[1]
			}
			
			findhex('tan1')
				//kanjihexs.find( el => el[1] == findhex('tan1'))
				
			
					//create simplified lists to find hex (optional)
						// skanjihexs = kanjihexs.map( el => el[2]).map((value, index) => [value, kanjihexs.map( el => el[1])[index]]);
						// skanjihexs.find(el => el[0] ==  pinyin.find( el => el[1] === 'a1')[0])[1]
					
					
						//function sfindhex(piny){
						//	return skanjihexs.find(el => el[0] ==  pinyin.find( el => el[1] === piny)[0])[1]
						//}
						
						//sfindhex('tan1')
							//skanjihexs.find( el => el[1] == sfindhex('tan1'))



















// ### Codes below create output files
























// Save kanjihexs to txt

	//get file path
		filepath_node_orikanji = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_orikanji.txt"
		filepath_node_hex = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_hex.txt"
		filepath_node_mkanji = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_mkanji.txt"
		filepath_node_pinyin = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_pinyin.txt"


	// clear everything in txt before write it
		fs.writeFileSync(filepath_node_orikanji, "", 'utf8');
		fs.writeFileSync(filepath_node_hex, "", 'utf8');
		fs.writeFileSync(filepath_node_mkanji, "", 'utf8');
		fs.writeFileSync(filepath_node_pinyin, "", 'utf8');

	


	//create function to write or append texts to txt
		//if it is the first item, no need to add \n
			function appendkanjihex(filepath_jap, item_kanjihex ){
					if ((fs.statSync(filepath_jap)).size === 0) {
						fs.writeFileSync(filepath_jap, item_kanjihex, 'utf8');
					} else {
						fs.appendFileSync(filepath_jap, '\n' + item_kanjihex, 'utf8');
					}
				}



	//write element of kanjihexs to txt
		
		for (var i = 0; i < kanjihexs.length; i++) {
			
			if(kanjihexs[i].length == 4){
						
					for (var item_kanjihexs of kanjihexs[i][3]) {
								appendkanjihex(filepath_node_orikanji ,kanjihexs[i][0])
								appendkanjihex(filepath_node_hex ,kanjihexs[i][1])
								appendkanjihex(filepath_node_mkanji ,kanjihexs[i][2])
								appendkanjihex(filepath_node_pinyin ,item_kanjihexs)
					}
			}else{
				appendkanjihex(filepath_node_orikanji ,kanjihexs[i][0])
				appendkanjihex(filepath_node_hex ,kanjihexs[i][1])
				appendkanjihex(filepath_node_mkanji ,kanjihexs[i][2])
				//appendkanjihex(filepath_node_pinyin ,'.' )
				
				if ((fs.statSync(filepath_node_pinyin)).size === 0) {
						fs.writeFileSync(filepath_node_pinyin, '\n', 'utf8');
					} else {
						fs.appendFileSync(filepath_node_pinyin, '\n', 'utf8');
					}
				
			}
		}


		// delete the first line in node_pinyin, due to extra \n at first line
			del_firstline_nodepinyin = fs.readFileSync(filepath_node_pinyin, 'utf8').split('\n')
			del_firstline_nodepinyin.shift()	//delete the first item \n
		
			//rewrite node_pinyin
			fs.writeFileSync(filepath_node_pinyin, 
				del_firstline_nodepinyin.join('\n'),
				'utf8')





				
				
				
				
				
				
				
				
				
				
				
				


// Edit FNT
	// pyk
	// kanjihexs
	// kanji
	// file output: FNT


	//find index number of pyk in kanji ( + 1 )
	
	function findloc(pythonTEXT){
		return kanjihexs.map( el => el[2]).indexOf(pythonTEXT) + 1	
	}
	
	findloc(pyk[0][0])
	
	
	// pyk[1][0]
	// kanjihexs[327]
		// max
			// pyk[467]
			// kanjihexs[1300]
		// get all pyk index in kanjihexs in list
			//pyk.map( t => kanjihexs.map( el => el[2]).indexOf(t[0]) + 1 )
	
	
	


	// edit 1 python text, can view in  modified fnt
	var binFilePath_fnt = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/fnt'
	
	var buffer = fs.readFileSync(binFilePath_fnt);
	
			path_pythonhex_lists = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/python chinese text (hex)/python_hex.txt"
			path_pythontext_lists = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/python chinese text (hex)/python_TEXTS.txt"			
	 var pythonhex_lists = fs.readFileSync(path_pythonhex_lists, 'utf8').split('\r\n');
	 var pythontext_lists = fs.readFileSync(path_pythontext_lists, 'utf8').split('\r\n');

	getPosition(1)
	listm = list0
	editBin(listm,0,1, pythonhex_lists[459].split(""), save_binFilePath_fnt)
	



	// edit all python texts, can view in modified fnt
	var buffer = fs.readFileSync(binFilePath_fnt);
	
			path_pythonhex_lists = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/python chinese text (hex)/python_hex.txt"
			path_pythontext_lists = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/python chinese text (hex)/python_TEXTS.txt"			
	 var pythonhex_lists = fs.readFileSync(path_pythonhex_lists, 'utf8').split('\r\n');
	 var pythontext_lists = fs.readFileSync(path_pythontext_lists, 'utf8').split('\r\n');



	for (var i = 0; i < pythontext_lists.length; i++) {
		getPosition(findloc(pythontext_lists[i]))
		listm = list0
		editBin(listm,0,1, pythonhex_lists[i].split(""), save_binFilePath_fnt)
	}

























//  Edit ISO 
	// chapter 00


	//get file path of chapter 00
	var binFilePath_iso_00 = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/00'
	var save_binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/modified bin (for CDIMAGE)/modified_00"
			

	
	//create function to write or append texts to txt
		//if it is the first item, no need to add \n
 	function appendJaptext(filepath_jap, list_jap ,joinmarker){
			if ((fs.statSync(filepath_jap)).size === 0) {
				fs.writeFileSync(filepath_jap, list_jap.join(joinmarker),'utf8');
			} else {
				fs.appendFileSync(filepath_jap, '\n' + list_jap.join(joinmarker),'utf8');
			}
		}


	
	// set variable
	var buffer = fs.readFileSync(binFilePath_iso_00);
	var hexlists = [...new Set(hexs)].map( el => parseInt(el,16))	 //all hexs
		// (33440).toString(16).toUpperCase()
	


	// grab texts from chapter00 and save it to txt

		japtext = []
		japposition = []
		filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
		filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
		


		// clear everything in txt before write it
			fs.writeFileSync(filepath_japtexts, "",'utf8');
			fs.writeFileSync(filepath_jappositions, "",'utf8');



		for (var i = 0; i < buffer.length; i += 2) {
			//get first 2 byte sum
				//sumOf2bytes = ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1

			//if found japanese texts, push to japtext
			while( hexlists.includes( ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1 ) ){
					japtext.push( 			
						kanjihexs.find( el => el[1]  ==	(  ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1  ).toString(16).toUpperCase() )[0]
						)
					japposition.push(i)
				i += 2
				}

			//if japtext has text in it, save to txt
			if(japtext.length != 0){
				appendJaptext(filepath_japtexts, japtext, '')
				appendJaptext(filepath_jappositions, japposition, ',')
				japtext = []
				japposition = []
				}
				
			}



	//!!STOP HERE first!!
	// run pinyin.py to get  japtexts_hexs.txt
		// use jappositions.txt to insert those hex
		
		
	
	// filepath
	var filepath_japtexts_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts_hexs.txt"
	
	
	
	// get japtexts_hexs and jappositions
	var japtexts_hexs = fs.readFileSync(filepath_japtexts_hexs, 'utf8').split('\r\n');

	var jappositions = fs.readFileSync(filepath_jappositions, 'utf8').split('\n');
		jappositions = jappositions.map(item => item.split(','));




	// edit chap 00 file using japtexts_hexs and jappositions

		for (var i = 0; i < jappositions.length; i++) {
								
			for (var j = 0; j < jappositions[i].length; j++) {
				buffer[jappositions[i][j]] = parseInt( japtexts_hexs[i].slice(j*4 , (j*4)+2) , 16)
				buffer[Number(jappositions[i][j])+1] = parseInt( japtexts_hexs[i].slice((j*4)+2 , (j*4)+4), 16)
				
			}
			
		}
		
	// Save buffer
		fs.writeFileSync(save_binFilePath_iso_00, buffer);
		
	// failed to change words in game, maybe 00 is not the texts, try SB	

















//Edit SB


	//get file path of chapter 00
	var binFilePath_iso_00 = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/SB'
	var save_binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/modified bin (for CDIMAGE)/modified_SB"
			

	
	//create function to write or append texts to txt
		//if it is the first item, no need to add \n
 	function appendJaptext(filepath_jap, list_jap ,joinmarker){
			if ((fs.statSync(filepath_jap)).size === 0) {
				fs.writeFileSync(filepath_jap, list_jap.join(joinmarker),'utf8');
			} else {
				fs.appendFileSync(filepath_jap, '\n' + list_jap.join(joinmarker),'utf8');
			}
		}


	
	// set variable
	var buffer = fs.readFileSync(binFilePath_iso_00);
	var hexlists = [...new Set(hexs)].map( el => parseInt(el,16))	 //all hexs
		// (33440).toString(16).toUpperCase()
	


	// grab texts from chapter00 and save it to txt

		japtext = []
		japposition = []
		filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
		filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
		


		// clear everything in txt before write it
			fs.writeFileSync(filepath_japtexts, "",'utf8');
			fs.writeFileSync(filepath_jappositions, "",'utf8');



		for (var i = 0; i < buffer.length; i += 2) {
			//get first 2 byte sum
				//sumOf2bytes = ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1

			//if found japanese texts, push to japtext
			while( hexlists.includes( ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1 ) ){
					japtext.push( 			
						kanjihexs.find( el => el[1]  ==	(  ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1  ).toString(16).toUpperCase() )[0]
						)
					japposition.push(i)
				i += 2
				}

			//if japtext has text in it, save to txt
			if(japtext.length != 0){
				appendJaptext(filepath_japtexts, japtext, '')
				appendJaptext(filepath_jappositions, japposition, ',')
				japtext = []
				japposition = []
				}
				
			}


	//!!STOP HERE first!!
	// run pinyin.py to get  japtexts_hexs.txt
		// use jappositions.txt to insert those hex
	
	
	
	// filepath
	var filepath_japtexts_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts_hexs.txt"
	
	
	
	// get japtexts_hexs and jappositions
	var japtexts_hexs = fs.readFileSync(filepath_japtexts_hexs, 'utf8').split('\r\n');

	var jappositions = fs.readFileSync(filepath_jappositions, 'utf8').split('\n');
		jappositions = jappositions.map(item => item.split(','));




	// edit SB file using japtexts_hexs and jappositions

		for (var i = 0; i < jappositions.length; i++) {
								
			for (var j = 0; j < jappositions[i].length; j++) {
				buffer[jappositions[i][j]] = parseInt( japtexts_hexs[i].slice(j*4 , (j*4)+2) , 16)
				buffer[Number(jappositions[i][j])+1] = parseInt( japtexts_hexs[i].slice((j*4)+2 , (j*4)+4), 16)
				
			}
			
		}
		
	// Save buffer
		fs.writeFileSync(save_binFilePath_iso_00, buffer);
		

		


































//Edit whole GAME ISO





	//get file path of chapter 00
	
	var binFilePath_iso_00 = 'C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/CD data/isos/london seirei/London Seirei Tanteidan (Japan).bin' 
	var save_binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/modified bin (for CDIMAGE)/modified_London Seirei Tanteidan (Japan).bin"
			

	
	//create function to write or append texts to txt
		//if it is the first item, no need to add \n
 	function appendJaptext(filepath_jap, list_jap ,joinmarker){
			if ((fs.statSync(filepath_jap)).size === 0) {
				fs.writeFileSync(filepath_jap, list_jap.join(joinmarker),'utf8');
			} else {
				fs.appendFileSync(filepath_jap, '\n' + list_jap.join(joinmarker),'utf8');
			}
		}


	
	// set variable
	var buffer = fs.readFileSync(binFilePath_iso_00);
	var hexlists = [...new Set(hexs)].map( el => parseInt(el,16))	 //all hexs
		// (33440).toString(16).toUpperCase()
	


	// grab texts from chapter00 and save it to txt

		japtext = []
		japposition = []
		filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
		filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
		


		// clear everything in txt before write it
			fs.writeFileSync(filepath_japtexts, "",'utf8');
			fs.writeFileSync(filepath_jappositions, "",'utf8');



		for (var i = 0; i < buffer.length; i += 2) {
			//get first 2 byte sum
				//sumOf2bytes = ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1

			//if found japanese texts, push to japtext
			while( hexlists.includes( ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1 ) ){
					japtext.push( 			
						kanjihexs.find( el => el[1]  ==	(  ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1  ).toString(16).toUpperCase() )[0]
						)
					japposition.push(i)
				i += 2
				}

			//if japtext has text in it, save to txt
			if(japtext.length != 0){
				appendJaptext(filepath_japtexts, japtext, '')
				appendJaptext(filepath_jappositions, japposition, ',')
				japtext = []
				japposition = []
				}
				
			console.log(" PERCENTAGE: " + ((i / buffer.length) * 100).toFixed(10)  + " %" )	
			
			
			}


	//!!STOP HERE first!!
	// run pinyin.py to get  japtexts_hexs.txt
		// use jappositions.txt to insert those hex
	
	
	
	// filepath
	var filepath_japtexts_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts_hexs.txt"
	
	
	
	// get japtexts_hexs and jappositions
	var japtexts_hexs = fs.readFileSync(filepath_japtexts_hexs, 'utf8').split('\r\n');

	var jappositions = fs.readFileSync(filepath_jappositions, 'utf8').split('\n');
		jappositions = jappositions.map(item => item.split(','));




	// edit SB file using japtexts_hexs and jappositions

		for (var i = 0; i < jappositions.length; i++) {
								
			for (var j = 0; j < jappositions[i].length; j++) {
				buffer[jappositions[i][j]] = parseInt( japtexts_hexs[i].slice(j*4 , (j*4)+2) , 16)
				buffer[Number(jappositions[i][j])+1] = parseInt( japtexts_hexs[i].slice((j*4)+2 , (j*4)+4), 16)
				
			}
			
		}
		
	// Save buffer
		fs.writeFileSync(save_binFilePath_iso_00, buffer);
		

		


	//(CHECKING) Get all bin texts
		// filepath_allbintexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
		// var all_bintexts = fs.readFileSync(filepath_allbintexts, 'utf8').split('\n');
			
			// z(8) will return the first item which length is 8 in all_bintexts
		
				function z( length, listOfLists = all_bintexts) {
					var index = listOfLists.findIndex(subList => subList.length === length);

					if (index !== -1) {
						console.log("Index: " + index);
						console.log("Content: " + listOfLists[index]);
					} else {
						console.log("No sublist with length " + length + " found.");
					}
				}


// Next time ignore the element if japtext.join('') < 3, ignore its japposition
	//too many single characters
























//Edit chapter01


	//get file path of chapter 00
	var binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/CD data/london chapters/01"
	var save_binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/modified bin (for CDIMAGE)/modified_01"
			

	
	//create function to write or append texts to txt
		//if it is the first item, no need to add \n
 	function appendJaptext(filepath_jap, list_jap ,joinmarker){
			if ((fs.statSync(filepath_jap)).size === 0) {
				fs.writeFileSync(filepath_jap, list_jap.join(joinmarker),'utf8');
			} else {
				fs.appendFileSync(filepath_jap, '\n' + list_jap.join(joinmarker),'utf8');
			}
		}


	
	// set variable
	var buffer = fs.readFileSync(binFilePath_iso_00);
	var hexlists = [...new Set(hexs)].map( el => parseInt(el,16))	 //all hexs
		// (33440).toString(16).toUpperCase()
	


	// grab texts from chapter00 and save it to txt ISO

		japtext = []
		japposition = []
		filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
		filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
		


		// clear everything in txt before write it
			fs.writeFileSync(filepath_japtexts, "",'utf8');
			fs.writeFileSync(filepath_jappositions, "",'utf8');



		for (var i = 0; i < buffer.length; i += 2) {
			//get first 2 byte sum
				//sumOf2bytes = ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1

			//if found japanese texts, push to japtext
			while( hexlists.includes( ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1 ) ){
					japtext.push( 			
						kanjihexs.find( el => el[1]  ==	(  ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1  ).toString(16).toUpperCase() )[0]
						)
					japposition.push(i)
				i += 2
				}

			//if japtext has text in it, save to txt
			if(japtext.length != 0){
				appendJaptext(filepath_japtexts, japtext, '')
				appendJaptext(filepath_jappositions, japposition, ',')
				japtext = []
				japposition = []
				}
				
			}

	
	


	//!!STOP HERE first!!
	// run pinyin.py to get japtexts_hexs.txt
		//below codes: after get japtexts_hexs use jappositions.txt to insert those hex


	
	
	// filepath
	var filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
	var filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
	var filepath_japtexts_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts_hexs.txt"
	
	
	
	// get japtexts_hexs and jappositions
	var japtexts_hexs = fs.readFileSync(filepath_japtexts_hexs, 'utf8').split('\r\n');

	var jappositions = fs.readFileSync(filepath_jappositions, 'utf8').split('\n');
		jappositions = jappositions.map(item => item.split(','));




	// edit bin file using japtexts_hexs and jappositions

		for (var i = 0; i < jappositions.length; i++) {
								
			for (var j = 0; j < jappositions[i].length; j++) {
				buffer[jappositions[i][j]] = parseInt( japtexts_hexs[i].slice(j*4 , (j*4)+2) , 16)
				buffer[Number(jappositions[i][j])+1] = parseInt( japtexts_hexs[i].slice((j*4)+2 , (j*4)+4), 16)
				
			}
			
		}
		
	// Save buffer
		fs.writeFileSync(save_binFilePath_iso_00, buffer);
		

		

































//Edit chapter02


	//get file path of chapter 02
	var binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/CD data/london chapters/02"
	var save_binFilePath_iso_00 = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/debug tools project/modified bin (for CDIMAGE)/modified_02"
			

	
	//create function to write or append texts to txt
		//if it is the first item, no need to add \n
 	function appendJaptext(filepath_jap, list_jap ,joinmarker){
			if ((fs.statSync(filepath_jap)).size === 0) {
				fs.writeFileSync(filepath_jap, list_jap.join(joinmarker),'utf8');
			} else {
				fs.appendFileSync(filepath_jap, '\n' + list_jap.join(joinmarker),'utf8');
			}
		}


	
	// set variable
	var buffer = fs.readFileSync(binFilePath_iso_00);
	var hexlists = [...new Set(hexs)].map( el => parseInt(el,16))	 //all hexs
		// (33440).toString(16).toUpperCase()
	


	// grab texts from chapter00 and save it to txt ISO

		japtext = []
		japposition = []
		filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
		filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
		


		// clear everything in txt before write it
			fs.writeFileSync(filepath_japtexts, "",'utf8');
			fs.writeFileSync(filepath_jappositions, "",'utf8');



		for (var i = 0; i < buffer.length; i += 2) {
			//get first 2 byte sum
				//sumOf2bytes = ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1

			//if found japanese texts, push to japtext
			while( hexlists.includes( ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1 ) ){
					japtext.push( 			
						kanjihexs.find( el => el[1]  ==	(  ((buffer[i] >> 4) & 0xF) * 0x1000 + (buffer[i] & 0xF )  * 0x100 + ( (buffer[i+1] >> 4) & 0xF) * 0x10 + (buffer[i+1] & 0xF) * 0x1  ).toString(16).toUpperCase() )[0]
						)
					japposition.push(i)
				i += 2
				}

			//if japtext has text in it, save to txt
			if(japtext.length != 0){
				appendJaptext(filepath_japtexts, japtext, '')
				appendJaptext(filepath_jappositions, japposition, ',')
				japtext = []
				japposition = []
				}
				
			}

	
	


	//!!STOP HERE first!!
	// run pinyin.py to get japtexts_hexs.txt
		//below codes: after get japtexts_hexs use jappositions.txt to insert those hex


	
	
	// filepath
	var filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
	var filepath_jappositions = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/jappositions.txt"
	var filepath_japtexts_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts_hexs.txt"
	
	
	
	// get japtexts_hexs and jappositions
	var japtexts_hexs = fs.readFileSync(filepath_japtexts_hexs, 'utf8').split('\r\n');

	var jappositions = fs.readFileSync(filepath_jappositions, 'utf8').split('\n');
		jappositions = jappositions.map(item => item.split(','));




	// edit SB file using japtexts_hexs and jappositions

		for (var i = 0; i < jappositions.length; i++) {
								
			for (var j = 0; j < jappositions[i].length; j++) {
				buffer[jappositions[i][j]] = parseInt( japtexts_hexs[i].slice(j*4 , (j*4)+2) , 16)
				buffer[Number(jappositions[i][j])+1] = parseInt( japtexts_hexs[i].slice((j*4)+2 , (j*4)+4), 16)
				
			}
			
		}
		
	// Save buffer
		fs.writeFileSync(save_binFilePath_iso_00, buffer);
		
