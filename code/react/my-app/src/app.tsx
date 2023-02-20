import { useRoutes} from 'react-router-dom';
import ROUTER_CONFIG from '@/router/index';
const App = () => {
    return useRoutes(ROUTER_CONFIG);
};
export default App;