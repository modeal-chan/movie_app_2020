import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
state = {
  isLoading: true,
  movie: [], //가지고온 데이터는 Array의 형태로, 왼쪽과 같이 []로 공간을 만들어 주어야 한다.
};
getMovies = async () => {
  // const movies =  await axios.get('https://yts-proxy.now.sh/list_movies.json');
  const {
    data : { // 구조분해 할당(객채를 분해하여 변수에 할당)
      data : { movies },
    },
  } =  await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
  // this.setState({ movies: movies }) state movies와 변수 movies가 같다. 고로 아래와 같이 사용할 수 있다.
  // axios.get으로 가져온 데이터를 state값에 대입한다.
  this.setState({ movies, isLoading: false })
  console.log(movies)
}
componentDidMount(){
  this.getMovies();
}

  render() {
    const { isLoading, movies } = this.state;

    return (
      <section className="container">
        {isLoading ?
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div> : (
        <div className="movies">
            {movies.map(
            (movie) => (
              <Movie 
              // ↓↓ props들. Movie.js에서 아래 props를 활용할 예정
                key={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
        </div>
        )}
      </section>
    );
  }
}

export default Home;

// const { data : { data : { movies } } }