import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import Form from "../src/components/Form";

configure({ adapter: new Adapter() });

const props = {
  addTask: jest.fn()
};

test('Form Component', () => {
  const component = mount(<Form {...props}/>);

  expect(component).toBeTruthy();  
  expect(component.find('input').at(0).exists()).toEqual(true);
  expect(component.find('input').at(0).prop('value')).toEqual('');
});
