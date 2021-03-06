/*------- INTERFACES  -------*/
/**
 * @typedef ChartData
 * @type { object }
 * @property { Array } columns
 * @property { object } types
 * @property { object } colors
 * */

/*------- SETTINGS  -------*/
const WIDTH = 600;
const HEIGHT = 200;
const PADDING = 40;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
const VIEW_WIDTH = DPI_WIDTH;
const ROWS_COUNT = 5;
const LINE_NAME = 'line';

/**
 * SIZE SETTINGS
 * @param { HTMLCanvasElement } canvas The Object
 */
function canvasSizeSettings(canvas) {
	canvas.style.width = `${WIDTH}px`;
	canvas.style.height = `${HEIGHT}px`;
	canvas.width = DPI_WIDTH;
	canvas.height = DPI_HEIGHT;
}

/**
 * DRAW LINE
 * @param { Object } ctx The Object
 * @param { [number, number] } coords The Object
 * @param { Object } [options] The Object
 */
function drawLine(ctx, coords, options) {
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = options?.color;
	for (const [x, y] of coords) {
		ctx.lineTo(x,y);
	}
	ctx.stroke();
	ctx.closePath();
}

/**
 * DRAW LINES
 * @param { Object } ctx The Object canvas context
 * @param { ChartData } data The Object
 * @param { [number, number] } Ratio The Array
 */
function drawLines(ctx, { columns, types, colors }, [xRatio, yRatio]) {
	columns
		.filter((col) => types[col[0]] === LINE_NAME)
		.map(toCoords([xRatio, yRatio]))
		.forEach(([coords, idx]) => drawLine(ctx, coords, { color: colors[idx] }));
}

/**
 * DRAW Y-AXIS
 * @param { Object } ctx The Object
 * @param { [number, number] } yMinMax The Array
 */
function yAxis(ctx, [yMin, yMax]) {
	const step = VIEW_HEIGHT / ROWS_COUNT;
	const textStep = (yMax - yMin) / ROWS_COUNT;
	
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#bbb';
	ctx.fillStyle = '#96a2aa';
	ctx.font = 'normal 20px Helverica, sans-serif';
	
	for (let i = 1; i <= ROWS_COUNT; i++) {
		const y = step * i;
		const text = Math.round(yMax - textStep * i);
		
		ctx.fillText(text.toString(), 5, y + PADDING - 10);
		ctx.moveTo(0, y + PADDING);
		ctx.lineTo(DPI_WIDTH, y + PADDING);
	}
	
	ctx.stroke();
	ctx.closePath();
}

/**
 * GENERATE LINE COORDS
 * @param { [number, number] } ratios The Object
 * @returns { Function: Array[Array, string] } generateCoords
 */
function toCoords([xRatio, yRatio]) {
	return (col) => [
		col.map((y, i) => [
			Math.floor((i - 1) * xRatio),
			Math.floor(DPI_HEIGHT - PADDING - y * yRatio)
		])
		.filter((_, i) => i !== 0),
		col[0]
	];
}

/**
 * CALCULATE BOUNDARIES
 * @param { ChartData } chartData The Object
 */
function computeBoundaries({ columns, types }) {
	let min, max;
	
	columns.forEach((column) => {
		if (types[column[0]] !== LINE_NAME) return null;
		
		if (typeof min !== 'number') min = column[1];
		if (typeof max !== 'number') max = column[1];
		
		if (min > column[1]) min = column[1];
		if (max < column[1]) max = column[1];
		
		for (let i = 2; i < column.length; i++) {
			if (min > column[i]) min = column[i];
			if (max < column[i]) max = column[i];
		}
	});
	
	return [min, max];
}

/**
 * GENERAL RUN FUNCTION
 * @param { HTMLCanvasElement } canvas The Object
 * @param { ChartData } data The Object
 */
function chart(canvas, data) {
	console.log(data);
  const ctx = canvas?.getContext('2d');
	const [yMin, yMax] = computeBoundaries(data);
	const yRatio = VIEW_HEIGHT / (yMax - yMin);
	const xRatio = VIEW_WIDTH / data.columns[0].length;
	
	canvasSizeSettings(canvas);
	yAxis(ctx, [yMin, yMax]);
	drawLines(ctx, data, [xRatio, yRatio]);
}

