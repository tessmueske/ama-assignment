import React, { useState } from "react";
import './index.css';

function UserInput({ formatDate }) {
    const [date, setDate] = useState(""); 
    const [climateData, setClimateData] = useState(null);
    const [dailyAverageForecast, setDailyAverageForecast] = useState(null);
    const [dailyAverageReal, setDailyAverageReal] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); 
    
        fetch(`https://api.carbonintensity.org.uk/intensity/date/${date}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch API data");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data); 
            setClimateData(data);

            if (data.data && data.data.length > 0) {
                const forecastSum = data.data.reduce(
                    (sum, entry) => sum + entry.intensity.forecast, 
                    0
                );
                const realSum = data.data.reduce(
                    (sum, entry) => sum + entry.intensity.actual, 
                    0
                );

                const forecastAvg = forecastSum / data.data.length;
                const realAvg = realSum / data.data.length;

                setDailyAverageForecast(forecastAvg);
                setDailyAverageReal(realAvg);
            }
          })
          .catch((error) => console.error("Error fetching data:", error));
    };

  return (
    <div>
        <p>Enter a date to see the average carbon information for that day:</p>
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <br />
            <button type="submit">Submit</button>
        </form>

        {climateData && (
            <div>
                <h3>Carbon Intensity Data for {date}:</h3>
                <p>
                    <strong>Forecasted Average Carbon Intensity for {date}: </strong> 
                    <span className="result-color">{dailyAverageForecast ? dailyAverageForecast.toFixed(2) : 'Loading...'} gCO₂/kWh</span>
                </p>
                <p>
                    <strong>Actual Average Carbon Intensity for {date}: </strong> 
                    <span className="result-color">{dailyAverageReal ? dailyAverageReal.toFixed(2) : 'Loading...'} gCO₂/kWh</span>
                </p>
            </div>
        )}
    </div>
  );
}

export default UserInput;
