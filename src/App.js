import './App.css';
import { useContext, useEffect } from 'react';
import { Store } from './Store';

function App() {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = async () => {
    const data = await fetch(
      'https://api.tvmaze.com/singlesearch/shows?q=interest&embed=episodes'
    );
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes,
    });
  };

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <div>
      {console.log(state)}
      <div>
        <h1>Person of Interest</h1>
        <p>Pick your favourite episodes</p>
        <section>
          {state.episodes.map(episode => {
            return (
              <section key={episode.id}>
                <img
                  src={episode.image.medium}
                  alt={`Person of Interest ${episode.name}`}
                />
                <div>{episode.name}</div>
                <section>
                  <div>
                    Season: {episode.season} Number: {episode.number}
                  </div>
                </section>
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default App;
