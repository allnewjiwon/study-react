/* prop 사용
 * Movie component가
 * Movie() << 소괄호 내부의 prop을
 * parent component로부터 받아옴.
 *
 * !!!!! 주의할 점 : props는 객체 형식이어야 한다.
 * **/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Movie({ id, mediumCoverImage, title, summary, genres }) {
  return (
    <div>
      <img alt={title} src={mediumCoverImage}></img>
      <h2>
        {/* 템플릿 리터럴 = ``내부에 변수(${})를 
       할당하여 주소를 동적으로 조립한다.  */}
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

// prop...
/**
 * arrayOf() => 배열의 각 요소가 특정 타입이어야 함을 나타냄.
 * arrayOf() 괄호 안에 전달되는 인자는 PropTypes여야 한다.
 * ex) arrayOf(PropTypes.string), arrayOf(PropTypes.object) 등등
 * **/
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  mediumCoverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
