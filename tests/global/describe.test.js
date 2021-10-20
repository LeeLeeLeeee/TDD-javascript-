/* 
    describe는 테스트를 그룹화 하는 기능을 하며 
    describe안에 describe를 쓰는 것도 가능하다.
*/


/* 기본 */
describe('Math method test', () => {

    afterAll(() => {
        // describe 범위 내에서 실행 됨.
    }, 100)

    test('pow test', () => {
        expect(Math.pow(3, 3)).toEqual(27)
    })

    test('abs test', () => {
        expect(Math.abs(-3)).toEqual(3)
    })

    describe('삼각 함수 테스트', () => {
        test('sin test', () => {
            expect(Math.sin(1)).toEqual(0.8414709848078965)
        })

    })
})

/* 자신이 그룹화한 테스트 항목만 실행 시킴 */
// describe.only("i'm only one", () => {
//     test('get out!', () => {
//         expect(1 + 1).toEqual(2)
//     })
// })

/* 자신이 그룹화한 테스트 항목을 전부 스킵 */
describe.skip('this will be skip', () => {
    test('skip!!', () => {
        expect(1 + 2).toEqual(-1)
    })
})

/* 
    describe 테스트 그룹의 테스트 마다 미리 생성한 테이블 데이터를 전달
    총 12번의 테스트가 실행 됨 
    테이블 행 (4) * 테스트 항목 개수 (3) = 12

*/
describe.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
    [2, 2, 4],
])('.add(%i, %i)', (a, b, expected) => {

    afterAll(() => {
        // describe 범위에서 afterall이 실행됨 -- 4번 실행
    }, 100)

    test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
    });
  
    test(`returned value not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected);
    });
  
    test(`returned value not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected);
    });
  });