/* 
    expect.extend(matchers) 
    --> expect의 matcher 함수를 custom 할 수 있는 함수
*/

expect.extend({
    toBeSame(received, name) {
        const pass = received.toUpperCase() === name.toUpperCase();
        if(pass) {
            return {
                message: () => `You are ${received}`
                , pass: true
            }
        } else {
            return {
                message: () => `You are not ${received}`
                , pass: false
            }
        }
    }
})

test('check person', () => {
    expect('person').toBeSame('person')
})


/* 
    expect.anything()는 null, undefined를 제외한 모든 것에 매칭이된다.

    expect.toEqual() // 같은 Object인지
    expect.toBeCalledWith() // mock 함수가 인자를 가지고 있는 지.

    위 함수 literal 인자 대신 사용 가능.
*/

test('check anything', () => {    
    expect('yes').toEqual(expect.anything())

    const mockFunction = jest.fn();

    /* success case */
    mockFunction(1)
    expect(mockFunction).toBeCalledWith(expect.anything())

    /* 
        fail case - 1

        mockFunction()
        expect(mockFunction).toBeCalledWith(expect.anything())
        -- mockFunction은 인자가 없이 호출 되었기 때문에 에러

        fail case - 2

        mockFunction(undefined)
        expect(mockFunction).toBeCalledWith(expect.anything())
        -- mockFunction의 인자가 undefined이기 때문에 Anything 타입에는 undefined와 null은 제외됨
    */


})

/*
    expect.any(constructor)
    주어진 constructor과 맞는 어떤 것이든 통과    
*/

test('expect any', () => {
    const mockFunction = jest.fn();

    mockFunction(Math.random())
    mockFunction("1")
    // Object.getPrototypeOf(Math.random) ==> Number 인스턴스
    expect(mockFunction).toBeCalledWith(expect.any(Number))
    expect(mockFunction).lastCalledWith(expect.any(String))
})


/* 
    expect.arrayContaining(expectedArray) 
    expectedArray의 값이 모두 recevied에 있어야 통과
*/

describe('arrayContaining', () => {
    const expected = ['Alice', 'Bob'];
    it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
    });
    
    it('does not match if received does not contain expected elements', () => {
        /* received가 [Bob, Alice]일 경우 false */
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
    });

    const mockFunction = jest.fn();

    mockFunction([1, 2, 3])

    it('mockFunction have been called with [1, 2, 3] arguments', () => {
        expect(mockFunction).toBeCalledWith(expect.arrayContaining([1, 2]))
    })
  });

/* 
    expect.assertions(number) 
    expect가 몇 번 호출 되는 것인가!
    즉 count를 삽입해줌.

    보통 비동기 테스트를 할 때 실행 횟수가 의도한 것과 맞는 지 확인 용으로 사용
*/

test('expect assertions', () => {
    expect.assertions(1)
    
    expect(1).toEqual(1)
})

/* 
    expect.hasAssertions()
    expect가 한 번이라도 실행 되었는 지.
*/

// expect.not.stringContaining(string)
describe('not.stringContaining', () => {
    const expected = 'Hello world!';
  
    it('matches if the received value does not contain the expected substring', () => {
      expect('How are you?').toEqual(expect.not.stringContaining(expected));
    });
});


// expect.not.stringMatching(string | regexp)
describe('not.stringMatching', () => {
    const expected = /Hello world!/;
  
    it('matches if the received value does not match the expected regex', () => {
      expect('How are you?').toEqual(expect.not.stringMatching(expected));
    });
  });


// expect.objectContaining(object)
test('onPress gets called with the right thing', () => {
    const simulatePresses = (callback) => {
        callback({ x: 1, y: 2 })
    }

    const onPress = jest.fn();
    simulatePresses(onPress);
    expect(onPress).toBeCalledWith(
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
      }),
    );
  });

// .not => 조건에 반대일 경우 통과

// .resolves =>  비동기 성공 케이스 일 때 사용
test('resolves', () => {
    const asyncFunction = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 10)
        });
    }
    expect(asyncFunction()).resolves.toBe(true);
})

// .rejects => 비동기 실패 케이스 일 때 사용
test('rejects', () => {
    const asyncFunction = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(true)
            }, 10)
        });
    }
    expect(asyncFunction()).rejects.toBe(true);
})

