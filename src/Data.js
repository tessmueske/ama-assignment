import React, { useEffect, useState } from "react";
import './index.css';
import UserInput from "./UserInput";

function Data({ formatDate }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.carbonintensity.org.uk/intensity', {
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
            setData(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className='center-container card'>
            <p>This is a display of carbon intensity data from the National Energy System Operator, created by the University of Oxford Department of Computer Science in partnership with WWF and Environemntal Defense Fund Europe. It provides consumers with the current carbon emissions based on electricity usage in Great Britain.</p>
            {data && data.data && data.data.length > 0 ? (
                <div>
                    <h3 className='underline'>Carbon Intensity Data:</h3>
                    {data.data.map((entry, index) => {
                        return (
                            <div key={index}>
                                <p>
                                    <strong>Today's date and time:</strong>{" "}
                                    {formatDate(entry.from)} - {formatDate(entry.to)}
                                </p>
                                <p>
                                    <strong>Forecasted Carbon Intensity:</strong> <span className="result-color">{entry.intensity.forecast} gCO₂/kWh</span>
                                </p>
                                <p>
                                    <strong>Actual Carbon Intensity:</strong> <span className="result-color">{entry.intensity.actual} gCO₂/kWh</span>
                                </p>
                                <p>
                                    <strong>Intensity:</strong> <span className="result-color">{entry.intensity.index}</span>
                                </p>
                                <div>
                                    <UserInput formatDate={formatDate}/>
                                </div>
                                <p>Data is pulled from <a href='https://carbonintensity.org.uk/'>Carbon Intensity API</a>.</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Data;