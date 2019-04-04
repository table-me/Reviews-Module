import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/components/App.jsx';

describe('Component mounts and renders on initialization', () => {
  test('component rendered', () => {
    const component = shallow(<App />);
    expect(component.exists()).toBe(true);
  });
});