/* 
    .toBe(value)
     - Object.is()를 사용하여 값을 비교함
     - Object.is는 === 보다 더 엄격하게 검사함.
     - float형은 toBeCloseTo 를 사용해야함 ( 0.1 + 0.2을 더할 경우 0.3000004와 같은 값이 나오기 때문 )
*/

const can = {
    name: 'pamplemousse',
    ounces: 12,
  };
  
  describe('the can', () => {
    test('has 12 ounces', () => {
      expect(can.ounces).toBe(12);
    });
  
    test('has a sophisticated name', () => {
      expect(can.name).toBe('pamplemousse');
    });
  });


/* 
    .toHaveBeenCalled()
    함수가 한 번이라도 호출 된 적이 있는 지.
*/

  
  describe('drinkAll', () => {
    function drinkAll(callback, flavour) {
        if (flavour !== 'octopus') {
          callback(flavour);
        }
    }
    test('drinks something lemon-flavoured', () => {
      const drink = jest.fn();
      drinkAll(drink, 'lemon');
      expect(drink).toHaveBeenCalled();
    });
  
    test('does not drink something octopus-flavoured', () => {
      const drink = jest.fn();
      drinkAll(drink, 'octopus');
      expect(drink).not.toHaveBeenCalled();
    });

    test('just call', () => {
        const drink = jest.fn();
        drink()
        expect(drink).toHaveBeenCalled();
      });

  });

/* 
    .toHaveBeenCalledTimes(number) 
    몇 번 호출 되었는 지 count 입력
*/

test('toHaveBeenCalledTimes', () => {
    const youWillCallThreeTime = jest.fn();
    youWillCallThreeTime();
    youWillCallThreeTime();
    youWillCallThreeTime();

    expect(youWillCallThreeTime).toHaveBeenCalledTimes(3)
})

/* 
    .toHaveBeenCalledWith(arg1, arg2, ...) 
    - alias => toBeCalledWith()

    expected를 인자로 가지고 호출된 적이 있으면 통과

    .toHaveBeenLastCalledWith(arg1, arg2, ...)
    - alias: lastCalledWith

    마지막 호출된 함수의 return값이 expected와 같으면 통과

    .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
    - alias: nthCalledWith

    ntchCall번에 호출된 함수의 return값이 expected와 같으면 통과
*/

test('toHaveBeenCalledWith', () => {
    const mockFunction = jest.fn((a) => a);

    mockFunction(1)
    mockFunction("a")
    mockFunction([])

    
    expect(mockFunction).toBeCalledWith("a")
    expect(mockFunction).toBeCalledWith(1)
    expect(mockFunction).toBeCalledWith([])
    expect(mockFunction).lastCalledWith([])
    expect(mockFunction).lastCalledWith([])
    expect(mockFunction).nthCalledWith(2, "a")
})

// 
// 
// 

/* 
    .toHaveReturned() : toReturn()
        - 실행된 적 있는 지
    .toHaveReturnedTimes(number) : toReturnTimes(number)
        - 몇 번 실행되었는 지
    .toHaveReturnedWith(value) : toReturnWith(value)
        - expected가 리턴된 적이 있는 지
    .toHaveLastReturnedWith(value) : lastReturnedWith(value)
        - 마지막 리턴이 expected인 지
    .toHaveNthReturnedWith(nthCall, value)
        - nth번 째 리턴 값이 expected인 지
*/

test('function return', () => {
    const mockFunction = jest.fn(a => a);

    mockFunction()
    mockFunction(2)
    mockFunction(4)

    expect(mockFunction).toReturn();
    expect(mockFunction).toReturnTimes(3);
    expect(mockFunction).toReturnWith(2);
    expect(mockFunction).lastReturnedWith(4);
    expect(mockFunction).nthReturnedWith(2, 2);

})

/* 
    .toHaveLength(number) 

    length 체크 
*/

test('expect to have length', () => {
    expect([1, 2, 3]).toHaveLength(3);
    expect('abc').toHaveLength(3);
    expect('').not.toHaveLength(5);
})

