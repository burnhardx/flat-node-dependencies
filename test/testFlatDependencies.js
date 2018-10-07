const should = require("chai").should();
const path = require("path")
const underTest = require("./../index")

describe("FlatDependencies",()=>{

    it("should list all needed Dependencies",()=>{

        const result = underTest(path.resolve(__dirname,'context/anyDependency.js'));
        should.exist(result['mocha']);
        should.exist(result['mocca']);
        should.exist(result['dependency']);
        should.exist(result['chai']);
        should.exist(result['nested2']);
        result['mocca'].script.should.equal(result['mocha'].script)
    })

})