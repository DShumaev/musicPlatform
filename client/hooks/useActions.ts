import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../store/actions-creators/index'

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
};
