/*
 * ext-fliptools.js
 *
 * Extension to add toolbar buttons for flipping an object either vertically or horizontally.
 * 
 * Written by Senthil Mummachi
 */
 
 /*
  
  * Updated July 14 2011 to work with svg-edit 2.6 with Undo - Redo
  
  * Jody Stone
 
  */
 
svgEditor.addExtension("Flip tools", function() {
		var svgroot = svgCanvas.getRootElem();
		var selElems,
		showPanel = function(on) {
			$j('#fliptool_panel').toggle(on);
		};
		var batchCmd;
		var selElemsb;
		
		function flipElement (type)
		{	    
            
			var i = selElems.length;
			
			var BatchCommand = svgedit.history.BatchCommand;
			var ChangeElementCommand = svgedit.history.ChangeElementCommand;
			
			var batchCmd = new BatchCommand('Flip ' + (type == '-' ? 'horizontal' : 'vertical'));
			// go thru each element selected and flip
			while (i--) {
				var elem = selElems[i];
				if (elem) {
					var box = svgedit.utilities.getBBox(elem)
					var x = box.x, y = box.y;
					var scale;
					if(elem.tagName=='image' || elem.tagName=='text'){
						if(elem.parentNode.tagName==="g" &&elem.parentNode.getAttribute('style')!=='pointer-events:all'){
							elem = elem.parentNode							
						}
					}
					if(elem.tagName=='image' || elem.tagName=='text'){						
						svgCanvas.groupSelectedElements();
					}
					
					$j('#selectorParentGroup g').hide();
					$j('#selectorGroup0').show();
					$j('#selectorGroup0 g').show();
					if (type == "-"){ // if the flip type is horizontal
						scale = "scale(-1,1)";
						x += (box.width / 2);
					} 
					else { // if the flip type is vertical
						scale = "scale(1,-1)";
						y += (box.height / 2);
					}					
					// check if the element got any transform attrib set, so we can use it later
					var attrib = elem.getAttribute('transform');
					if (attrib)
						batchCmd.addSubCommand(new ChangeElementCommand(elem, {transform: attrib}));
						
					// set the transformation to do the flipping
					elem.setAttribute('transform', "translate(" + x + "," + y + ") " + scale + " translate(" + -x + "," + -y + ")");
					
					// recalculate the dimensions so that it removes 'transform' attribute
					batchCmd.addSubCommand(svgCanvas.recalculateDimensions(elem));
						
					// if there is a rotation present, change the angle of rotation (set to a -ve value if it was +ve and vice versa) to give the mirror reflection effect
					if (attrib){
						// rotation is set in the following format: rotate(-26.8698, 158, 369.5)
						var re = /rotate\(([-+]?\d*(?:\.\d+)?)\,\s*([-+]?\d*(?:\.\d+)?)\,\s*([-+]?\d*(?:\.\d+)?)\)/i;
						var m = attrib.match(re);
						// re-write the transform attribute by changing only the rotation and preserve other transformation info    
						if (m){
							var rotation = 'rotate(' + (0 - parseFloat(m[1])) + ', ' + m[2] + ', ' + m[3] + ')';
							elem.setAttribute('transform', attrib.replace(re, rotation)); 
						}
						else // we don't know how other transformation would get impacted yet, so we simply set them back
							elem.setAttribute('transform', attrib);						
						//batchCmd.addSubCommand(new svgCanvas.undoMgr.changeElement(elem, {transform: elem.getAttribute('transform')}));
						batchCmd.addSubCommand(new ChangeElementCommand(elem,  {transform: elem.getAttribute('transform')}));						
					}
					// check if the element has graidents set for stroke or fill, if so flip the graidents as well
					flipGradients(elem, type);					
				}
			}
			// add to undo history
			if (!batchCmd.isEmpty())
				svgCanvas.undoMgr.addCommandToHistory(batchCmd);
				
			// once all the elements are flipped, clear selection because the selection handles might be staying on the original location 
			//svgCanvas.clearSelection();
			console.log(elem.tagName);
			console.log(elem.getAttribute('style'));
			if(elem.tagName=='g' && elem.getAttribute('style')!='pointer-events:all'){
				if(elem.firstChild.tagName=="image" || elem.tagName=='text'){
					svgCanvas.ungroupSelectedElement				
				}
			}			
			var selectorManager = this.selectorManager = svgedit.select.getSelectorManager();
			var selector = selectorManager.requestSelector(elem);
			selector.resize();
			
			//**TODO: make the flipped object selected. It doesn't look straight forward as it sounds since, the previous step nullifies the elements
			//svgCanvas.addToSelection(selElems, true);
		}
		
		function flipAttrib(grad, attr1, attr2)
		{
			if (attr2){ //linearGraident : switch x1 and x2 or y1 and y2 values
				var val1 = grad.attr(attr1);
				var val2 = grad.attr(attr2);
				if (val1 != null && val2 != null){ //we explicitly check for null here, since doing 'if (val)' may return false when the value is 0
					var changes = grad.attr([attr1, attr2]);
					grad.attr(attr1, val2);
					grad.attr(attr2, val1);
					// add to undo history
					if (batchCmd != null)
						//batchCmd.addSubCommand(new svgCanvas.undoMgr.changeElement(grad[0], changes));
						batchCmd.addSubCommand(new ChangeElementCommand(grad[0],  changes));
				}
			}
			else { //radialGradient: alternate the x or y value. If the value is 0 set it to 1, if it is 1 set it to 0 
				var val = grad.attr(attr1); // get the x value
				if (val != null) //we explicitly check for null here, since doing if (val) may return false when the value is 0
				{
					var changes = grad.attr([attr1]);
					grad.attr(attr1, 1 - val);
					if (batchCmd != null)
						//batchCmd.addSubCommand(new svgCanvas.undoMgr.changeElement(grad[0], changes));
						batchCmd.addSubCommand(new ChangeElementCommand(grad[0],  changes));
						
				}
			}
		}
		
		function flipGradients (elem, type){
			flipGraident(elem, 'stroke', type);
			flipGraident(elem, 'fill', type);
			// look in to all child elements if they have gradients
			$j.each(elem.childNodes, function(i, child) {				
				flipGradients(child, type);
			});			
		}
		function flipGraident(elem, brushType /* stroke or fill */, flipType)
		{
			
				
		}
		return {
			name: "Flip tools",
			svgicons: svgEditor.curConfig.extPath+"ext-fliptools-icon.xml",
			buttons: [{
				id: "tool_flipHoriz",
				type: "context",
				panel: "fliptool_panel",
				title: "Flip Horizontal",
				events: {
					'click': function() {
						//$.alert('Flip Horizontal');
						flipElement('-');
					}
				}
			},{
				id: "tool_flipVert",
				type: "context",
				panel: "fliptool_panel",
				title: "Flip Vertical",
				events: {
					'click': function() {
						flipElement('|');
					}
				}
			}],
			
			selectedChanged: function(opts) 
			{
				var currentMode = svgCanvas.getMode();
				selElems = opts.elems;
				selElemsb = opts.elems;
				if ((opts.multiselected || opts.selectedElement) && currentMode != 'pathedit')
					showPanel(true);
				else
					showPanel(false);
			}
		};
});

