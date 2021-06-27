/* eslint-disable no-unused-expressions */

const expect = require('chai').expect

const Todos = require('../models/todos')
describe('Todo model', () => {
  // every test starts with a clean slate (see todos.js)
  beforeEach(() => {
    Todos.reset()
  })

  describe('`listPeople` and `add`', () => {
    it('initially returns an empty array', () => {
      expect(Todos.listPeople()).to.eql([])
    })

    it('lists people after they have todos added', () => {
      Todos.add('zeke', { content: 'clean room' })
      expect(Todos.listPeople()).to.eql(['zeke'])
    })

    it('handles multiple people with multiple todos', () => {
      Todos.add('zeke', { content: 'clean room' })
      Todos.add('zeke', { content: 'write mom' })
      expect(Todos.listPeople()).to.eql(['zeke'])
      Todos.add('omri', { content: 'exercise' })
      expect(Todos.listPeople()).to.eql(['zeke', 'omri'])
    })
  })

  describe('`add` and `list`', () => {
    it('remembers who does what', () => {
      Todos.add('zeke', { content: 'clean bath room' })
      expect(Todos.list('zeke')).to.have.length(1)
      Todos.add('omri', { content: 'clean living room' })
      expect(Todos.list('omri')).to.have.length(1)
      Todos.add('omri', { content: 'clean garage' })
      expect(Todos.list('omri')).to.have.length(2)
    })
  })

  describe('`complete`', () => {
    it('is a boolean set to `false` for any new tasks', () => {
      Todos.add('zeke', { content: 'clean self' })
      expect(Todos.list('zeke')[0].complete).to.be.false
    })

    it('respects a pre-existing completion status', () => {
      Todos.add('zeke', { content: 'clean self', complete: true })
      Todos.add('zeke', { content: 'clean the world', complete: false })
      expect(Todos.list('zeke')[0].complete).to.be.true
      expect(Todos.list('zeke')[1].complete).to.be.false
    })

    it("is a method that sets a specified task's `complete` property to true", () => {
      Todos.add('zeke', { content: 'go to store' })
      Todos.add('zeke', { content: 'go to library' })
      Todos.add('zeke', { content: 'go to park' })
      Todos.complete('zeke', 1)
      expect(Todos.list('zeke')[0].complete).to.be.false
      expect(Todos.list('zeke')[1].complete).to.be.true
      expect(Todos.list('zeke')[2].complete).to.be.false
    })
  })

  describe('`remove`', () => {
    it('removes a task, by index, for a given person', () => {
      // set up a bunch of tasks
      for (var i = 0; i < 10; i++) Todos.add('zeke', { content: 'task ' + i })
      expect(Todos.list('zeke').length).to.equal(10)
      // use the method being tested
      Todos.remove('zeke', 5)
      // check the new state
      expect(Todos.list('zeke').length).to.equal(9)
      expect(Todos.list('zeke')[4].content).to.equal('task 4') // nothing below 5 affected
      expect(Todos.list('zeke')[5].content).to.equal('task 6') // 5 was deleted
      expect(Todos.list('zeke')[6].content).to.equal('task 7') // everything moved down
    })
  })
})
