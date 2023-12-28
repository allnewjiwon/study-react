import React from 'react';
import { useState } from 'react';
import './App.css';
import { func } from 'prop-types';

function App() {
  let [lists, setLists] = useState([]);
  // let [posttitle, setPosttitle] = useState('남자코트추천');
  let [posttitle, setPosttitle] = useState([
    '남자코트추천',
    '강남우동맛집',
    '파이썬독학',
  ]);
  let [count, setCount] = useState(0);

  function setCounter() {
    setCount(count++);
    console.log('나오니??');
  }
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 BLOG</div>
      </div>
      <div className="list">
        <h4>{posttitle[0]}</h4>
        <p>0월 0일 발행</p>
      </div>
      <div className="list">
        <h4>{posttitle[1]}</h4>
        <p>0월 0일 발행</p>
      </div>
      <div className="list">
        <h4>{posttitle[2]}</h4>
        <p>0월 0일 발행</p>
      </div>
      <button onClick={setCounter}>좋아요</button>
      <h4>
        {posttitle[0]}
        <span>굿</span>
        {count}
      </h4>
    </div>
  );
}

/**23.12.27
 * JS destructuring 문법
 * let [name, age] = ['Kim', 23]
 * 위의 식으로 왼, 오 형식 맞춰주면
 * 자동으로 변수 생성 가능
 * **/
export default App;
