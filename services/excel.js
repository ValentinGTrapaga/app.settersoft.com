const excel = {
  getData: async () => {
    const EXCEL_URI = process.env.EXCEL_URI;

    if (!EXCEL_URI) throw new Error("No EXCEL_URI env variable");
    const excelData = await fetch(EXCEL_URI);
    const excelText = await excelData.text();
    const apiKey = excelText.split("\n")[0].split(",")[4].trim();
    const rows = excelText.split("\n").slice(1);
    const data = [];

    rows.forEach((row) => {
      const [name, ig, tiktok, yt] = row.split(",");

      data.push({ ig, tiktok, yt });
    });

    return { data, apiKey };
  },
}

module.exports = excel
