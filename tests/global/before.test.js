/* 
    before는 각 케이스 전에 혹은 테스트 시작 전에 처리할 코드를 작성할 수 있다.
    ex) 테스트 용 데이터 삽입 등..
*/

beforeEach(() => {
    // console.log('prev test start')
}, 1000) /* 함수 종료까지 기다리는 시간 */

beforeAll(() => {
    // console.log('before test start')
}, 1000) /* 함수 종료까지 기다리는 시간 */

test(" 1 + 2 = 3 ", () => {
    expect(1 + 2).toEqual(3)
})

test(" 2 - 1 = 1 ", () => {
    expect(2 - 1).toEqual(1)
})

