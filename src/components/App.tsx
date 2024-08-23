import React, { ChangeEvent, ReactNode, useState } from "react";
import "../assets/css/App.css";

interface Fixture {
  team: string;
  fixture: string;
  date: string;
  reason: string;
}

function App() {
  const [numberOfTeams, setNumberOfTeams] = useState<string>("");
  const [risk, setRisk] = useState<string>("low");
  const [league, setLeague] = useState<string>("Premier League");
  const [teams, setTeams] = useState<Fixture[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchChatGtpResponse = () => {
    setGenerating(true);
    setError(false);
    setTeams([]);

    const prompt =
      "Create a " +
      numberOfTeams +
      " team acca consisting of teams from the " +
      league +
      ", only include fixtures within the next 10 days from today. Make the acca " +
      risk +
      " risk. Output the result in JSON format with keys team, fixture (make sure the fixture includes both teams X vs Y), date and reason. only return JSON without any markdown, line endings or additional formatting. Ensure that the output response can be JSON.parsed. Ensure that the overarching object containing all fixtures is called teams";

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_CHAT_GPT_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: prompt
          }
        ]
      })
    })
      .then((response: Response): any => {
        if (!response.ok) {
          setGenerating(false);
          setError(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((response: any): void => {
        setTeams(JSON.parse(response.choices[0].message.content).teams);
        setGenerating(false);
      })
      .catch((error: Error): void => console.log(error.message));
  };

  return (
    <div className="App">
      <div className="header">
        <section className="hero" style={{ backgroundColor: "#fc8614" }}>
          <div className="hero-body">
            <p className="title has-text-white">Accumulator predictor</p>
            <p className="subtitle has-text-white">Ai Football accumulator predictor.</p>
          </div>
        </section>
      </div>

      <div className="container pb-6 m-4">
        {error && <div className="notification is-danger">Unable to generate accumulator please try again.</div>}

        <div className="columns is-multiline">
          <div className="column">
            <div className="form-group col">
              <label htmlFor="numberOfTeams">Teams</label>
              <input
                className="input"
                name="numberOfTeams"
                type="number"
                placeholder="Enter number of teams"
                value={numberOfTeams}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setNumberOfTeams(event.target.value)}
              />
            </div>
          </div>
          <div className="column">
            <div className="form-group col">
              <label htmlFor="risk">Risk Level</label>
              <div className="select is-fullwidth margin-right-1">
                <select
                  defaultValue={risk}
                  name="risk"
                  aria-label="risk"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => setRisk(event.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="very high">Very High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="form-group col">
              <label htmlFor="league">League</label>
              <div className="select is-fullwidth margin-right-1">
                <select
                  defaultValue={league}
                  name="league"
                  aria-label="league"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => setLeague(event.target.value)}
                >
                  <option value="Premier League">Premier League</option>
                  <option value="Bundesliga">Bundesliga</option>
                  <option value="La Liga">La Liga</option>
                  <option value="Serie A"> Serie A</option>
                  <option value=" Ligue 1">Ligue 1</option>
                </select>
              </div>
            </div>
          </div>
          <div className="column mt-5">
            <button className="button is-success" onClick={fetchChatGtpResponse}>
              {generating ? "Generating Accumulator..." : "Generate Accumulator"}
            </button>
          </div>
        </div>

        <div className="columns is-multiline">
          {teams.map(
            (fixture: Fixture): ReactNode => (
              <div key={fixture.fixture} className="column is-4 has-text-centered">
                <div className="box">
                  <p style={{ fontSize: "1.6em" }}>{fixture.fixture}</p>
                  <p style={{ fontSize: "1em" }}>{fixture.date}</p>
                  <p
                    className="mt-2 mb-2"
                    style={{
                      alignItems: "center",
                      backgroundColor: "#0fa40f",
                      borderRadius: "4px",
                      color: "whitesmoke",
                      display: "inline-flex",
                      fontSize: "1.4em",
                      height: "2em",
                      justifyContent: "center",
                      lineHeight: "1.5",
                      paddingLeft: "0.75em",
                      paddingRight: "0.75em"
                    }}
                  >
                    {fixture.team}
                  </p>
                  <p style={{ fontSize: "0.9em" }}>{fixture.reason}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
