const assert = require('assert')
                , Actions = require('../app/assets/js/actions')

describe('Action', () => {

    let actions

    beforeEach((done) => {
        actions = new Actions('')
        done()
    })

    describe('pickBox', () => {
        it('should return underfined if passed undefined', (done) => {
            let box = actions.pickBox(undefined)
            assert.equal(box, undefined, 'not returning undefined')
            done()
        })

        it('should return first box', (done) => {
            let positions = []
            positions[15] = [40, 0]
            positions[39] = [20, 0]
            positions[31] = [0, 20]
            positions[38] = [0, 40]
            positions[35] = [2, 0]
            positions[19] = [1, 0]
            positions[26] = [0, 1]
            positions[36] = [0, 2]
            let box = actions.pickBox(positions)
            assert.equal(box.l, 20, 'correct box not picked')
            done()
        })

        it('should return second box', (done) => {
            let positions = []
            positions[15] = [4, 0]
            positions[39] = [2, 0]
            positions[31] = [0, 2]
            positions[38] = [0, 4]
            positions[35] = [20, 0]
            positions[19] = [10, 0]
            positions[26] = [0, 10]
            positions[36] = [0, 20]
            let box = actions.pickBox(positions)
            assert.equal(box.l, 10, 'correct box not picked')
            done()
        })

        it('should return second box', (done) => {
            let positions = []
            positions[15] = [4, 0]
            positions[39] = [2, 0]
            positions[31] = [0, 2]
            positions[38] = [0, 4]
            positions[35] = [4, 0]
            positions[19] = [2, 0]
            positions[26] = [0, 2]
            positions[36] = [0, 4]
            let box = actions.pickBox(positions)
            assert.equal(box.l, 2, 'correct box not picked')
            done()
        })
    })

    describe('processImage', () => {
        it('should return underfined if passed undefined', (done) => {
            let imgData = actions.processImage(undefined)
            assert.equal(imgData, undefined, 'not returning undefined')
            done()
        })

        it('should split channels', (done) => {
            actions.pixelResolution = 2
            let data = {}
            data.data = [1, 1, 3, 1, 1, 2, 3, 1, 1, 3, 3, 1, 1, 3, 3, 1]
            let imgData = actions.processImage(data)
            assert.deepEqual(imgData.red, [1, 1, 1, 1], 'not returning correct data')
            assert.deepEqual(imgData.green, [1, 2, 3, 3], 'not returning correct data')
            assert.deepEqual(imgData.blue, [3, 3, 3, 3], 'not returning correct data')
            done()
        })
    })
})
