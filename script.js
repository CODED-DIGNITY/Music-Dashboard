document.addEventListener("DOMContentLoaded", () => {
	const streamsCanvas = document.getElementById("streamsChart");

	if (streamsCanvas) {
		new Chart(streamsCanvas, {
			type: "line",
			data: {
				labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
				datasets: [
					{
						label: "Streams",
						data: [
							14, 15, 15, 14, 16, 17, 18, 17, 18, 19, 21, 24, 30, 28, 27, 26,
							27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
						],
						borderColor: "#5fa3ff",
						borderWidth: 2,
						tension: 0.15,
						fill: false,
						pointRadius: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false },
				},
				scales: {
					x: {
						display: false,
						grid: { display: false },
					},
					y: {
						beginAtZero: false,
						ticks: {
							color: "rgba(255,255,255,0.6)",
							font: { size: 11 },
						},
						grid: {
							color: "rgba(255,255,255,0.05)",
						},
					},
				},
			},
		});
	}

	const donutSvgIconsPlugin = {
		id: "donutSvgIcons",
		afterDraw(chart) {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(0);

			const iconPaths = [
				"icons/spotify.svg",
				"icons/youtube.svg",
				"icons/apple.svg",
				"icons/other.svg",
			];

			const iconSize = 18;

			meta.data.forEach((arc, index) => {
				const img = new Image();
				img.src = iconPaths[index];

				img.onload = () => {
					const { x, y } = arc.tooltipPosition();
					ctx.drawImage(
						img,
						x - iconSize / 2,
						y - iconSize / 2,
						iconSize,
						iconSize
					);
				};
			});
		},
	};

	const donutCanvas = document.getElementById("platformChart");

	if (donutCanvas) {
		new Chart(donutCanvas, {
			type: "doughnut",
			data: {
				labels: ["Spotify", "YouTube Music", "Apple Music", "Other"],
				datasets: [
					{
						data: [62, 21, 13, 4],
						backgroundColor: ["#22c55e", "#ef4444", "#ec4899", "#6b7280"],
						borderWidth: 0,
						hoverOffset: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutout: "65%",
				animation: false,
				animations: {
					colors: false,
					x: false,
					y: false,
				},
				hover: {
					mode: null,
				},
				plugins: {
					legend: { display: false },
					tooltip: {
						backgroundColor: "rgba(20,20,20,0.9)",
						displayColors: false,
						padding: 8,
						cornerRadius: 6,
						titleFont: { size: 11 },
						bodyFont: { size: 11 },
					},
				},
			},
			plugins: [donutSvgIconsPlugin],
		});
	}
});
