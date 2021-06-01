import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import TasksList from "../src/components/TasksList";

configure({ adapter: new Adapter() });

const props = {
  removeTask: jest.fn(),
  editTask: jest.fn(),
  tasks: [
    {      
      id: "c929b973-6cb1-4883-a2a1-f764e9024a2e",
      name: "task3",
      date: 1622522353474
    },
    {      
      id: "3549315b-a22d-4306-ba61-66f07817f2b1",
      name: "task2",
      date: 1622522348258
    },
    {
      id: "77cf539f-f5c2-4a10-a18d-38de0ecbcdfd",
      name: "task1",
      date: 1622522343730
    }
  ]
};

test('', () => {
  const component = mount(<TasksList {...props}/>);

  expect(component).toBeTruthy();  

  expect(component.find('.MuiDataGrid-cellEditable').at(0).exists()).toEqual(true);
  expect(component.find('.MuiDataGrid-cellEditable').at(1).exists()).toEqual(true);
  expect(component.find('.MuiDataGrid-cellEditable').at(2).exists()).toEqual(true);
  expect(component.find('.MuiDataGrid-cellEditable').at(3).exists()).toEqual(false);

  expect(component.find('.MuiDataGrid-cellEditable').at(0).prop('data-value')).toEqual('task3');
  expect(component.find('.MuiDataGrid-cellEditable').at(1).prop('data-value')).toEqual('task2');
  expect(component.find('.MuiDataGrid-cellEditable').at(2).prop('data-value')).toEqual('task1');
});