// .toHaveProperty(keyPath, value?)


  
test('this house has my desired features', () => {
    const houseForSale = {
        bath: true,
        bedrooms: 4,
        kitchen: {
            amenities: ['oven', 'stove', 'washer'],
            area: 20,
            wallColor: 'white',
            'nice.oven': true,
        },
        'ceiling.height': 2,
    };
    // Example Referencing
    expect(houseForSale).toHaveProperty('bath');
    expect(houseForSale).toHaveProperty('bedrooms', 4);

    expect(houseForSale).not.toHaveProperty('pool');

    // Deep referencing using dot notation
    expect(houseForSale).toHaveProperty('kitchen.area', 20);
    expect(houseForSale).toHaveProperty('kitchen.amenities', [
    'oven',
    'stove',
    'washer',
    ]);

    expect(houseForSale).not.toHaveProperty('kitchen.open');

    // Deep referencing using an array containing the keyPath
    expect(houseForSale).toHaveProperty(['kitchen', 'area'], 20);
    expect(houseForSale).toHaveProperty(
    ['kitchen', 'amenities'],
    ['oven', 'stove', 'washer'],
    );
    expect(houseForSale).toHaveProperty(['kitchen', 'amenities', 0], 'oven');
    expect(houseForSale).toHaveProperty(['kitchen', 'nice.oven']);
    expect(houseForSale).not.toHaveProperty(['kitchen', 'open']);

    // Referencing keys with dot in the key itself
    expect(houseForSale).toHaveProperty(['ceiling.height'], 2);
});

// .toBeCloseTo(number, numDigits?)
test('adding works sanely with decimals', () => {
    expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
});

// .toBeDefined() => received가 undefined가 아닐 경우 통과 

// .toBeFalsy() => received가 false | 0 | '' | null | undefined일 경우 통과

// .toBeGreaterThan(number | bigint)
test('ounces per can is more than 10', () => {
    // received > expected
    expect(13).toBeGreaterThan(10);
});

// .toBeGreaterThanOrEqual(number | bigint)
test('ounces per can is at least 12', () => {
    // received >= expected
    expect(12).toBeGreaterThanOrEqual(12);
});

// .toBeLessThan(number | bigint)
test('ounces per can is less than 20', () => {
    // received < expected
    expect(19).toBeLessThan(20);
});

// .toBeLessThanOrEqual(number | bigint)
test('ounces per can is at most 12', () => {
    // receoved <= expected
    expect(12).toBeLessThanOrEqual(12);
});

// .toBeInstanceOf(Class)
test('test Instance', () => {
    class A {}

    expect(new A()).toBeInstanceOf(A);
    expect(() => {}).toBeInstanceOf(Function);
})

// .toBeNull() => received가 null일 경우 통과

// .toBeTruthy() => received가 true일 경우 통과

// .toBeUndefined() => received가 undefined일 경우 통과

// .toBeNaN() => received가 NaN일 경우 통과

test('passes when value is NaN', () => {
    expect(NaN).toBeNaN();
    expect(1).not.toBeNaN();
});

// .toContain(item)
test('the flavor list contains lime', () => {
    expect(['lime', 'apple']).toContain('lime');
});

// .toContainEqual(item)
test('is delicious and not sour', () => {
    const myBeverage = {delicious: true, sour: false};
    expect([{delicious: true, sour: false}, {delicious: true, sour: false, tasty: 'sweet'}]).toContainEqual(myBeverage);
});

// .toEqual(value)
describe('equal test', () => {
    const can1 = {
        flavor: 'grapefruit',
        ounces: 12,
    };
    const can2 = {
        flavor: 'grapefruit',
        ounces: 12,
    };
    test('have all the same properties', () => {
        expect(can1).toEqual(can2);
    });
    test('are not the exact same can', () => {
        expect(can1).not.toBe(can2);
    });
});

// .toMatch(regexp | string)
describe('an essay on the best flavor', () => {
    test('mentions grapefruit', () => {
      expect('grapefruit').toMatch(/grapefruit/);
      expect('grapefruit').toMatch(new RegExp('grapefruit'));
    });
});

// .toStrictEqual(value)
// .toThrow(error?)
test('throws on octopus', () => {
    const drinkFlavor = () => {
        throw new Error('error!')
    }
    expect(() => {
      drinkFlavor();
    }).toThrow();
});
