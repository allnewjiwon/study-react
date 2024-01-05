import React from 'react';
import { useState } from 'react';
import './App.css';
import { func } from 'prop-types';

function App() {
  // let [posttitle, setPosttitle] = useState('남자코트추천');
  let [posttitles, setPosttitle] = useState([
    /**
     * 여기서 잠깐... 정보값이 많아질수록
     * 객체 형태로 저장하는게 좋겟다....
     * **/
    // { title: '남자코트추천', count: 0 },
    // { title: '강남우동맛집', count: 0 },
    // { title: '파이썬독학', count: 0 },
    '남자코트추천',
    '강남우동맛집',
    '파이썬독학',
  ]);

  let [count, setCount] = useState([0, 0, 0]);
  // let [newCount, setNewCount] = useState(0);
  let [color, setColor] = useState('#fff');
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, setInput] = useState('');

  /**!!!!!!!!!!!!!!미해결!!!!!!!!!!!!!!
   * 방법 찾아볼 것!!!!!!!!!!!!!!!!!!!!!**/
  function ccModal() {
    let idx = 0;
    let colorArr = ['#f12', '#afa', '#faf'];

    setInterval(() => {
      if (idx >= colorArr.length) {
        clearInterval();
      } else {
        setColor(colorArr[idx]);
        idx++;
      }
    }, 1000);
  }

  function sort() {
    let copy = [...posttitles];
    // copy.sort((a, b) => a.localeCompare(b));
    copy.sort();
    setPosttitle(copy);
  }
  function setTitles() {
    /**
     * 24.01.02
     * array, object 값을 다를 때
     * 원본 데이터를 직접 조작하는 것보단
     * 기존값은 보존해주는 식으로 코드를
     * 짜는 것이 훨씬 안전하다.
     *
     * 24.01.02
     * spread operator
     * array나 object 자료형 왼쪽에 붙일 수 있으며
     * 괄호를 벗겨달라는 뜻이다.
     * ex) ...[1,2,3] 라고 쓰면 1,2,3이 남는다.
     *
     * 이런 식으로 만들어진 독립적인 사본을
     * shallow copy 혹은 deep copy 라고 한다.
     *
     * 본래 사본 배열의 경우 동일한 화살표를 가지기
     * 때문에 복사본 배열과 원본 배열을 비교연산자로
     * 비교하면 true가 나온다.
     * => 이상의 이유로 shallow copy와 deep copy를 사용함
     *
     * **/

    let copy = [...posttitles];
    copy[0] = '여자코트추천';

    setPosttitle(copy);
  }
  function setCounter(i) {
    // state가 array의 경우 원본 유지해두기
    let copy = [...count];
    copy[i] = copy[i] + 1;
    setCount(copy);
    /**
     * setCount((count[i] += 1))의 경우
     * state값을 직접적으로 변경하는 값이 되므로
     * 권장되지 않는다. => 함수형 업데이트 필요하므로
     * 위의 코드와 같은 방식이 권장된다.
     * 배열 복사 후 이전 상태를 기반으로 새로운 상태를
     * 계산할 수 있게끔.
     * **/
  }

  const onReset = () => {
    setInput('');
  };
  const onChange = (e) => {
    setInput(e.target.value);
    // if (e.target.value === '') {
    //   setInput(e.target.value);
    // } else {
    //   onReset();
    // }

    // if (e.target.value === '') {
    //   e.preventDefault();
    //   alert('발행할 글을 입력하세요');
    // } else {
    //   setInput(e.target.value);
    // }
  };

  function addList(e) {
    // 클릭 시 리스트가 더해지게 만들거임
    // button에 들어가야함
    /**
     * 24.01.05
     * unshift()
     * arr.unshift(요소1, 요소2, 요소3);
     * arr에 요소1, 요소2, 요소3이 추가된다.
     * **/

    // 리스트 추가될 때 이미 업뎃된 count 값이 같이 업데이트 되는디????

    let copy = [...posttitles];
    let copyCount = [...count];

    // setPosttitle(copy) => 업데이트 된 상태의 copy가 setPosttitle에 전달됨

    onReset();
    if (input == '') {
      e.preventDefault();
      alert('발행할 글을 입력하세요');
    } else {
      copy.unshift(input);
      let shiftCount = copyCount.unshift(count);
      setPosttitle(copy);
      // setCounter(copyCount);
      setCount(copyCount);
      console.log(shiftCount);
    }
  }

  // function addCount() {
  //   let copy = [...count];

  //   setCount(copy);
  // }

  function modalOnOff() {
    // modal == false ? setModal(true) : setModal(false);
    setModal(!modal);
  }

  const enter = (e) => {
    if (e.keyCode === 13) {
      addList(e);
    }
  };

  function deleteList(i) {
    let copy = [...posttitles];
    /**
     * splice(제거 또는 삽입할 배열의 인덱스 값, 제거할 배열의 갯수,
     * (배열에 추가할 요소1), (배열에 추가할 요소2))
     * **/
    copy.splice(i, 1);
    setPosttitle(copy);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 BLOG</div>
      </div>
      {/* 24.01.02
       { 
        글제목.map(function(a, i){
          return (
          <div className="list">
            <h4>{ 글제목[i] }</h4>
            <p>2월 18일 발행</p>
          </div> )
        }) 
      } 처럼 파라미터를 a, i로 둬도 되는데 
      첫번째 파라미터 a는 array안에 있던 자료,
      두번째 파라미터 i는 0부터 1씩 증가하는 정수기 때문이다.

      ++ 더불어 아래와 같이 for문을 사용해서도 
      반복 배열 적용 가능하다. 단, for는 jsx내부에서 
      사용 불가하기에 return 밖에서 사용해야 한다.

        var 어레이 = [];
        for (var i = 0; i < 3; i++) {
          어레이.push(<div>안녕</div>)
        }
        return (
          <div>
            { 어레이 }
          </div>
        )
      
       */}

      <List
        posttitles={posttitles}
        count={count}
        setCounter={setCounter}
        modalOnOff={modalOnOff}
        setTitle={setTitle}
        deleteList={deleteList}
      />
      <button onClick={setTitles}>타이틀 바꾸기</button>
      {/* <button onClick={setCounter}>좋아요</button> */}
      <button onClick={sort}>정렬버튼</button>
      <button onClick={modalOnOff}>모달창띄우기</button>
      <h4>{posttitles[0]}</h4>
      {/* 부모 컴포넌트인 App의 state인 postitles를 
      자식 컴포넌트인 Modal에게 props라는 파라미터로
      전송해서 자식요소가 사용할 수 있도록 한다. 
      이 때 state 말고도 일반 변수 혹은 함수 전송도 가능하다.*/}
      {modal == true ? (
        <Modal
          posttitles={posttitles}
          setTitles={setTitles}
          colorArr={ccModal}
          title={title}
        />
      ) : null}
      <input
        className="input"
        onChange={onChange}
        value={input}
        onKeyDown={(e) => {
          enter(e);
        }}
      ></input>
      <button
        className="inputBtn"
        onClick={(e) => {
          addList(e);
        }}
      >
        글발행
      </button>
    </div>
  );
}

