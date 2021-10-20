/* 
    test는 it로 대체하여 쓸 수 있다.
*/

function waitAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    })
}


/* 
    concurrent를 사용하지 않을 경우 각 테스트 케이스의 비동기 작업이 종료된 후 실행이 됨.
    
    test("1 + 2", async () => {
        await expect(waitAsync()).resolves.toBeTruthy()
    })

    --- 1초간 기다림---

    test("1 + 2", async () => {
        await expect(waitAsync()).resolves.toBeTruthy()
    }) 

*/


describe('concurrenct', () => {
    /* test 케이스를 한 번에 실행시킴 */
    test.concurrent("1 + 2", async () => {
        await expect(waitAsync()).resolves.toBeTruthy()
    })
    
    test.concurrent("1 + 2", async () => {
        await expect(waitAsync()).resolves.toBeTruthy()
    })
    
    test.concurrent("1 + 2", async () => {
        await expect(waitAsync()).resolves.toBeTruthy()
    })
})
