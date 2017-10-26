import { NavigationActions } from 'react-navigation';

const CreateReducer = (AppNavigator, initialState) => {
    return (state = initialState, action) => {
        switch (action.type) {
            case 'CATEGORIES':
              const params = {rootCategory: action.category};
              nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Categories', params: params }),
                state
              );
              break;

            case 'HardwareBackPress':
                nextState = AppNavigator.router.getStateForAction({ type: 'Navigation/BACK', key: null}, state);
                break;

            case 'PRODUCTS':
              const paramsProducts = {rootCategory: action.category};
              nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Products', params: paramsProducts}),
                state
              );
              break;
            default:
              nextState = AppNavigator.router.getStateForAction(action, state);
              break;
          }

        return nextState || state;
    };
}

export default CreateReducer;
