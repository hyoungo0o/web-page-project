//// json 사용해서 여러 색 사용하고 싶을 때 주석 풀기
//// 현재는 css에서 색상 지정하여 사용 중
//
////const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));
////
////const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';
////
////// HELPER FUNCTIONS
////
////// 1. 범위 내에서 랜덤한 숫자 가져오기. 배열에서 랜덤 인덱스를 가져오는 데 사용됩니다.
////const randNumInRange = max => Math.floor(Math.random() * (max - 1));
////
////// 2. 같은 인덱스의 두 개의 배열 값을 병합하여 새로운 배열에서 동일한 값으로 만듭니다.
////const mergeArrays = (arrOne, arrTwo) => arrOne
////  .map((item, i) => `${item} ${arrTwo[i]}`)
////  .join(', ');
////
////// 3. 요소 배열에 배경을 추가하는 커리 함수
////const addBackground = (elms) => (color) => {
////  elms.forEach(el => {
////    el.style.backgroundImage = color;
////  });
////}
////
////// 4. API에서 데이터 가져오기
////const getData = async(url) => {
////  const response = await fetch(url);
////  const data = await response.json();
////  return data.data;
////}
////
////// 5. 항상 magicalUnderlines 상수에 배경을 적용하는 addBackground의 부분 적용
////const addBackgroundToUnderlines = addBackground(magicalUnderlines);
////
////// GRADIENT FUNCTIONS
////
////// 1. API 데이터에서 CSS 포맷의 linear-gradient 빌드하기
////const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;
////
////// 2. 데이터 배열에서 단일 그라디언트를 가져와서 콜백 함수에 단일 그라디언트를 적용하기
////const applyGradient = async(url, callback) => {
////  const data = await getData(url);
////  const gradient = buildGradient(data[4]); --> json에서 인덱스 지정하여 원하는 색상 사용
////  const gradient = buildGradient(data[randNumInRange(data.length)]); --> 새로고침 할 때마다 랜덤 색상
////  callback(gradient);
////}
////
////// RESULT
////applyGradient(gradientAPI, addBackgroundToUnderlines);
//
//const element = document.querySelector('.underline--magical');
//
//// 자동으로 배경 크기를 변경하는 함수
//const toggleBackgroundSize = () => {
//    let isExpanded = false;
//    let interval = 2000; // 초기 간격은 2초
//
//    const changeBackgroundSize = () => {
//        if (isExpanded) {
//            element.style.backgroundSize = '57% 0.1em';
//        } else {
//            element.style.backgroundSize = '100% 100%';
//        }
//        isExpanded = !isExpanded;
//    };
//
//    changeBackgroundSize(); // 처음 한 번 실행
//
//    setTimeout(() => {
//        interval = 4000; // 2초 후에 간격을 4초로 변경
//        setInterval(changeBackgroundSize, interval);
//    }, 2000); // 2초 후에 4초 간격으로 변경
//};
//
//// 자동 변경 함수 호출
//toggleBackgroundSize();