function Modal({ posttitles, title, setTitles }) {
  // const backgroundColor = props.ccModal;
  return (
    <div className="modal" style={{ background: 'skyblue' }}>
      <h4>{posttitles[title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          setTitles(['여자코트 추천'], ['강남우동맛집'], ['파이썬독학']);
        }}
      >
        여기서 타이틀 바꿀거임
      </button>
    </div>
  );
}

function List({
  posttitles,
  count,
  setCounter,
  modalOnOff,
  setTitle,
  deleteList,
}) {
  return (
    <div>
      {posttitles.map((posttitle, i) => {
        return (
          <div key={i} className="list">
            {/* onClick={setCounter(i)} 말고
                onClick={() => setCounter(i)}를 사용해야 하는 이유?
          
                1. onClick={setCounter(i)} : 직접 함수를 호출하는 방식으로,
                state가 업뎃되었는지 확인하지 않고 무조건 함수를 호출하므로
                무한 루프가 발생해서 오류가 생긴다.
                2. onClick={() => setCounter(i)} : 화살표 함수를 사용하면
                렌더링 시에는 호출되지않고 함수가 필요한 시점에만(이 경우 클릭이벤트)
                호출되기 때문에 무한루프가 발생하지 않는다.
                */}
            <h4
              className="title"
              onClick={() => {
                setCounter(i);
                modalOnOff();
                setTitle(i);
              }}
            >
              {posttitle}
              <span>따봉</span>
              {count[i]}
            </h4>
            <p>0월 0일 발행</p>
            <button
              className="deleteBtn"
              onClick={() => {
                deleteList(i);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
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
