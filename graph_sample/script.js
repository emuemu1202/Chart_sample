let myChart;

document.getElementById("drawButton").addEventListener("click", function () {
  const label1 = document.getElementById("label1").value || "デフォルト1";
  const value1 = parseFloat(document.getElementById("value1").value) || 0;
  const label2 = document.getElementById("label2").value || "デフォルト2";
  const value2 = parseFloat(document.getElementById("value2").value) || 0;
  const label3 = document.getElementById("label3").value || "デフォルト3";
  const value3 = parseFloat(document.getElementById("value3").value) || 0;

  const labels = [label1, label2, label3];
  const data = [value1, value2, value3];

  const ctx = document.getElementById("myChart").getContext("2d");

  if (myChart instanceof Chart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "データセット",
          data: data,
          backgroundColor: ["#b2cbe4", "#ccd7e3", "#ccd7e3"], // 背景色の設定
        },
      ],
    },
    options: {
      indexAxis: "y", // 横棒グラフ
      responsive: true,
      layout: {
        padding: {
          right: 50, // ラベル表示のために余白を追加
        },
      },
      plugins: {
        legend: {
          display: false, // 凡例を非表示
        },
        tooltip: {
          enabled: false, // ツールチップを非表示
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false, // 縦線を非表示
          },
        },
        y: {
          grid: {
            drawBorder: false, // Y軸の外枠を非表示（任意）
          },
        },
      },
    },
    plugins: [
      {
        id: "customDottedLines",
        afterDatasetsDraw(chart) {
          const { ctx, chartArea, scales } = chart;
          const dataset = chart.data.datasets[0];

          ctx.save();
          ctx.setLineDash([1, 2]); // 点線パターン: 5ピクセル線、5ピクセル間隔
          ctx.strokeStyle = "#000"; // 点線の色

          dataset.data.forEach((value, index) => {
            const yCenter = scales.y.getPixelForValue(index); // Y軸の中央位置を取得
            const xStart = scales.x.getPixelForValue(value); // バーの右端
            const xLabel = chartArea.right + 10; // ラベル位置（右側）

            // 点線を描画
            ctx.beginPath();
            ctx.moveTo(xStart, yCenter); // バーの右端中央からスタート
            ctx.lineTo(xLabel, yCenter); // ラベル位置中央で終了
            ctx.stroke();

            // ラベルを描画
            ctx.fillStyle = "#000"; // ラベルの色
            ctx.font = "12px Arial"; // ラベルのフォント
            ctx.fillText(value, xLabel + 5, yCenter + 4); // 数値ラベルを描画
          });

          ctx.restore();
        },
      },
    ],
  });
});
