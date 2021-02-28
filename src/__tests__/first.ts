
describe("first",()=>{
    it("deve ser possivel somar 2 numeros",()=>{
        expect(2+2).toBe(4)
    });

    // it("deve ser possivel multiplicar 2 numeros",()=>{
    //     expect(3*2).toBe(4)
    // });

    it("deve usar o not",()=>{
        expect(2+2).not.toBe(5)
    })

    
})