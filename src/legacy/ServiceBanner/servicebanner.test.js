import React from 'react';
import ServiceBanner from './ServiceBanner';
import { render, cleanup, fireEvent, getByTestId } from 'react-testing-library';
import mock from '../ServiceBanner/mock.json';

afterEach(cleanup);

let props = {
  agents: mock.hotels,
  step: 'hotels',
  promotionCode: 'test123',
  hotelName: 'Test hotel',
  tooltipMessage:
    'Ortstarif, Mobilfunk abweichend #LINE_BREAK# (Montag - Sonntag von 8 - 23 Uhr)',
  deviceType: 'desktop'
};

describe('Service banner', () => {
  test('Without a selected list, active agent is randomized', () => {
    const { container } = render(<ServiceBanner {...props} />);
    //Get the current agent
    const prevAgent = getByTestId(container, 'agentName').textContent;

    //Cleanup/rerender the banner (simulate a browser refresh)
    cleanup();
    const { container: container_refresh } = render(
      <ServiceBanner {...props} />
    );
    const visibleAgent = getByTestId(container_refresh, 'agentName')
      .textContent;
    expect(prevAgent).not.toEqual(visibleAgent);
  });

  test('Active agent persists in localstorage', () => {
    const { rerender, getByTestId } = render(<ServiceBanner {...props} />);

    //SESSION_ACTIVE_AGENT should be empty on init
    expect(localStorage.key('SESSION_ACTIVE_AGENT')).toBeNull();

    //Select the current agent as active
    fireEvent.click(getByTestId('serviceAgent'));
    const prevAgent = getByTestId('agentName').textContent;

    //Simulate next step
    props.step = 'offers';
    rerender(<ServiceBanner props={props} />);
    //selected active agent should persist
    const visibleAgent = getByTestId('agentName').textContent;
    expect(prevAgent).toEqual(visibleAgent);
  });
});
