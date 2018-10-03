import React from 'react';
import renderer from 'react-test-renderer';
import AccountDetails from '../AccountDetails';

it('renders with AccountDetails', () => {
  const component = renderer.create(
    <AccountDetails currentUser={{name: 'a', email: 'a@abc.vb'}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
