import { useState, useEffect } from 'react';
import Movie from './Movie';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    /** 이 코드를 좀 더 짧게 쓰자면
     * const response = await fetch(
      'http://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year',
       );
     * const json = await response.json();
     * 
     * 아래와 같은 코드가 된다.                                            
     *  **/
    const json = await (
      await fetch(
        // ' https://api.themoviedb.org/3/discover/movie?api_key=9d5002da74fa822995bfbbc6f6cb3955&with_watch_providers=337&watch_region=KR&language=ko&page=',
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`,
      )
    ).json();

    /**
     * API 구조를 잘 보고 상태 업데이트 함수에
     * 전달해야 한다. 상태함수를 배열로 설정해두었으므로
     * API를 받아올 때도 객체가 아닌 배열로 받아와야
     * 되기 때문에 movieJson이 아닌 movieJson.results로
     * 설정해야 한다.
     * **/
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    //   .then((response) => response.json())
    /**
     * 여기서 (json)은 불러온 데이터를 가르키는
     * 단순 변수명이기 때문에
     * 사용자 임의로 변경할 수 있다.
     * (ex. movieList)
     * **/
    //   .then((json) => {
    //     setMovies(json.data.movies);
    //     setLoading(false);
    //   });
    getMovies();
  }, []);

  /**
   * 한번만 렌더링하게끔
   * useEffect()를 사용
   * **/
  useEffect(() => {
    // console.log(movies);
  }, [movies]);

  return (
    <div>
      {/* react.js에서 key값은 각 요소가 고유하게 
      식별되도록 한다.대개 리스트에서 항목이 고유한 id값을 
      가질 경우 이를 사용하는 것이 보편적이다. 또한 key는 
      react에서만, map안에서 component들을 render할 때 사용한다.*/}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ul>
          {movies.map((movie) => (
            /**
             * 자식 컴포넌트에 적용해 둔 props를
             * 받아와 컴포넌트에 사용한다.
             * **/
            <Movie
              key={movie.id}
              id={movie.id}
              mediumCoverImage={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
