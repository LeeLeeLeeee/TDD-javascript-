/* 
    after는 각 케이스 후에 혹은 전체 테스트 후에 처리할 코드를 작성할 수 있다.
    ex) 데이터 관련 처리를 할 경우 테스트 종료 후 DB clear를 시킬 때 사용할 수 있음.
*/

afterEach(() => {
    // console.log('after each..')
}, 1000) /* 함수 종료까지 기다리는 시간 */

afterAll(() => {
    // console.log('after all')
}, 1000) /* 함수 종료까지 기다리는 시간 */

test(" 1 + 2 = 3 ", () => {
    expect(1 + 2).toEqual(3)
})

test(" 2 - 1 = 1 ", () => {
    expect(2 - 1).toEqual(1)
})

