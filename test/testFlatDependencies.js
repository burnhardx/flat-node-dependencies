const should = require("chai").should();

const path = require("path")
const underTest = require("./../index")

describe("FlatDependencies",()=>{

    it("should list all needed Dependencies",()=>{

        const result = underTest(path.resolve(__dirname,'context/anyDependency.js'));
        should.exist(result['uuid']);
        should.exist(result['lodash']);
        should.exist(result['dependency']);
        should.exist(result['_']);
        should.exist(result['nested2']);
        result['_'].script.should.equal(result['lodash'].script)
        console.log(result)
    })

})