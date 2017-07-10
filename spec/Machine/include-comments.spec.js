// Copyright (c) 2017 Electric Imp
// This file is licensed under the MIT License
// http://opensource.org/licenses/MIT

'use strict';

require('jasmine-expect');
const init = require('./init')('main');

describe('Machine', () => {
  let machine;

  beforeEach(() => {
    machine = init.createMachine();
  });

  it('should handle include-once corectly #1', () => {
    const ans = 'a.builder\n';
    __dirname = __dirname.replace(/\\/g, '/');
    expect(machine.execute(`@include "${__dirname}/../fixtures/" + "lib/a.builder" // comment`)).toEqual(ans);
    expect(machine.execute(`@include "${__dirname}/../fixtures//" + '//lib/a.builder' // comment`)).toEqual(ans);
    expect(machine.execute(`@include "${__dirname}/../fixtures/" + "lib/a.builder//" // comment`)).toEqual(ans);
    expect(machine.execute(`@include "${__dirname}/../fixtures/" + 'lib/a.builder' // comment with //`)).toEqual(ans);
    expect(machine.execute(`@include "${__dirname}/../fixtures/lib/a.builder" // comment with some expr (1 | 0)`)).toEqual(ans);
    expect(machine.execute(`@include "${__dirname}/../fixtures/" + 'lib/a.builder' // comment with " ' ( ] {`)).toEqual(ans);
  });
});
