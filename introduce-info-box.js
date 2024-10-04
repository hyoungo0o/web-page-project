gsap.registerPlugin(Flip);

const activeClass = "is-active";
const inactiveClass = "is-inactive";
const introduce3Wraps = document.querySelectorAll(".introduce3-wrap");
const introduce3Lists = document.querySelectorAll(".introduce3-list");

introduce3Wraps.forEach((introduce3Wrap, idx) => {
    introduce3Wrap.addEventListener("click", () => {
        // 상태 저장
        const state = Flip.getState([...introduce3Wraps, ...introduce3Lists]);
        // 현재 클릭된 요소가 활성화된 상태인지 확인
        const isIntroduce3WrapActive = introduce3Wrap.classList.contains(activeClass);

        // 모든 요소의 상태를 초기화
        introduce3Wraps.forEach((otherIntroduce3Wrap, otherIdx) => {
            otherIntroduce3Wrap.classList.remove(activeClass);
            otherIntroduce3Wrap.classList.remove(inactiveClass);
            // 현재 클릭된 요소가 비활성화된 상태일 때만 inactiveClass 추가
            if (!isIntroduce3WrapActive && idx !== otherIdx) {
                otherIntroduce3Wrap.classList.add(inactiveClass);
            }
        });

        introduce3Lists.forEach((listItem) => {
            listItem.classList.remove(activeClass);
            if (!isIntroduce3WrapActive) {
                listItem.classList.add(inactiveClass);
            }
        });

        // 현재 클릭된 요소가 비활성화된 상태일 때만 활성화 클래스 추가
        if (!isIntroduce3WrapActive) {
            introduce3Wrap.classList.add(activeClass);
            introduce3Wrap.querySelectorAll('.introduce3-list').forEach(listItem => {
                listItem.classList.add(activeClass);
            });
        }

        // 상태 애니메이션 실행
        Flip.from(state, {
            duration: 1,
            ease: "expo.out",
            absolute: true
        });
    });
});
