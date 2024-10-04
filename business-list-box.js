gsap.registerPlugin(Flip);

const businessActiveClass = "business-active";
const businessInactiveClass = "business-inactive";
const businessWraps = document.querySelectorAll(".business-wrap");
const businessLists = document.querySelectorAll(".business-list");

businessWraps.forEach((businessWrap, idx) => {
    businessWrap.addEventListener("click", () => {
        // 상태 저장
        const state = Flip.getState([...businessWraps, ...businessLists]);
        // 현재 클릭된 요소가 활성화된 상태인지 확인
        const isBusinessWrapActive = businessWrap.classList.contains(businessActiveClass);

        // 모든 요소의 상태를 초기화
        businessWraps.forEach((otherBusinessWrap, otherIdx) => {
            otherBusinessWrap.classList.remove(businessActiveClass);
            otherBusinessWrap.classList.remove(businessInactiveClass);
            // 현재 클릭된 요소가 비활성화된 상태일 때만 inactiveClass 추가
            if (!isBusinessWrapActive && idx !== otherIdx) {
                otherBusinessWrap.classList.add(businessInactiveClass);
            }
        });

        businessLists.forEach((listItem) => {
            listItem.classList.remove(businessActiveClass);
            if (!isBusinessWrapActive) {
                listItem.classList.add(businessInactiveClass);
            }
        });

        // 현재 클릭된 요소가 비활성화된 상태일 때만 활성화 클래스 추가
        if (!isBusinessWrapActive) {
            businessWrap.classList.add(businessActiveClass);
            businessWrap.querySelectorAll('.business-list').forEach(listItem => {
                listItem.classList.add(businessActiveClass);
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