/*-------RUN-------*/
chart(document.getElementById('chart'), getChartData());
/*------- TESTING DATA -------*/
function getChartData() {
	return [
		{
			columns: [
				[
					'x',
					1542412800000,
					1542499200000,
					1542585600000,
					1542672000000,
					1542758400000,
					1542844800000,
					1542931200000,
					1543017600000,
					1543104000000,
					1543190400000,
					1543276800000,
					1543363200000,
					1543449600000,
					1543536000000,
					1543622400000,
					1543708800000,
					1543795200000,
					1543881600000,
					1543968000000,
					1544054400000,
					1544140800000,
					1544227200000,
					1544313600000,
					1544400000000,
					1544486400000,
					1544572800000,
					1544659200000,
					1544745600000,
					1544832000000,
					1544918400000,
					1545004800000,
					1545091200000,
					1545177600000,
					1545264000000,
					1545350400000,
					1545436800000,
					1545523200000,
					1545609600000,
					1545696000000,
					1545782400000,
					1545868800000,
					1545955200000,
					1546041600000,
					1546128000000,
					1546214400000,
					1546300800000,
					1546387200000,
					1546473600000,
					1546560000000,
					1546646400000,
					1546732800000,
					1546819200000,
					1546905600000,
					1546992000000,
					1547078400000,
					1547164800000,
					1547251200000,
					1547337600000,
					1547424000000,
					1547510400000,
					1547596800000,
					1547683200000,
					1547769600000,
					1547856000000,
					1547942400000,
					1548028800000,
					1548115200000,
					1548201600000,
					1548288000000,
					1548374400000,
					1548460800000,
					1548547200000,
					1548633600000,
					1548720000000,
					1548806400000,
					1548892800000,
					1548979200000,
					1549065600000,
					1549152000000,
					1549238400000,
					1549324800000,
					1549411200000,
					1549497600000,
					1549584000000,
					1549670400000,
					1549756800000,
					1549843200000,
					1549929600000,
					1550016000000,
					1550102400000,
					1550188800000,
					1550275200000,
					1550361600000,
					1550448000000,
					1550534400000,
					1550620800000,
					1550707200000,
					1550793600000,
					1550880000000,
					1550966400000,
					1551052800000,
					1551139200000,
					1551225600000,
					1551312000000,
					1551398400000,
					1551484800000,
					1551571200000,
					1551657600000,
					1551744000000,
					1551830400000,
					1551916800000,
					1552003200000,
				],
				[
					'y0',
					37,
					20,
					32,
					39,
					32,
					35,
					19,
					65,
					36,
					62,
					113,
					69,
					120,
					60,
					51,
					49,
					71,
					122,
					149,
					69,
					57,
					21,
					33,
					55,
					92,
					62,
					47,
					50,
					56,
					116,
					63,
					60,
					55,
					65,
					76,
					33,
					45,
					64,
					54,
					81,
					180,
					123,
					106,
					37,
					60,
					70,
					46,
					68,
					46,
					51,
					33,
					57,
					75,
					70,
					95,
					70,
					50,
					68,
					63,
					66,
					53,
					38,
					52,
					109,
					121,
					53,
					36,
					71,
					96,
					55,
					58,
					29,
					31,
					55,
					52,
					44,
					126,
					191,
					73,
					87,
					255,
					278,
					219,
					170,
					129,
					125,
					126,
					84,
					65,
					53,
					154,
					57,
					71,
					64,
					75,
					72,
					39,
					47,
					52,
					73,
					89,
					156,
					86,
					105,
					88,
					45,
					33,
					56,
					142,
					124,
					114,
					64,
				],
				[
					'y1',
					22,
					12,
					30,
					40,
					33,
					23,
					18,
					41,
					45,
					69,
					57,
					61,
					70,
					47,
					31,
					34,
					40,
					55,
					27,
					57,
					48,
					32,
					40,
					49,
					54,
					49,
					34,
					51,
					51,
					51,
					66,
					51,
					94,
					60,
					64,
					28,
					44,
					96,
					49,
					73,
					30,
					88,
					63,
					42,
					56,
					67,
					52,
					67,
					35,
					61,
					40,
					55,
					63,
					61,
					105,
					59,
					51,
					76,
					63,
					57,
					47,
					56,
					51,
					98,
					103,
					62,
					54,
					104,
					48,
					41,
					41,
					37,
					30,
					28,
					26,
					37,
					65,
					86,
					70,
					81,
					54,
					74,
					70,
					50,
					74,
					79,
					85,
					62,
					36,
					46,
					68,
					43,
					66,
					50,
					28,
					66,
					39,
					23,
					63,
					74,
					83,
					66,
					40,
					60,
					29,
					36,
					27,
					54,
					89,
					50,
					73,
					52,
				],
			],
			types: {
				y0: 'line',
				y1: 'line',
				x: 'x',
			},
			names: {
				y0: '#0',
				y1: '#1',
			},
			colors: {
				y0: '#3DC23F',
				y1: '#F34C44',
			},
		},
	][0]
}
