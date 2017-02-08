(function () {
	var	map,
		geocoder,
		activeForm = '',
		activeDataType = '',
		matrix,
		encodeTimeout = null;
		emojis = [
			90,	// 0xe000
			90,	// 0xe100
			83,	// 0xe200
			77,	// 0xe300
			76,	// 0xe400
			55	// 0xe500
		];

	$j(document).ready(function () {
		$j('#typeSelect a').click(switchForm);

		if ($j.browser.msie || !document.addEventListener) {
			$j('#forms input, #forms textarea').change(updateQR).keyup(updateQR)
			$j('#forms select, #qrErrorCorrection, #qrVersion, #qrMargin, #qrScale').change(updateQR);
			$j('#forms input, #forms textarea').bind('cut', updateQR);
			$j('#forms input, #forms textarea').bind('paste', updateQR);
		} else {
			$j('#forms select, #qrErrorCorrection, #qrVersion, #qrMargin, #qrScale').change(updateQR);
			$j('#forms input, #forms textarea').each(function () {
				this.addEventListener('input', updateQR, false);
			});
		}

		
			loadingForm = 'encode-url.html';
		
		switchForm({ currentTarget:{ href:loadingForm }});
		$j('input[type="text"], input[type="url"], input[type="email"], textarea')
		.keyup(function () {
			$j(this)[$j(this).val() === '' ? 'addClass' : 'removeClass']('empty');
		})
		.change(function () {
			$j(this)[$j(this).val() === '' ? 'addClass' : 'removeClass']('empty');
		});
		$j('input[type="text"], input[type="url"], input[type="email"], textarea').addClass(function (){
			return $j(this).val() === '' ? 'empty' : ''
		});

		$j('#encodedData').click(function () {
			var text = this;
			if ($j.browser.msie) {
				var range = document.body.createTextRange();
				range.moveToElementText(text);
				range.select();
			} else if ($j.browser.mozilla || $j.browser.opera) {
				var selection = window.getSelection();
				var range = document.createRange();
				range.selectNodeContents(text);
				selection.removeAllRanges();
				selection.addRange(range);
			} else if ($j.browser.safari) {
				var selection = window.getSelection();
				selection.setBaseAndExtent(text, 0, text, 1);
			}
		});
		$j('#encodedData').dblclick(function () {
			window.open($j(this).text());
		});

		$j('#preview').click(function () {
			$j('<canvas />').addClass('modal').appendTo(
				$j('<div />').addClass('modalBg').appendTo('body').show()
				.click(function () {
					$j('.modalBg').remove();
				})
			);

			var width = ($j(window).width() < $j(window).height() ? $j(window).width() : $j(window).height()) - 40;

			matrix.scale = Math.floor(width / matrix.width);
			var	canvas = $j('.modal')[0],
				ctx = canvas.getContext('2d'),
			 	foreColor = $j('#qrForeColor').val(),
				backColor = $j('#qrBackColor').val();
			if (!/^[0-9a-f]{6}$/i.test(foreColor)) {
				foreColor = '000000';
			}
			if (!/^[0-9a-f]{6}$/i.test(backColor)) {
				backColor = 'ffffff';
			}

			$j('.modalBg')[0].style.backgroundColor = 'rgba(' + parseInt(backColor.substr(0, 2), 16) + ',' + parseInt(backColor.substr(2, 2), 16) + ',' + parseInt(backColor.substr(4, 2), 16) + ',0.5)';

			foreColor = 'rgb(' + parseInt(foreColor.substr(0, 2), 16) + ',' + parseInt(foreColor.substr(2, 2), 16) + ',' + parseInt(foreColor.substr(4, 2), 16) + ')';
			backColor = 'rgb(' + parseInt(backColor.substr(0, 2), 16) + ',' + parseInt(backColor.substr(2, 2), 16) + ',' + parseInt(backColor.substr(4, 2), 16) + ')';

			canvas.width = matrix.pixelWidth;
			canvas.height = matrix.pixelWidth;
			ctx.fillStyle = backColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = foreColor;

			matrix.draw(canvas, 0, 0);
			canvas.style.marginLeft = Math.round((-matrix.pixelWidth) / 2) + 'px';
			canvas.style.marginTop = Math.round((-matrix.pixelWidth) / 2) + 'px';
		});

		$j(window).resize(function() {
			if ($j('.modal').length === 0) {
				return;
			}
			var width = ($j(window).width() < $j(window).height() ? $j(window).width() : $j(window).height()) - 40;

			matrix.scale = Math.floor(width / matrix.width);
			var	canvas = $j('.modal')[0],
				ctx = canvas.getContext('2d'),
			 	foreColor = $j('#qrForeColor').val(),
				backColor = $j('#qrBackColor').val();
			if (!/^[0-9a-f]{6}$/i.test(foreColor)) {
				foreColor = '000000';
			}
			if (!/^[0-9a-f]{6}$/i.test(backColor)) {
				backColor = 'ffffff';
			}
			foreColor = 'rgb(' + parseInt(foreColor.substr(0, 2), 16) + ',' + parseInt(foreColor.substr(2, 2), 16) + ',' + parseInt(foreColor.substr(4, 2), 16) + ')';
			backColor = 'rgb(' + parseInt(backColor.substr(0, 2), 16) + ',' + parseInt(backColor.substr(2, 2), 16) + ',' + parseInt(backColor.substr(4, 2), 16) + ')';

			canvas.width = matrix.pixelWidth;
			canvas.height = matrix.pixelWidth;
			ctx.fillStyle = backColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = foreColor;

			matrix.draw(canvas, 0, 0);
			canvas.style.marginLeft = Math.round((-matrix.pixelWidth) / 2) + 'px';
			canvas.style.marginTop = Math.round((-matrix.pixelWidth) / 2) + 'px';
		});

		$j('form[id="encode:vevent"] input[name="fullDay"]').change(function () {
			$j('#vevent-startTimeRow').css('display', ($j(this).val() === 'no' ? 'table-row' : 'none'));
			$j('#vevent-endTimeRow').css('display', ($j(this).val() === 'no' ? 'table-row' : 'none'));
		});

		$j('#qrForeColor').ColorPicker({
			livePreview:true,
			color:'000000',
			onSubmit: function(hsb, hex, rgb, el) {
				$j(el).val(hex);
				$j(el).ColorPickerHide();
				updateQR();
			},
			onBeforeShow: function () {
				$j(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function(){
			$j(this).ColorPickerSetColor(this.value);
		});
		$j('#qrBackColor').ColorPicker({
			livePreview:true,
			color:'ffffff',
			onSubmit: function(hsb, hex, rgb, el) {
				$j(el).val(hex);
				$j(el).ColorPickerHide();
				updateQR();
			},
			onBeforeShow: function () {
				$j(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function(){
			$j(this).ColorPickerSetColor(this.value);
		});

		for (var i = 0; i < emojis.length; i++) {
			for (var j = 0; j < emojis[i]; j++) {				
				$j('<div class="emoji"/>').css('background-position', -(j * 17) + 'px ' + -(i * 17) + 'px')
				
			}
			$j('<div />').css('clear', 'both').appendTo($j('#emoji'));
			
			$j('.emoji').each(function(j){
				$j(this).attr('rel',i);
				$j(this).attr('ref',j);
			});
		}
		
		
		
		$j('.emoji').live('click',function () {
			var form = document.getElementById('encode:' + activeForm).elements;
			
			for (var i = 0; i < form.length; i++) {
				if (form[i].nodeName.toUpperCase() === 'TEXTAREA') {
					code = 0xe001 + ($j(this).attr('rel') << 8) + $j(this).attr('ref')
					insertText(form[i], '{#' + code.toString(16) + '}');
				}
			}
			updateQR();
		});
		$j('<div />').appendTo($j('#emoji')).html('<p style="width:100%; max-width:100%;">' + i18n['appleOnly'] + '</p>');

		$j('#encode\:text textarea, #encode\:sms textarea, #encode\:email textarea').focus(initInsertions).keyup(function () {
			storeCaret(this);
		}).click(function () {
			storeCaret(this);
		}).select(function () {
			storeCaret(this);
		});

		//window.unload = GUnload;
	});

	/* Return value: 0 = worst contrast; 1 = good contrast; above 1 = perfect contrast */
	function getContrast(r1, g1, b1, r2, g2, b2) {
		var	colorBrightness1 = ((r1 * 299) + (g1 * 587) + (b1 * 114)) / 1000,
			colorBrightness2 = ((r2 * 299) + (g2 * 587) + (b2 * 114)) / 1000,
			colorBrightness = (Math.max(colorBrightness1, colorBrightness2) - Math.min(colorBrightness1, colorBrightness2)) / 125,
			colorDifference = ((Math.max(r1, r2) - Math.min(r1, r2)) + (Math.max(g1, g2) - Math.min(g1, g2)) + (Math.max(b1, b2) - Math.min(b1, b2))) / 500;

		return (colorBrightness + colorDifference) / 2;
	}

	function switchForm(e) {
		var	node = document.getElementById('forms').firstChild,
			re = new RegExp('^encode:([a-z\-]+)');

		activeForm = /encode-([a-z\-]+)(\.[a-z][a-z])?.html/.exec(e.currentTarget.href)[1];
		activeDataType = activeForm.toUpperCase().replace('-', '_', 'g');

		$j('#typeSelect a').removeClass('active');
		$j('#typeSelect li').removeClass('active')
		$j('#typeSelect li').removeClass('selected')
		$j('#typeSelect a[href*="encode-' + activeForm + '.html"]').addClass('active');
		$j('#typeSelect a[href*="encode-' + activeForm + '.html"]').parent().addClass('active').addClass('selected');
		

		while (node !== null) {
			if (node.nodeType === 1 && re.test(node.id)) {
				node.style.display = (re.exec(node.id)[1] === activeForm ? 'block' : 'none')
			}
			node = node.nextSibling;
		}

		if ($j.inArray(activeForm, ['text', 'sms', 'email']) !== -1) {
			$j('#emoji').css('display', 'block');
		} else {
			$j('#emoji').css('display', 'none');
		}

		/*if (GBrowserIsCompatible() && $j.inArray(activeForm, ['google-maps', 'bing-maps', 'geo']) !== -1) {
			$j('#map').css('display', 'block');
			$j('#mapSearch').css('display', 'block');

			if (!map) {
				map = new GMap2($j('#map')[0]);
				geocoder = new GClientGeocoder();

				map.setCenter(new GLatLng(50.42559, 7.57390), 1);

				map.enableScrollWheelZoom();
				map.enableDoubleClickZoom();
				map.enableContinuousZoom();

				map.getDragObject().setDraggableCursor("crosshair");
				map.getDragObject().setDraggingCursor("crosshair");

				map.addControl(new GLargeMapControl());
				map.setMapType(G_NORMAL_MAP);
				map.addControl(new GMapTypeControl());

				var minMapScale = 0;
				var maxMapScale = 17;
				var mapTypes = map.getMapTypes();
				// overwrite the getMinimumResolution() and getMaximumResolution() methods for each map type
				for (var i = 0; i < mapTypes.length; i++) {
					mapTypes[i].getMinimumResolution = function() { return minMapScale; }
					mapTypes[i].getMaximumResolution = function() { return maxMapScale; }
				}

				GEvent.addListener(map, "click", function (overlay, point) {
					if (!point) { return false; }

					map.clearOverlays()
					var marker = new GMarker(point, {
						draggable: true
					});
					map.addOverlay(marker);

					GEvent.addListener(marker, "drag", function () {
						setMapPosition(marker.getPoint());
					});
					GEvent.addListener(marker, "dragend", function () {
							setMapPosition(marker.getPoint());
					});

					setMapPosition(marker.getPoint());
				});

				$j("#mapAddress").keydown(function(e) {
					if (e.keyCode == 13) {
						findAddress($j('#mapAddress').val());
						e.preventDefault();
					}
				});

				$j("#mapSearch button").click(function(e) {
					findAddress($j('#mapAddress').val());
					e.preventDefault();
				});
			}
		} else {
			$j('#map').css('display', 'none');
			$j('#mapSearch').css('display', 'none');
		}*/
		updateQR();

		if (typeof(e.preventDefault) === 'function') { e.preventDefault(); }
		return false;
	}

	function updateQR() {
		var	form = document.getElementById('encode:' + activeForm).elements;

		var qr = new JSQR();
		var code = new qr.Code();

		code.encodeMode = code.ENCODE_MODE.UTF8_SIGNATURE;
		code.version = parseInt($j('#qrVersion').val(), 10);
		code.errorCorrection = code.ERROR_CORRECTION[$j('#qrErrorCorrection').val()];

		var input = new qr.Input();
		try {
			input.dataType = input.DATA_TYPE[activeDataType];
		} catch (e) {
			$j('#error').html(e.message);
			$j('#preview').css('display', 'none');
			$j('#example').text('-');
			$j('#encodedData').text('-');
			$j('#error').css('display', 'block');
			return;
		}
		input.data = {};

		var date;
		for (var i = 0; i < form.length; i++) {
			if (typeof(form[i].name) === 'undefined' || form[i].name === '') {
				continue;
			}
			if ($j.inArray(form[i].name, ['startDate', 'endDate']) != -1) {
				// DATEPICKER WITH TIME
				date = $j(form[i]).datepicker('getDate');
				if (date === null) {
					continue;
				}
				if (getRadioValue(form['fullDay']) === 'no') {
					if (form[i].name === 'startDate') {
						date.setHours(form['startTime:hours'].value)
						date.setMinutes(form['startTime:minutes'].value)
						date.setSeconds(form['startTime:seconds'].value);
					} else {
						date.setHours(form['endTime:hours'].value)
						date.setMinutes(form['endTime:minutes'].value)
						date.setSeconds(form['endTime:seconds'].value);
					}
				}
				setInputData(input.data, form[i].name, date);
				continue;
			} else if (form[i].name === 'birthday') {
				// DATEPICKER WITHOUT TIME
				setInputData(input.data, form[i].name, $j(form[i]).datepicker('getDate'));
				continue;
			} else if ($j.inArray(form[i].name, ['startTime:hours', 'startTime:minutes', 'startTime:seconds', 'endTime:hours', 'endTime:minutes', 'endTime:seconds']) !== -1) {
				continue;
			} else if ($j.inArray(form[i].name, ['fullDay']) !== -1) {
				// BOOLEAN
				setInputData(input.data, form[i].name, (getRadioValue(form[form[i].name]) === 'yes'));
				continue;
			}

			switch (form[i].nodeName.toUpperCase()) {
				case 'SELECT':
					setInputData(input.data, form[i].name, form[i].value);
					break;
				case 'TEXTAREA':
					setInputData(input.data, form[i].name, form[i].value.replace(/{#([a-fA-F0-9]+)}/g, function (str, p1) {
						return String.fromCharCode(parseInt(p1, 16));
					}));
					break;
				case 'INPUT':
					if (form[i].type.toUpperCase() === 'RADIO') {
						setInputData(input.data, form[i].name, getRadioValue(form[form[i].name]));
					} else {
						setInputData(input.data, form[i].name, form[i].value);
					}
					break;
			}
		}

		if (activeForm === 'sms') {
			$j('#smsLength').html(input.data.message.length + ' characters (' + (input.data.message.length === 0 ? 1 : Math.ceil(input.data.message.length / 160)) + ' SMS)');
		}

		if (encodeTimeout !== null) {
			clearTimeout(encodeTimeout);
			encodeTimeout = null;
		}

		var dataStr = replaceEmojis(entityEncode(getJson(input.data))),
			foreColor = $j('#qrForeColor').val(),
			backColor = $j('#qrBackColor').val();

		if (!/^[0-9a-f]{6}$/i.test(foreColor)) {
			foreColor = '000000';
		}
		if (!/^[0-9a-f]{6}$/i.test(backColor)) {
			backColor = 'ffffff';
		}
		var contrast = getContrast(
			parseInt(backColor.substr(0, 2), 16), parseInt(backColor.substr(2, 2), 16), parseInt(backColor.substr(4, 2), 16),
			parseInt(foreColor.substr(0, 2), 16), parseInt(foreColor.substr(2, 2), 16), parseInt(foreColor.substr(4, 2), 16)
		),
		inverted = (
			getContrast(
				0, 0, 0,
				parseInt(foreColor.substr(0, 2), 16), parseInt(foreColor.substr(2, 2), 16), parseInt(foreColor.substr(4, 2), 16)
			) > getContrast(
				parseInt(backColor.substr(0, 2), 16), parseInt(backColor.substr(2, 2), 16), parseInt(backColor.substr(4, 2), 16),
				0, 0, 0
			)
		);

		if (contrast < 0.1) {
			$j('#colorDifference').css('background-position', '-284px center').html(i18n['colorDifference1']);
		} else if (contrast < 0.25) {
			$j('#colorDifference').css('background-position', '-284px center').html(i18n['colorDifference2' + (inverted ? 'i' : 'n')]);
		} else if (contrast < 0.75) {
			$j('#colorDifference').css('background-position', '-284px center').html(i18n['colorDifference3' + (inverted ? 'i' : 'n')]);
		} else if (contrast < 1) {
			$j('#colorDifference').css('background-position', '-284px center').html(i18n['colorDifference4' + (inverted ? 'i' : 'n')]);
		} else if (contrast < 1.4) {
			$j('#colorDifference').css('background-position', '0 center').html(i18n['colorDifference5' + (inverted ? 'i' : 'n')]);
		} else if (contrast < 1.65) {
			$j('#colorDifference').css('background-position', '0 center').html(i18n['colorDifference6' + (inverted ? 'i' : 'n')]);
		} else {
			$j('#colorDifference').css('background-position', '0 center').html(i18n['colorDifference7' + (inverted ? 'i' : 'n')]);
		}
		// $j('#colorDifference').html(contrast);

		foreColor = 'rgb(' + parseInt(foreColor.substr(0, 2), 16) + ',' + parseInt(foreColor.substr(2, 2), 16) + ',' + parseInt(foreColor.substr(4, 2), 16) + ')';
		backColor = 'rgb(' + parseInt(backColor.substr(0, 2), 16) + ',' + parseInt(backColor.substr(2, 2), 16) + ',' + parseInt(backColor.substr(4, 2), 16) + ')';

		$j('#example').html(
			"var qr = new JSQR();<br />" +
			"<br />" +
			"var code = new qr.Code();<br />" +
			"code.encodeMode = code.ENCODE_MODE.UTF8_SIGNATURE;<br />" +
			"code.version = " + ($j('#qrVersion').val() == '0' ? "code.DEFAULT" : $j('#qrVersion').val()) + ";<br />" +
			"code.errorCorrection = code.ERROR_CORRECTION." + $j('#qrErrorCorrection').val() + ";<br />" +
			"<br />" +
			"var input = new qr.Input();<br />" +
			"input.dataType = input.DATA_TYPE." + activeDataType + ";<br />" +
			(dataStr.length > 0 ? "input.data = " + dataStr + ";<br />" : "") +
			"<br />" +
			"var matrix = new qr.Matrix(input, code);<br />" +
			($j('#qrScale').val() != '' && $j('#qrScale').val() != '2' ? "matrix.scale = " + $j('#qrScale').val() + ";<br />" : "") +
			($j('#qrMargin').val() != '4' ? "matrix.margin = " + $j('#qrMargin').val() + ";<br />" : '') +
			"<br />" +
			"var canvas = document.createElement('canvas');<br />" +
			"canvas.setAttribute('width', matrix.pixelWidth);<br />" +
			"canvas.setAttribute('height', matrix.pixelWidth);<br />" +
			"canvas.getContext('2d').fillStyle = '" + foreColor + "';<br />" +
			"matrix.draw(canvas, 0, 0);<br />" +
			"document.body.appendChild(canvas);<br />"
		);
		
		try {
			$j('#encodedData').html(replaceEmojis(entityEncode(input.toString())));
			$j('.qr_embed').show();
		} catch (e) {
			$j('#error').html(e.message);
			$j('.qr_embed').hide();
			$j('#preview').css('display', 'none');
			$j('#encodedData').text('-');
			$j('#error').css('display', 'block');
			return;
		}

		encodeTimeout = setTimeout((function (input, code, foreColor, backColor) { return function () {
			encodeTimeout = null;

			try {
				matrix = new qr.Matrix(input, code);
				matrix.margin = parseInt($j('#qrMargin').val());
				if ($j('#qrScale').val() != '') {
					matrix.scale = parseInt($j('#qrScale').val());
				} else {
					matrix.scale = Math.floor(280 / matrix.width);
				}

				$j('#qrScale option[value=""]').text('Auto (' + Math.floor(280 / matrix.width) + 'x)');
				if ($j('#qrVersion').val() == '0') {
					$j('#qrVersion option[value="0"]').text('Auto (V. ' + ((matrix.length - 17) / 4) + ' / ' + matrix.length + 'px²)');
				} else {
					$j('#qrVersion option[value="0"]').text('Auto');
				}
				
				var	canvas = $j('#preview_qr')[0],
					ctx = canvas.getContext('2d');

				if (matrix.pixelWidth <= 280) {
					canvas.width = matrix.pixelWidth;
					canvas.height = matrix.pixelWidth;
					ctx.fillStyle = backColor;
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = foreColor;

					matrix.draw(canvas, 0, 0);
					canvas.style.marginLeft = '-5px';
					//canvas.style.marginTop = (Math.floor((280 - matrix.pixelWidth) / 2) + 8) + 'px';
					//canvas.style.marginBottom = (Math.ceil((280 - matrix.pixelWidth) / 2) + 8) + 'px';
				} else {
					canvas.width = 280;
					canvas.height = 280;
					ctx.fillStyle = backColor;
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = foreColor;
					canvas.style.marginTop = canvas.style.marginBottom = canvas.style.marginLeft = '0';

					matrix.draw(canvas, Math.round((280 - matrix.pixelWidth) / 2), Math.round((280 - matrix.pixelWidth) / 2));
				}

				$j('#preview').css('display', 'block');
				$j('#error').css('display', 'none');
			} catch (e) {
				$j('#error').html(e.message);
				$j('#preview').css('display', 'none');
				$j('#error').css('display', 'block');
			}
		} })(input, code, foreColor, backColor), 250);
	}

	function setInputData(data, propsPath, value) {
		var props = propsPath.split('.');
		if (props.length === 1) {
			data[props[0]] = value;
		} else if (props.length === 2) {
			if (typeof(data[props[0]]) !== 'object') {
				data[props[0]] = {};
			}
			data[props[0]][props[1]] = value;
		}
	}

	function findAddress(address) {
		var mapAddressInfo = $j("#mapAddressInfo");

		if (address.length == 0) {
			mapAddressInfo.html('Please enter an address.').css('color', '#c00000').css('font-weight', 'bold');
			return;
		}

		mapAddressInfo.html(i18n['requestingData']).css('color', '#a0a0a0').css('font-weight', 'normal');

		geocoder.getLatLng(address, function(point) {
				if (!point) {
					mapAddressInfo.html(i18n['addressNotFound']).css('color', '#c00000').css('font-weight', 'bold');
				} else {
					mapAddressInfo.html(i18n['addressMarked']).css('color', '#666666').css('font-weight', 'normal');

					if (map.getZoom() < 16) {
						map.setCenter(point, 17);
					} else {
						map.panTo(point);
					}

					map.clearOverlays()
					var marker = new GMarker(point, {
						draggable: true
					});
					map.addOverlay(marker);

					GEvent.addListener(marker, "drag", function () {
						setMapPosition(marker.getPoint());
					});
					GEvent.addListener(marker, "dragend", function () {
						setMapPosition(marker.getPoint());
					});

					setMapPosition(point);
				}
			}
		);
	}

	function setMapPosition(point) {
		$j('input[name="longitude"]').val(Math.round(point.lng() * 100000) / 100000);
		$j('input[name="latitude"]').val(Math.round(point.lat() * 100000) / 100000);
		updateQR();
	}

	function getRadioValue(elem) {
		for (var i = 0; i < elem.length; i++) {
			if (elem[i].checked) {
				return elem[i].value;
			}
		}
		return false;
	}

	function getJson(obj) {
		if (typeof obj !== "object") { return obj; }

		var data = getJsonNode(obj, 1, false, 'jsObj');

		return (data.length > 0 ? '{{BREAK}' + data + '{BREAK}}' : '');
	}

	function replaceEmojis(data) {
		return data.replace(/[\ue000-\ue5ff]/g, function (match) {
			return '<span class="emojiTxt" style="background-position:-' + ((match.charCodeAt(0) - 1 & 0xff) * 17) + 'px -' + (((match.charCodeAt(0) & 0xf00) >> 8) * 17) + 'px;">' + match + '</span>';
		});
	}

	function entityEncode(data) {
		return data.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/\ /g, '&nbsp;')
			.replace(/\{BREAK\}/g, '<br />');
	}

	function getJsonNode(obj, level, arr, nodePath) {
		var out = '', subJsonText;

		var j = 0;
		for (var i in obj) {
			if (typeof(obj[i]) === 'string' && obj[i].length === 0) { continue; }
			if (typeof(obj[i]) === 'object' && obj[i] !== null && obj[i].constructor !== Date) {
				subJsonText = getJsonNode(obj[i], level + 1, (obj[i] instanceof Array),  nodePath + (arr ? '[' + i + ']' : '[&quot;' + i + '&quot;]'))
				if (subJsonText.length === 0) { continue; }
			}

			if (j > 0) {
				out += ',{BREAK}';
			}

			out += getIndentation(level);

			if (!arr) {
				out += '"' + i + '": ';
			}

			switch (typeof(obj[i])) {
				case "object":
					if (obj[i] === null) {
						out += 'null';
					} else if (obj[i].constructor === Date) {
						out += 'new Date(' + obj[i].getFullYear() + ', ' + obj[i].getMonth() + ', ' + obj[i].getDate() + (obj[i].getHours() != 0 || obj[i].getMinutes() !== 0 || obj[i].getSeconds() !== 0 ? ', ' + obj[i].getHours() + ', ' + obj[i].getMinutes() + ', ' + obj[i].getSeconds() : '') + ')'
					} else {
						out += (obj[i] instanceof Array ? '[' : '{') + '{BREAK}' + subJsonText + '{BREAK}' + getIndentation(level) + (obj[i] instanceof Array ? ']' : '}');
					}
					break;
				case "string":
					out += '"' + obj[i].replace(/\\/g, '\\\\').replace(/\//g, '\\\/').replace(/\"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t') + '"';
					break;
				case "number":
					out += obj[i];
					break;
				case "boolean":
					out += (obj[i] === true ? 'true' : 'false' );
					break;
				default:
					out += 'null /* ERROR */';
					break;
			}
			j++;
		}

		return out;
	}

	function getIndentation(level) {
		var out = '';

		for (var i = 0; i < level * 5; i++) {
			out += ' ';
		}

		return out;
	}

	// ----------------------- Text Selection -----------------------

	var baseHeight;

	// Fix a bug involving the TextRange object. From
	// http://www.frostjedi.com/terra/scripts/demo/caretBug.html
	function initInsertions(textArea) {
		if ((!!window.attachEvent && Object.prototype.toString.call(window.opera) != '[object Opera]') && typeof(baseHeight) != 'number') {
			textArea.focus();
			baseHeight = document.selection.createRange().duplicate().boundingHeight;
		}
	}

	// Insert at Caret position. Code from
	// http://www.faqts.com/knowledge_base/view.phtml/aid/1052/fid/130
	function storeCaret(textArea) {
		if (textArea.createTextRange) {
			textArea.caretPos = document.selection.createRange().duplicate();
		}
	}

	// Insert text at position
	function insertText(textArea, text) {
		var textArea;
		if (!isNaN(textArea.selectionStart)) {
			var sel_start = textArea.selectionStart;
			var sel_end = textArea.selectionEnd;
			mozWrap(textArea, text, '')
			textArea.selectionStart = sel_start + text.length;
			textArea.selectionEnd = sel_end + text.length;
		} else if (textArea.createTextRange && textArea.caretPos) {
			if (baseHeight != textArea.caretPos.boundingHeight) {
				textArea.focus();
				storeCaret(textArea);
			}
			var caret_pos = textArea.caretPos;
			caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) == ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
		} else {
			textArea.value = textArea.value + text;
		}
		textArea.focus();
	}

	// From http://www.massless.org/mozedit/
	function mozWrap(textArea, open, close) {
		var selLength = (typeof(textArea.textLength) == 'undefined') ? textArea.value.length : textArea.textLength;
		var selStart = textArea.selectionStart;
		var selEnd = textArea.selectionEnd;
		var scrollTop = textArea.scrollTop;
		if (selEnd == 1 || selEnd == 2) {
			selEnd = selLength;
		}
		var s1 = (textArea.value).substring(0,selStart);
		var s2 = (textArea.value).substring(selStart, selEnd)
		var s3 = (textArea.value).substring(selEnd, selLength);
		textArea.value = s1 + open + s2 + close + s3;
		textArea.selectionStart = selEnd + open.length + close.length;
		textArea.selectionEnd = textArea.selectionStart;
		textArea.focus();
		textArea.scrollTop = scrollTop;
	}
})();