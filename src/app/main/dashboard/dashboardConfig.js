import Dashboard from './Dashboard';

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Dashboard />,
    },
  ],
};

export default DashboardConfig;
